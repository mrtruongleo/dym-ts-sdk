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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxGrpcApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const utils_1 = require("@injectivelabs/utils");
const BaseGrpcWebConsumer_1 = __importDefault(require("../../../../client/base/BaseGrpcWebConsumer"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
class TxGrpcApi {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.txService = new core_proto_ts_1.CosmosTxV1Beta1Service.ServiceClientImpl(BaseGrpcWebConsumer_1.default.getGrpcWebImpl(endpoint));
    }
    fetchTx(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosTxV1Beta1Service.GetTxRequest.create();
            request.hash = hash;
            try {
                const response = yield this.txService.GetTx(request);
                const txResponse = response.txResponse;
                if (!txResponse) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(`The transaction with ${hash} is not found`), {
                        context: 'TxGrpcApi',
                        contextModule: 'fetch-tx',
                    });
                }
                if (txResponse.code !== 0) {
                    throw new exceptions_1.TransactionException(new Error(txResponse.rawLog), {
                        contextCode: txResponse.code,
                        contextModule: txResponse.codespace,
                    });
                }
                return Object.assign(Object.assign({}, txResponse), { height: parseInt(txResponse.height, 10), gasWanted: parseInt(txResponse.gasWanted, 10), gasUsed: parseInt(txResponse.gasUsed, 10), txHash: txResponse.txhash });
            }
            catch (e) {
                // Transaction has failed on the chain
                if (e instanceof exceptions_1.TransactionException) {
                    throw e;
                }
                // Failed to query the transaction on the chain
                if (e instanceof core_proto_ts_1.CosmosTxV1Beta1Service.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                    });
                }
                // The response itself failed
                throw new exceptions_1.GrpcUnaryRequestException(new Error('There was an issue while fetching transaction details'), {
                    context: 'TxGrpcApi',
                    contextModule: 'fetch-tx',
                });
            }
        });
    }
    fetchTxPoll(txHash, timeout = utils_1.DEFAULT_TX_BLOCK_INCLUSION_TIMEOUT_IN_MS || 60000) {
        return __awaiter(this, void 0, void 0, function* () {
            const POLL_INTERVAL = utils_1.DEFAULT_BLOCK_TIME_IN_SECONDS * 1000;
            for (let i = 0; i <= timeout / POLL_INTERVAL; i += 1) {
                try {
                    const txResponse = yield this.fetchTx(txHash);
                    if (txResponse) {
                        return txResponse;
                    }
                }
                catch (e) {
                    // We throw only if the transaction failed on chain
                    if (e instanceof exceptions_1.TransactionException) {
                        throw e;
                    }
                }
                yield new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
            }
            // Transaction was not included in the block in the desired timeout
            throw new exceptions_1.GrpcUnaryRequestException(new Error(`Transaction was not included in a block before timeout of ${timeout}ms`), {
                context: 'TxGrpcApi',
                contextModule: 'fetch-tx-poll',
            });
        });
    }
    simulate(txRaw) {
        return __awaiter(this, void 0, void 0, function* () {
            const { txService } = this;
            const txRawClone = core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.fromPartial(Object.assign({}, txRaw));
            const simulateRequest = core_proto_ts_1.CosmosTxV1Beta1Service.SimulateRequest.create();
            if (txRawClone.signatures.length === 0) {
                txRawClone.signatures = [new Uint8Array(0)];
            }
            simulateRequest.txBytes =
                core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.encode(txRawClone).finish();
            try {
                const response = yield txService.Simulate(simulateRequest);
                const result = Object.assign(Object.assign({}, response.result), { data: response.result ? response.result.data : '', log: response.result ? response.result.log : '', eventsList: response.result ? response.result.events : [] });
                const gasInfo = Object.assign(Object.assign({}, response.gasInfo), { gasWanted: response.gasInfo
                        ? parseInt(response.gasInfo.gasWanted, 10)
                        : 0, gasUsed: response.gasInfo ? parseInt(response.gasInfo.gasUsed, 10) : 0 });
                return {
                    result: result,
                    gasInfo: gasInfo,
                };
            }
            catch (e) {
                throw new exceptions_1.TransactionException(new Error(e.message));
            }
        });
    }
    broadcast(txRaw, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { txService } = this;
            const mode = (options === null || options === void 0 ? void 0 : options.mode) || core_proto_ts_1.CosmosTxV1Beta1Service.BroadcastMode.BROADCAST_MODE_SYNC;
            const timeout = (options === null || options === void 0 ? void 0 : options.timeout) ||
                new utils_1.BigNumberInBase((options === null || options === void 0 ? void 0 : options.txTimeout) || utils_1.DEFAULT_BLOCK_TIMEOUT_HEIGHT)
                    .times(utils_1.DEFAULT_BLOCK_TIME_IN_SECONDS * 1000)
                    .toNumber();
            const broadcastTxRequest = core_proto_ts_1.CosmosTxV1Beta1Service.BroadcastTxRequest.create();
            broadcastTxRequest.txBytes = core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.encode(txRaw).finish();
            broadcastTxRequest.mode = mode;
            try {
                const response = yield txService.BroadcastTx(broadcastTxRequest);
                const txResponse = response.txResponse;
                if (txResponse.code !== 0) {
                    throw new exceptions_1.TransactionException(new Error(txResponse.rawLog), {
                        contextCode: txResponse.code,
                        contextModule: txResponse.codespace,
                    });
                }
                const result = yield this.fetchTxPoll(txResponse.txhash, timeout);
                return result;
            }
            catch (e) {
                if (e instanceof exceptions_1.TransactionException) {
                    throw e;
                }
                throw new exceptions_1.TransactionException(new Error(e.message));
            }
        });
    }
    broadcastBlock(txRaw, broadcastMode = core_proto_ts_1.CosmosTxV1Beta1Service
        .BroadcastMode.BROADCAST_MODE_BLOCK) {
        return __awaiter(this, void 0, void 0, function* () {
            const { txService } = this;
            const broadcastTxRequest = core_proto_ts_1.CosmosTxV1Beta1Service.BroadcastTxRequest.create();
            broadcastTxRequest.txBytes = core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.encode(txRaw).finish();
            broadcastTxRequest.mode = broadcastMode;
            try {
                const response = yield txService.BroadcastTx(broadcastTxRequest);
                const txResponse = response.txResponse;
                if (!txResponse) {
                    throw new exceptions_1.GeneralException(new Error('There was an issue broadcasting the transaction'));
                }
                const result = Object.assign(Object.assign({}, txResponse), { height: parseInt(txResponse.height, 10), gasWanted: parseInt(txResponse.gasWanted, 10), gasUsed: parseInt(txResponse.gasUsed, 10), txHash: txResponse.txhash });
                if (result.code !== 0) {
                    throw new exceptions_1.TransactionException(new Error(result.rawLog), {
                        contextCode: result.code,
                        contextModule: result.codespace,
                    });
                }
                return result;
            }
            catch (e) {
                if (e instanceof exceptions_1.TransactionException) {
                    throw e;
                }
                throw new exceptions_1.TransactionException(new Error(e.message));
            }
        });
    }
}
exports.TxGrpcApi = TxGrpcApi;
