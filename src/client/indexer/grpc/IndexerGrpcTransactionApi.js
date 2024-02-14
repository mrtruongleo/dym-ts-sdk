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
exports.IndexerGrpcTransactionApi = void 0;
const utils_1 = require("@injectivelabs/utils");
const transaction_1 = require("../../../utils/transaction");
const types_1 = require("../types");
const exceptions_1 = require("@injectivelabs/exceptions");
const BaseIndexerGrpcWebConsumer_1 = require("../../base/BaseIndexerGrpcWebConsumer");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcTransactionApi {
    constructor(endpoint) {
        this.module = types_1.IndexerModule.Transaction;
        this.client = new indexer_proto_ts_1.InjectiveExchangeRpc.InjectiveExchangeRPCClientImpl((0, BaseIndexerGrpcWebConsumer_1.getGrpcIndexerWebImpl)(endpoint));
    }
    prepareTxRequest({ address, chainId, message, memo, estimateGas = true, gasLimit = utils_1.DEFAULT_GAS_LIMIT, feeDenom = utils_1.DEFAULT_BRIDGE_FEE_DENOM, feePrice = utils_1.DEFAULT_BRIDGE_FEE_PRICE, timeoutHeight, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const txFeeAmount = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
            txFeeAmount.denom = feeDenom;
            txFeeAmount.amount = feePrice;
            const cosmosTxFee = indexer_proto_ts_1.InjectiveExchangeRpc.CosmosTxFee.create();
            cosmosTxFee.price = [txFeeAmount];
            if (!estimateGas) {
                cosmosTxFee.gas = gasLimit.toString();
            }
            const prepareTxRequest = indexer_proto_ts_1.InjectiveExchangeRpc.PrepareTxRequest.create();
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
                if (e instanceof indexer_proto_ts_1.InjectiveExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.TransactionException(new Error(e.toString()), {
                        code: e.code,
                        context: 'PrepareTx',
                        contextModule: 'Web3Gateway',
                        type: e.type,
                    });
                }
                throw new exceptions_1.TransactionException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'PrepareTx',
                    contextModule: 'Web3Gateway',
                });
            }
        });
    }
    prepareCosmosTxRequest({ memo, address, message, estimateGas = true, gasLimit = utils_1.DEFAULT_GAS_LIMIT, feeDenom = utils_1.DEFAULT_BRIDGE_FEE_DENOM, feePrice = utils_1.DEFAULT_BRIDGE_FEE_PRICE, timeoutHeight, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const txFeeAmount = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
            txFeeAmount.denom = feeDenom;
            txFeeAmount.amount = feePrice;
            const cosmosTxFee = indexer_proto_ts_1.InjectiveExchangeRpc.CosmosTxFee.create();
            cosmosTxFee.price = [txFeeAmount];
            if (!estimateGas) {
                cosmosTxFee.gas = gasLimit.toString();
            }
            const prepareTxRequest = indexer_proto_ts_1.InjectiveExchangeRpc.PrepareCosmosTxRequest.create();
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
                if (e instanceof indexer_proto_ts_1.InjectiveExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.TransactionException(new Error(e.toString()), {
                        code: e.code,
                        type: e.type,
                        context: 'CosmosPrepareTx',
                        contextModule: 'Web3Gateway',
                    });
                }
                throw new exceptions_1.TransactionException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'CosmosPrepareTx',
                    contextModule: 'Web3Gateway',
                });
            }
        });
    }
    prepareExchangeTxRequest({ address, chainId, message, memo, estimateGas = true, gasLimit = utils_1.DEFAULT_EXCHANGE_LIMIT, feeDenom = utils_1.DEFAULT_BRIDGE_FEE_DENOM, feePrice = utils_1.DEFAULT_BRIDGE_FEE_PRICE, timeoutHeight, delegatedFee, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const txFeeAmount = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
            txFeeAmount.denom = feeDenom;
            txFeeAmount.amount = feePrice;
            const cosmosTxFee = indexer_proto_ts_1.InjectiveExchangeRpc.CosmosTxFee.create();
            cosmosTxFee.price = [txFeeAmount];
            if (delegatedFee !== undefined) {
                cosmosTxFee.delegateFee = delegatedFee;
            }
            if (!estimateGas) {
                cosmosTxFee.gas = gasLimit.toString();
            }
            const prepareTxRequest = indexer_proto_ts_1.InjectiveExchangeRpc.PrepareTxRequest.create();
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
                if (e instanceof indexer_proto_ts_1.InjectiveExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.TransactionException(new Error(e.toString()), {
                        code: e.code,
                        type: e.type,
                        context: 'PrepareTx',
                        contextModule: 'Web3Gateway',
                    });
                }
                throw new exceptions_1.TransactionException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
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
            const publicKeyHex = (0, transaction_1.recoverTypedSignaturePubKey)(parsedTypedData, signature);
            const cosmosPubKey = indexer_proto_ts_1.InjectiveExchangeRpc.CosmosPubKey.create();
            cosmosPubKey.type = txResponse.pubKeyType;
            cosmosPubKey.key = publicKeyHex;
            parsedTypedData.message.msgs = null;
            const broadcastTxRequest = indexer_proto_ts_1.InjectiveExchangeRpc.BroadcastTxRequest.create();
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
                if (e instanceof indexer_proto_ts_1.InjectiveExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.TransactionException(new Error(e.toString()), {
                        code: e.code,
                        type: e.type,
                        context: 'BroadcastTx',
                        contextModule: 'Web3Gateway',
                    });
                }
                throw new exceptions_1.TransactionException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
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
            const cosmosPubKey = indexer_proto_ts_1.InjectiveExchangeRpc.CosmosPubKey.create();
            cosmosPubKey.type = pubKey.type;
            cosmosPubKey.key = `0x${pubKeyInHex}`;
            txRaw.signatures = [];
            const broadcastTxRequest = indexer_proto_ts_1.InjectiveExchangeRpc.BroadcastCosmosTxRequest.create();
            broadcastTxRequest.senderAddress = address;
            broadcastTxRequest.pubKey = cosmosPubKey;
            broadcastTxRequest.signature = `0x${signatureInHex}`;
            broadcastTxRequest.tx = core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.encode(txRaw).finish();
            try {
                const response = yield this.client.BroadcastCosmosTx(broadcastTxRequest);
                return response;
            }
            catch (e) {
                if (e instanceof exceptions_1.GrpcUnaryRequestException) {
                    throw new exceptions_1.TransactionException(e.toOriginalError(), {
                        code: e.code,
                        type: e.type,
                        context: 'BroadcastTx',
                        contextModule: 'Web3Gateway',
                    });
                }
                throw new exceptions_1.TransactionException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'BroadcastTx',
                    contextModule: 'Web3Gateway',
                });
            }
        });
    }
    fetchFeePayer() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveExchangeRpc.GetFeePayerRequest.create();
            try {
                const response = yield this.client.GetFeePayer(request);
                return response;
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.TransactionException(new Error(e.toString()), {
                        code: e.code,
                        type: e.type,
                        context: 'FeePayer',
                        contextModule: 'Web3Gateway',
                    });
                }
                throw new exceptions_1.TransactionException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'FeePayer',
                    contextModule: 'Web3Gateway',
                });
            }
        });
    }
}
exports.IndexerGrpcTransactionApi = IndexerGrpcTransactionApi;
