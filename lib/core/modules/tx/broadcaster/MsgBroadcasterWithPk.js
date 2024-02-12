import { PrivateKey } from '../../../accounts';
import { createTransaction } from '../tx';
import { TxGrpcApi } from '../api/TxGrpcApi';
import { ChainGrpcAuthApi, ChainGrpcTendermintApi, } from '../../../../client/chain/grpc';
import { getStdFee, DEFAULT_STD_FEE, BigNumberInBase, DEFAULT_BLOCK_TIMEOUT_HEIGHT, } from '@injectivelabs/utils';
import { GeneralException } from '@injectivelabs/exceptions';
import { getNetworkInfo, getNetworkEndpoints, } from '@injectivelabs/networks';
import { getGasPriceBasedOnMessage } from '../../../../utils/msgs';
import { IndexerGrpcTransactionApi } from '../../../../client';
/**
 * This class is used to broadcast transactions
 * using a privateKey as a signer
 * for the transactions and broadcasting
 * the transactions directly to the node
 *
 * Mainly used for working in a Node Environment
 */
export class MsgBroadcasterWithPk {
    endpoints;
    chainId;
    ethereumChainId;
    privateKey;
    simulateTx = false;
    gasBufferCoefficient = 1.1;
    txTimeout = DEFAULT_BLOCK_TIMEOUT_HEIGHT;
    constructor(options) {
        const networkInfo = getNetworkInfo(options.network);
        const endpoints = getNetworkEndpoints(options.network);
        this.gasBufferCoefficient = options.gasBufferCoefficient || 1.1;
        this.simulateTx = options.simulateTx || false;
        this.chainId = networkInfo.chainId;
        this.txTimeout = options.txTimeout || DEFAULT_BLOCK_TIMEOUT_HEIGHT;
        this.ethereumChainId =
            options.ethereumChainId || networkInfo.ethereumChainId;
        this.endpoints = { ...endpoints, ...(options.endpoints || {}) };
        this.privateKey =
            options.privateKey instanceof PrivateKey
                ? options.privateKey
                : PrivateKey.fromHex(options.privateKey);
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
            throw new GeneralException(new Error('Please provide ethereumChainId'));
        }
        const transactionApi = new IndexerGrpcTransactionApi(endpoints.indexer);
        const txResponse = await transactionApi.prepareTxRequest({
            memo: tx.memo,
            message: web3Msgs,
            address: tx.ethereumAddress,
            chainId: ethereumChainId,
            gasLimit: getGasPriceBasedOnMessage(msgs),
            estimateGas: simulateTx || false,
        });
        const signature = await privateKey.signTypedData(JSON.parse(txResponse.data));
        const response = await transactionApi.broadcastTxRequest({
            txResponse,
            message: web3Msgs,
            chainId: ethereumChainId,
            signature: `0x${Buffer.from(signature).toString('hex')}`,
        });
        return await new TxGrpcApi(endpoints.grpc).fetchTxPoll(response.txHash);
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
        const accountDetails = await new ChainGrpcAuthApi(endpoints.grpc).fetchAccount(publicKey.toBech32());
        const { baseAccount } = accountDetails;
        /** Block Details */
        const latestBlock = await new ChainGrpcTendermintApi(endpoints.grpc).fetchLatestBlock();
        const latestHeight = latestBlock.header.height;
        const timeoutHeight = new BigNumberInBase(latestHeight).plus(DEFAULT_BLOCK_TIMEOUT_HEIGHT);
        /** Prepare the Transaction * */
        const { txRaw } = createTransaction({
            memo: tx.memo || '',
            fee: DEFAULT_STD_FEE,
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
        const simulationResponse = await new TxGrpcApi(endpoints.grpc).simulate(txRaw);
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
            return createTransaction(args);
        }
        const result = await this.simulateTxRaw(args);
        if (!result.gasInfo?.gasUsed) {
            return createTransaction(args);
        }
        const stdGasFee = getStdFee({
            ...args.fee,
            gas: new BigNumberInBase(result.gasInfo.gasUsed)
                .times(gasBufferCoefficient)
                .toFixed(),
        });
        return createTransaction({ ...args, fee: stdGasFee });
    }
    /**
     * Create TxRaw and simulate it
     */
    async simulateTxRaw(args) {
        const { endpoints } = this;
        const { txRaw } = createTransaction(args);
        txRaw.signatures = [new Uint8Array(0)];
        const simulationResponse = await new TxGrpcApi(endpoints.grpc).simulate(txRaw);
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
        const latestBlock = await new ChainGrpcTendermintApi(endpoints.grpc).fetchLatestBlock();
        const latestHeight = latestBlock.header.height;
        const timeoutHeight = new BigNumberInBase(latestHeight).plus(txTimeout);
        const gas = (transaction.gas?.gas || getGasPriceBasedOnMessage(msgs)).toString();
        /** Prepare the Transaction * */
        const { signBytes, txRaw } = await this.getTxWithStdFee({
            memo: tx.memo || '',
            message: msgs,
            fee: getStdFee({ ...tx.gas, gas }),
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
        const accountDetailsResponse = await new ChainGrpcAuthApi(endpoints.grpc).fetchAccount(privateKey.toBech32());
        return accountDetailsResponse.baseAccount;
    }
    async broadcastTxRaw(txRaw) {
        const { endpoints, txTimeout } = this;
        const txResponse = await new TxGrpcApi(endpoints.grpc).broadcast(txRaw, {
            txTimeout,
        });
        if (txResponse.code !== 0) {
            throw new GeneralException(new Error(`Transaction failed to be broadcasted - ${txResponse.rawLog} - ${txResponse.txHash}`));
        }
        return txResponse;
    }
}
