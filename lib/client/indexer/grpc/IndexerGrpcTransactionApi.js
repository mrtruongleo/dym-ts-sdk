var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DEFAULT_GAS_LIMIT, DEFAULT_EXCHANGE_LIMIT, DEFAULT_BRIDGE_FEE_DENOM, DEFAULT_BRIDGE_FEE_PRICE, } from '@injectivelabs/utils';
import { recoverTypedSignaturePubKey } from '../../../utils/transaction';
import { IndexerModule } from '../types';
import { GrpcUnaryRequestException, TransactionException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { getGrpcIndexerWebImpl } from '../../base/BaseIndexerGrpcWebConsumer';
import { InjectiveExchangeRpc } from '@injectivelabs/indexer-proto-ts';
import { CosmosBaseV1Beta1Coin, CosmosTxV1Beta1Tx, } from '@injectivelabs/core-proto-ts';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcTransactionApi {
    constructor(endpoint) {
        this.module = IndexerModule.Transaction;
        this.client = new InjectiveExchangeRpc.InjectiveExchangeRPCClientImpl(getGrpcIndexerWebImpl(endpoint));
    }
    prepareTxRequest({ address, chainId, message, memo, estimateGas = true, gasLimit = DEFAULT_GAS_LIMIT, feeDenom = DEFAULT_BRIDGE_FEE_DENOM, feePrice = DEFAULT_BRIDGE_FEE_PRICE, timeoutHeight, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const txFeeAmount = CosmosBaseV1Beta1Coin.Coin.create();
            txFeeAmount.denom = feeDenom;
            txFeeAmount.amount = feePrice;
            const cosmosTxFee = InjectiveExchangeRpc.CosmosTxFee.create();
            cosmosTxFee.price = [txFeeAmount];
            if (!estimateGas) {
                cosmosTxFee.gas = gasLimit.toString();
            }
            const prepareTxRequest = InjectiveExchangeRpc.PrepareTxRequest.create();
            prepareTxRequest.chainId = chainId.toString();
            prepareTxRequest.signerAddress = address;
            prepareTxRequest.fee = cosmosTxFee;
            const arrayOfMessages = Array.isArray(message) ? message : [message];
            const messagesList = arrayOfMessages.map((message) => Buffer.from(JSON.stringify(message), 'utf8'));
            prepareTxRequest.msgs = messagesList;
            if (timeoutHeight !== undefined) {
                prepareTxRequest.timeoutHeight = timeoutHeight.toString();
            }
            if (memo) {
                prepareTxRequest.memo = typeof memo === 'number' ? memo.toString() : memo;
            }
            try {
                const response = yield this.client.PrepareTx(prepareTxRequest);
                return response;
            }
            catch (e) {
                if (e instanceof InjectiveExchangeRpc.GrpcWebError) {
                    throw new TransactionException(new Error(e.toString()), {
                        code: e.code,
                        context: 'PrepareTx',
                        contextModule: 'Web3Gateway',
                        type: e.type,
                    });
                }
                throw new TransactionException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'PrepareTx',
                    contextModule: 'Web3Gateway',
                });
            }
        });
    }
    prepareCosmosTxRequest({ memo, address, message, estimateGas = true, gasLimit = DEFAULT_GAS_LIMIT, feeDenom = DEFAULT_BRIDGE_FEE_DENOM, feePrice = DEFAULT_BRIDGE_FEE_PRICE, timeoutHeight, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const txFeeAmount = CosmosBaseV1Beta1Coin.Coin.create();
            txFeeAmount.denom = feeDenom;
            txFeeAmount.amount = feePrice;
            const cosmosTxFee = InjectiveExchangeRpc.CosmosTxFee.create();
            cosmosTxFee.price = [txFeeAmount];
            if (!estimateGas) {
                cosmosTxFee.gas = gasLimit.toString();
            }
            const prepareTxRequest = InjectiveExchangeRpc.PrepareCosmosTxRequest.create();
            prepareTxRequest.fee = cosmosTxFee;
            prepareTxRequest.senderAddress = address;
            const arrayOfMessages = Array.isArray(message) ? message : [message];
            const messagesList = arrayOfMessages.map((message) => Buffer.from(JSON.stringify(message), 'utf8'));
            prepareTxRequest.msgs = messagesList;
            if (timeoutHeight !== undefined) {
                prepareTxRequest.timeoutHeight = timeoutHeight.toString();
            }
            if (memo) {
                prepareTxRequest.memo = typeof memo === 'number' ? memo.toString() : memo;
            }
            try {
                const response = yield this.client.PrepareCosmosTx(prepareTxRequest);
                return response;
            }
            catch (e) {
                if (e instanceof InjectiveExchangeRpc.GrpcWebError) {
                    throw new TransactionException(new Error(e.toString()), {
                        code: e.code,
                        type: e.type,
                        context: 'CosmosPrepareTx',
                        contextModule: 'Web3Gateway',
                    });
                }
                throw new TransactionException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'CosmosPrepareTx',
                    contextModule: 'Web3Gateway',
                });
            }
        });
    }
    prepareExchangeTxRequest({ address, chainId, message, memo, estimateGas = true, gasLimit = DEFAULT_EXCHANGE_LIMIT, feeDenom = DEFAULT_BRIDGE_FEE_DENOM, feePrice = DEFAULT_BRIDGE_FEE_PRICE, timeoutHeight, delegatedFee, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const txFeeAmount = CosmosBaseV1Beta1Coin.Coin.create();
            txFeeAmount.denom = feeDenom;
            txFeeAmount.amount = feePrice;
            const cosmosTxFee = InjectiveExchangeRpc.CosmosTxFee.create();
            cosmosTxFee.price = [txFeeAmount];
            if (delegatedFee !== undefined) {
                cosmosTxFee.delegateFee = delegatedFee;
            }
            if (!estimateGas) {
                cosmosTxFee.gas = gasLimit.toString();
            }
            const prepareTxRequest = InjectiveExchangeRpc.PrepareTxRequest.create();
            prepareTxRequest.chainId = chainId.toString();
            prepareTxRequest.signerAddress = address;
            prepareTxRequest.fee = cosmosTxFee;
            const arrayOfMessages = Array.isArray(message) ? message : [message];
            const messagesList = arrayOfMessages.map((message) => Buffer.from(JSON.stringify(message), 'utf8'));
            prepareTxRequest.msgs = messagesList;
            if (timeoutHeight !== undefined) {
                prepareTxRequest.timeoutHeight = timeoutHeight.toString();
            }
            if (memo) {
                prepareTxRequest.memo = typeof memo === 'number' ? memo.toString() : memo;
            }
            try {
                const response = yield this.client.PrepareTx(prepareTxRequest);
                return response;
            }
            catch (e) {
                if (e instanceof InjectiveExchangeRpc.GrpcWebError) {
                    throw new TransactionException(new Error(e.toString()), {
                        code: e.code,
                        type: e.type,
                        context: 'PrepareTx',
                        contextModule: 'Web3Gateway',
                    });
                }
                throw new TransactionException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'PrepareTx',
                    contextModule: 'Web3Gateway',
                });
            }
        });
    }
    /**
     * Keep in mind that the transaction is just added
     * to the mempool, we need to query the transaction hash
     * if we want to ensure that the transaction is included
     * in the block
     */
    broadcastTxRequest({ signature, chainId, message, txResponse, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedTypedData = JSON.parse(txResponse.data);
            const publicKeyHex = recoverTypedSignaturePubKey(parsedTypedData, signature);
            const cosmosPubKey = InjectiveExchangeRpc.CosmosPubKey.create();
            cosmosPubKey.type = txResponse.pubKeyType;
            cosmosPubKey.key = publicKeyHex;
            parsedTypedData.message.msgs = null;
            const broadcastTxRequest = InjectiveExchangeRpc.BroadcastTxRequest.create();
            broadcastTxRequest.mode = 'sync';
            broadcastTxRequest.chainId = chainId.toString();
            broadcastTxRequest.pubKey = cosmosPubKey;
            broadcastTxRequest.signature = signature;
            broadcastTxRequest.tx = Buffer.from(JSON.stringify(parsedTypedData.message), 'utf8');
            broadcastTxRequest.feePayer = txResponse.feePayer;
            broadcastTxRequest.feePayerSig = txResponse.feePayerSig;
            const arrayOfMessages = Array.isArray(message) ? message : [message];
            const messagesList = arrayOfMessages.map((message) => Buffer.from(JSON.stringify(message), 'utf8'));
            broadcastTxRequest.msgs = messagesList;
            try {
                const response = yield this.client.BroadcastTx(broadcastTxRequest);
                return response;
            }
            catch (e) {
                if (e instanceof InjectiveExchangeRpc.GrpcWebError) {
                    throw new TransactionException(new Error(e.toString()), {
                        code: e.code,
                        type: e.type,
                        context: 'BroadcastTx',
                        contextModule: 'Web3Gateway',
                    });
                }
                throw new TransactionException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'BroadcastTx',
                    contextModule: 'Web3Gateway',
                });
            }
        });
    }
    /**
     * Keep in mind that the transaction is just added
     * to the mempool, we need to query the transaction hash
     * if we want to ensure that the transaction is included
     * in the block
     */
    broadcastCosmosTxRequest({ address, signature, txRaw, pubKey, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const pubKeyInHex = Buffer.from(pubKey.value, 'base64').toString('hex');
            const signatureInHex = Buffer.from(signature, 'base64').toString('hex');
            const cosmosPubKey = InjectiveExchangeRpc.CosmosPubKey.create();
            cosmosPubKey.type = pubKey.type;
            cosmosPubKey.key = `0x${pubKeyInHex}`;
            txRaw.signatures = [];
            const broadcastTxRequest = InjectiveExchangeRpc.BroadcastCosmosTxRequest.create();
            broadcastTxRequest.senderAddress = address;
            broadcastTxRequest.pubKey = cosmosPubKey;
            broadcastTxRequest.signature = `0x${signatureInHex}`;
            broadcastTxRequest.tx = CosmosTxV1Beta1Tx.TxRaw.encode(txRaw).finish();
            try {
                const response = yield this.client.BroadcastCosmosTx(broadcastTxRequest);
                return response;
            }
            catch (e) {
                if (e instanceof GrpcUnaryRequestException) {
                    throw new TransactionException(e.toOriginalError(), {
                        code: e.code,
                        type: e.type,
                        context: 'BroadcastTx',
                        contextModule: 'Web3Gateway',
                    });
                }
                throw new TransactionException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'BroadcastTx',
                    contextModule: 'Web3Gateway',
                });
            }
        });
    }
    fetchFeePayer() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveExchangeRpc.GetFeePayerRequest.create();
            try {
                const response = yield this.client.GetFeePayer(request);
                return response;
            }
            catch (e) {
                if (e instanceof InjectiveExchangeRpc.GrpcWebError) {
                    throw new TransactionException(new Error(e.toString()), {
                        code: e.code,
                        type: e.type,
                        context: 'FeePayer',
                        contextModule: 'Web3Gateway',
                    });
                }
                throw new TransactionException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'FeePayer',
                    contextModule: 'Web3Gateway',
                });
            }
        });
    }
}
