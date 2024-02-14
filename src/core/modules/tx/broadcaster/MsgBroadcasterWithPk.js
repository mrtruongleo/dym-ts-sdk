"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor(options) {
        this.simulateTx = false;
        this.gasBufferCoefficient = 1.1;
        this.txTimeout = utils_1.DEFAULT_BLOCK_TIMEOUT_HEIGHT;
        const networkInfo = (0, networks_1.getNetworkInfo)(options.network);
        const endpoints = (0, networks_1.getNetworkEndpoints)(options.network);
        this.gasBufferCoefficient = options.gasBufferCoefficient || 1.1;
        this.simulateTx = options.simulateTx || false;
        this.chainId = networkInfo.chainId;
        this.txTimeout = options.txTimeout || utils_1.DEFAULT_BLOCK_TIMEOUT_HEIGHT;
        this.ethereumChainId =
            options.ethereumChainId || networkInfo.ethereumChainId;
        this.endpoints = Object.assign(Object.assign({}, endpoints), (options.endpoints || {}));
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
    broadcast(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { txRaw } = yield this.prepareTxForBroadcast(transaction);
            return yield this.broadcastTxRaw(txRaw);
        });
    }
    /**
     * Broadcasting the transaction with fee delegation services
     *
     * @param tx
     * @returns {string} transaction hash
     */
    broadcastWithFeeDelegation(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { simulateTx, privateKey, ethereumChainId, endpoints } = this;
            const msgs = Array.isArray(transaction.msgs)
                ? transaction.msgs
                : [transaction.msgs];
            const tx = Object.assign(Object.assign({}, transaction), { msgs: msgs });
            const web3Msgs = msgs.map((msg) => msg.toWeb3());
            if (!ethereumChainId) {
                throw new exceptions_1.GeneralException(new Error('Please provide ethereumChainId'));
            }
            const transactionApi = new client_1.IndexerGrpcTransactionApi(endpoints.indexer);
            const txResponse = yield transactionApi.prepareTxRequest({
                memo: tx.memo,
                message: web3Msgs,
                address: tx.ethereumAddress,
                chainId: ethereumChainId,
                gasLimit: (0, msgs_1.getGasPriceBasedOnMessage)(msgs),
                estimateGas: simulateTx || false,
            });
            const signature = yield privateKey.signTypedData(JSON.parse(txResponse.data));
            const response = yield transactionApi.broadcastTxRequest({
                txResponse,
                message: web3Msgs,
                chainId: ethereumChainId,
                signature: `0x${Buffer.from(signature).toString('hex')}`,
            });
            return yield new TxGrpcApi_1.TxGrpcApi(endpoints.grpc).fetchTxPoll(response.txHash);
        });
    }
    /**
     * Broadcasting the transaction using the client
     *
     * @param tx
     * @returns {string} transaction hash
     */
    simulate(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { privateKey, endpoints, chainId } = this;
            const tx = Object.assign(Object.assign({}, transaction), { msgs: Array.isArray(transaction.msgs)
                    ? transaction.msgs
                    : [transaction.msgs] });
            /** Account Details * */
            const publicKey = privateKey.toPublicKey();
            const accountDetails = yield new grpc_1.ChainGrpcAuthApi(endpoints.grpc).fetchAccount(publicKey.toBech32());
            const { baseAccount } = accountDetails;
            /** Block Details */
            const latestBlock = yield new grpc_1.ChainGrpcTendermintApi(endpoints.grpc).fetchLatestBlock();
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
            const simulationResponse = yield new TxGrpcApi_1.TxGrpcApi(endpoints.grpc).simulate(txRaw);
            return simulationResponse;
        });
    }
    /**
     * In case we don't want to simulate the transaction
     * we get the gas limit based on the message type.
     *
     * If we want to simulate the transaction we set the
     * gas limit based on the simulation and add a small multiplier
     * to be safe (factor of 1.1 (or user specified))
     */
    getTxWithStdFee(args) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { simulateTx, gasBufferCoefficient } = this;
            if (!simulateTx) {
                return (0, tx_1.createTransaction)(args);
            }
            const result = yield this.simulateTxRaw(args);
            if (!((_a = result.gasInfo) === null || _a === void 0 ? void 0 : _a.gasUsed)) {
                return (0, tx_1.createTransaction)(args);
            }
            const stdGasFee = (0, utils_1.getStdFee)(Object.assign(Object.assign({}, args.fee), { gas: new utils_1.BigNumberInBase(result.gasInfo.gasUsed)
                    .times(gasBufferCoefficient)
                    .toFixed() }));
            return (0, tx_1.createTransaction)(Object.assign(Object.assign({}, args), { fee: stdGasFee }));
        });
    }
    /**
     * Create TxRaw and simulate it
     */
    simulateTxRaw(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { endpoints } = this;
            const { txRaw } = (0, tx_1.createTransaction)(args);
            txRaw.signatures = [new Uint8Array(0)];
            const simulationResponse = yield new TxGrpcApi_1.TxGrpcApi(endpoints.grpc).simulate(txRaw);
            return simulationResponse;
        });
    }
    prepareTxForBroadcast(transaction, accountDetails) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { chainId, privateKey, endpoints, txTimeout } = this;
            const msgs = Array.isArray(transaction.msgs)
                ? transaction.msgs
                : [transaction.msgs];
            const tx = Object.assign(Object.assign({}, transaction), { msgs: msgs });
            /** Account Details * */
            const publicKey = privateKey.toPublicKey();
            const actualAccountDetails = yield this.getAccountDetails(accountDetails);
            /** Block Details */
            const latestBlock = yield new grpc_1.ChainGrpcTendermintApi(endpoints.grpc).fetchLatestBlock();
            const latestHeight = latestBlock.header.height;
            const timeoutHeight = new utils_1.BigNumberInBase(latestHeight).plus(txTimeout);
            const gas = (((_a = transaction.gas) === null || _a === void 0 ? void 0 : _a.gas) || (0, msgs_1.getGasPriceBasedOnMessage)(msgs)).toString();
            /** Prepare the Transaction * */
            const { signBytes, txRaw } = yield this.getTxWithStdFee({
                memo: tx.memo || '',
                message: msgs,
                fee: (0, utils_1.getStdFee)(Object.assign(Object.assign({}, tx.gas), { gas })),
                timeoutHeight: timeoutHeight.toNumber(),
                pubKey: publicKey.toBase64(),
                sequence: actualAccountDetails.sequence,
                accountNumber: actualAccountDetails.accountNumber,
                chainId: chainId,
            });
            /** Sign transaction */
            const signature = yield privateKey.sign(Buffer.from(signBytes));
            /** Append Signatures */
            txRaw.signatures = [signature];
            return { txRaw, accountDetails: actualAccountDetails };
        });
    }
    getAccountDetails(accountDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            if (accountDetails) {
                return accountDetails;
            }
            const { privateKey, endpoints } = this;
            const accountDetailsResponse = yield new grpc_1.ChainGrpcAuthApi(endpoints.grpc).fetchAccount(privateKey.toBech32());
            return accountDetailsResponse.baseAccount;
        });
    }
    broadcastTxRaw(txRaw) {
        return __awaiter(this, void 0, void 0, function* () {
            const { endpoints, txTimeout } = this;
            const txResponse = yield new TxGrpcApi_1.TxGrpcApi(endpoints.grpc).broadcast(txRaw, {
                txTimeout,
            });
            if (txResponse.code !== 0) {
                throw new exceptions_1.GeneralException(new Error(`Transaction failed to be broadcasted - ${txResponse.rawLog} - ${txResponse.txHash}`));
            }
            return txResponse;
        });
    }
}
exports.MsgBroadcasterWithPk = MsgBroadcasterWithPk;
