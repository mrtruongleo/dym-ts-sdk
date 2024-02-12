"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgBroadcasterWithPk = void 0;
const accounts_1 = require("../../../accounts");
const tx_1 = require("../tx");
const TxGrpcApi_1 = require("../api/TxGrpcApi");
const grpc_1 = require("../../../../client/chain/grpc");
const utils_1 = require("@injectivelabs/utils");
const exceptions_1 = require("@injectivelabs/exceptions");
const networks_1 = require("@injectivelabs/networks");
const msgs_1 = require("../../../../utils/msgs");
const client_1 = require("../../../../client");
/**
 * This class is used to broadcast transactions
 * using a privateKey as a signer
 * for the transactions and broadcasting
 * the transactions directly to the node
 *
 * Mainly used for working in a Node Environment
 */
class MsgBroadcasterWithPk {
    endpoints;
    chainId;
    ethereumChainId;
    privateKey;
    simulateTx = false;
    gasBufferCoefficient = 1.1;
    txTimeout = utils_1.DEFAULT_BLOCK_TIMEOUT_HEIGHT;
    constructor(options) {
        const networkInfo = (0, networks_1.getNetworkInfo)(options.network);
        const endpoints = (0, networks_1.getNetworkEndpoints)(options.network);
        this.gasBufferCoefficient = options.gasBufferCoefficient || 1.1;
        this.simulateTx = options.simulateTx || false;
        this.chainId = networkInfo.chainId;
        this.txTimeout = options.txTimeout || utils_1.DEFAULT_BLOCK_TIMEOUT_HEIGHT;
        this.ethereumChainId =
            options.ethereumChainId || networkInfo.ethereumChainId;
        this.endpoints = { ...endpoints, ...(options.endpoints || {}) };
        this.privateKey =
            options.privateKey instanceof accounts_1.PrivateKey
                ? options.privateKey
                : accounts_1.PrivateKey.fromHex(options.privateKey);
    }
    /**
     * Broadcasting the transaction using the client
     *
     * @param tx
     * @returns {string} transaction hash
     */
    async broadcast(transaction) {
        const { txRaw } = await this.prepareTxForBroadcast(transaction);
        return await this.broadcastTxRaw(txRaw);
    }
    /**
     * Broadcasting the transaction with fee delegation services
     *
     * @param tx
     * @returns {string} transaction hash
     */
    async broadcastWithFeeDelegation(transaction) {
        const { simulateTx, privateKey, ethereumChainId, endpoints } = this;
        const msgs = Array.isArray(transaction.msgs)
            ? transaction.msgs
            : [transaction.msgs];
        const tx = {
            ...transaction,
            msgs: msgs,
        };
        const web3Msgs = msgs.map((msg) => msg.toWeb3());
        if (!ethereumChainId) {
            throw new exceptions_1.GeneralException(new Error('Please provide ethereumChainId'));
        }
        const transactionApi = new client_1.IndexerGrpcTransactionApi(endpoints.indexer);
        const txResponse = await transactionApi.prepareTxRequest({
            memo: tx.memo,
            message: web3Msgs,
            address: tx.ethereumAddress,
            chainId: ethereumChainId,
            gasLimit: (0, msgs_1.getGasPriceBasedOnMessage)(msgs),
            estimateGas: simulateTx || false,
        });
        const signature = await privateKey.signTypedData(JSON.parse(txResponse.data));
        const response = await transactionApi.broadcastTxRequest({
            txResponse,
            message: web3Msgs,
            chainId: ethereumChainId,
            signature: `0x${Buffer.from(signature).toString('hex')}`,
        });
        return await new TxGrpcApi_1.TxGrpcApi(endpoints.grpc).fetchTxPoll(response.txHash);
    }
    /**
     * Broadcasting the transaction using the client
     *
     * @param tx
     * @returns {string} transaction hash
     */
    async simulate(transaction) {
        const { privateKey, endpoints, chainId } = this;
        const tx = {
            ...transaction,
            msgs: Array.isArray(transaction.msgs)
                ? transaction.msgs
                : [transaction.msgs],
        };
        /** Account Details * */
        const publicKey = privateKey.toPublicKey();
        const accountDetails = await new grpc_1.ChainGrpcAuthApi(endpoints.grpc).fetchAccount(publicKey.toBech32());
        const { baseAccount } = accountDetails;
        /** Block Details */
        const latestBlock = await new grpc_1.ChainGrpcTendermintApi(endpoints.grpc).fetchLatestBlock();
        const latestHeight = latestBlock.header.height;
        const timeoutHeight = new utils_1.BigNumberInBase(latestHeight).plus(utils_1.DEFAULT_BLOCK_TIMEOUT_HEIGHT);
        /** Prepare the Transaction * */
        const { txRaw } = (0, tx_1.createTransaction)({
            memo: tx.memo || '',
            fee: utils_1.DEFAULT_STD_FEE,
            message: tx.msgs,
            timeoutHeight: timeoutHeight.toNumber(),
            pubKey: publicKey.toBase64(),
            sequence: baseAccount.sequence,
            accountNumber: baseAccount.accountNumber,
            chainId: chainId,
        });
        /** Append Blank Signatures */
        txRaw.signatures = [new Uint8Array(0)];
        /** Simulate transaction */
        const simulationResponse = await new TxGrpcApi_1.TxGrpcApi(endpoints.grpc).simulate(txRaw);
        return simulationResponse;
    }
    /**
     * In case we don't want to simulate the transaction
     * we get the gas limit based on the message type.
     *
     * If we want to simulate the transaction we set the
     * gas limit based on the simulation and add a small multiplier
     * to be safe (factor of 1.1 (or user specified))
     */
    async getTxWithStdFee(args) {
        const { simulateTx, gasBufferCoefficient } = this;
        if (!simulateTx) {
            return (0, tx_1.createTransaction)(args);
        }
        const result = await this.simulateTxRaw(args);
        if (!result.gasInfo?.gasUsed) {
            return (0, tx_1.createTransaction)(args);
        }
        const stdGasFee = (0, utils_1.getStdFee)({
            ...args.fee,
            gas: new utils_1.BigNumberInBase(result.gasInfo.gasUsed)
                .times(gasBufferCoefficient)
                .toFixed(),
        });
        return (0, tx_1.createTransaction)({ ...args, fee: stdGasFee });
    }
    /**
     * Create TxRaw and simulate it
     */
    async simulateTxRaw(args) {
        const { endpoints } = this;
        const { txRaw } = (0, tx_1.createTransaction)(args);
        txRaw.signatures = [new Uint8Array(0)];
        const simulationResponse = await new TxGrpcApi_1.TxGrpcApi(endpoints.grpc).simulate(txRaw);
        return simulationResponse;
    }
    async prepareTxForBroadcast(transaction, accountDetails) {
        const { chainId, privateKey, endpoints, txTimeout } = this;
        const msgs = Array.isArray(transaction.msgs)
            ? transaction.msgs
            : [transaction.msgs];
        const tx = {
            ...transaction,
            msgs: msgs,
        };
        /** Account Details * */
        const publicKey = privateKey.toPublicKey();
        const actualAccountDetails = await this.getAccountDetails(accountDetails);
        /** Block Details */
        const latestBlock = await new grpc_1.ChainGrpcTendermintApi(endpoints.grpc).fetchLatestBlock();
        const latestHeight = latestBlock.header.height;
        const timeoutHeight = new utils_1.BigNumberInBase(latestHeight).plus(txTimeout);
        const gas = (transaction.gas?.gas || (0, msgs_1.getGasPriceBasedOnMessage)(msgs)).toString();
        /** Prepare the Transaction * */
        const { signBytes, txRaw } = await this.getTxWithStdFee({
            memo: tx.memo || '',
            message: msgs,
            fee: (0, utils_1.getStdFee)({ ...tx.gas, gas }),
            timeoutHeight: timeoutHeight.toNumber(),
            pubKey: publicKey.toBase64(),
            sequence: actualAccountDetails.sequence,
            accountNumber: actualAccountDetails.accountNumber,
            chainId: chainId,
        });
        /** Sign transaction */
        const signature = await privateKey.sign(Buffer.from(signBytes));
        /** Append Signatures */
        txRaw.signatures = [signature];
        return { txRaw, accountDetails: actualAccountDetails };
    }
    async getAccountDetails(accountDetails) {
        if (accountDetails) {
            return accountDetails;
        }
        const { privateKey, endpoints } = this;
        const accountDetailsResponse = await new grpc_1.ChainGrpcAuthApi(endpoints.grpc).fetchAccount(privateKey.toBech32());
        return accountDetailsResponse.baseAccount;
    }
    async broadcastTxRaw(txRaw) {
        const { endpoints, txTimeout } = this;
        const txResponse = await new TxGrpcApi_1.TxGrpcApi(endpoints.grpc).broadcast(txRaw, {
            txTimeout,
        });
        if (txResponse.code !== 0) {
            throw new exceptions_1.GeneralException(new Error(`Transaction failed to be broadcasted - ${txResponse.rawLog} - ${txResponse.txHash}`));
        }
        return txResponse;
    }
}
exports.MsgBroadcasterWithPk = MsgBroadcasterWithPk;
//# sourceMappingURL=MsgBroadcasterWithPk.js.map