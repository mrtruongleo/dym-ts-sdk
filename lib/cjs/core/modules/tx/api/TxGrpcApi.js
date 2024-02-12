"use strict";
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
    txService;
    endpoint;
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.txService = new core_proto_ts_1.CosmosTxV1Beta1Service.ServiceClientImpl(BaseGrpcWebConsumer_1.default.getGrpcWebImpl(endpoint));
    }
    async fetchTx(hash) {
        const request = core_proto_ts_1.CosmosTxV1Beta1Service.GetTxRequest.create();
        request.hash = hash;
        try {
            const response = await this.txService.GetTx(request);
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
            return {
                ...txResponse,
                height: parseInt(txResponse.height, 10),
                gasWanted: parseInt(txResponse.gasWanted, 10),
                gasUsed: parseInt(txResponse.gasUsed, 10),
                txHash: txResponse.txhash,
            };
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
    }
    async fetchTxPoll(txHash, timeout = utils_1.DEFAULT_TX_BLOCK_INCLUSION_TIMEOUT_IN_MS || 60000) {
        const POLL_INTERVAL = utils_1.DEFAULT_BLOCK_TIME_IN_SECONDS * 1000;
        for (let i = 0; i <= timeout / POLL_INTERVAL; i += 1) {
            try {
                const txResponse = await this.fetchTx(txHash);
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
            await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
        }
        // Transaction was not included in the block in the desired timeout
        throw new exceptions_1.GrpcUnaryRequestException(new Error(`Transaction was not included in a block before timeout of ${timeout}ms`), {
            context: 'TxGrpcApi',
            contextModule: 'fetch-tx-poll',
        });
    }
    async simulate(txRaw) {
        const { txService } = this;
        const txRawClone = core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.fromPartial({ ...txRaw });
        const simulateRequest = core_proto_ts_1.CosmosTxV1Beta1Service.SimulateRequest.create();
        if (txRawClone.signatures.length === 0) {
            txRawClone.signatures = [new Uint8Array(0)];
        }
        simulateRequest.txBytes =
            core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.encode(txRawClone).finish();
        try {
            const response = await txService.Simulate(simulateRequest);
            const result = {
                ...response.result,
                data: response.result ? response.result.data : '',
                log: response.result ? response.result.log : '',
                eventsList: response.result ? response.result.events : [],
            };
            const gasInfo = {
                ...response.gasInfo,
                gasWanted: response.gasInfo
                    ? parseInt(response.gasInfo.gasWanted, 10)
                    : 0,
                gasUsed: response.gasInfo ? parseInt(response.gasInfo.gasUsed, 10) : 0,
            };
            return {
                result: result,
                gasInfo: gasInfo,
            };
        }
        catch (e) {
            throw new exceptions_1.TransactionException(new Error(e.message));
        }
    }
    async broadcast(txRaw, options) {
        const { txService } = this;
        const mode = options?.mode || core_proto_ts_1.CosmosTxV1Beta1Service.BroadcastMode.BROADCAST_MODE_SYNC;
        const timeout = options?.timeout ||
            new utils_1.BigNumberInBase(options?.txTimeout || utils_1.DEFAULT_BLOCK_TIMEOUT_HEIGHT)
                .times(utils_1.DEFAULT_BLOCK_TIME_IN_SECONDS * 1000)
                .toNumber();
        const broadcastTxRequest = core_proto_ts_1.CosmosTxV1Beta1Service.BroadcastTxRequest.create();
        broadcastTxRequest.txBytes = core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.encode(txRaw).finish();
        broadcastTxRequest.mode = mode;
        try {
            const response = await txService.BroadcastTx(broadcastTxRequest);
            const txResponse = response.txResponse;
            if (txResponse.code !== 0) {
                throw new exceptions_1.TransactionException(new Error(txResponse.rawLog), {
                    contextCode: txResponse.code,
                    contextModule: txResponse.codespace,
                });
            }
            const result = await this.fetchTxPoll(txResponse.txhash, timeout);
            return result;
        }
        catch (e) {
            if (e instanceof exceptions_1.TransactionException) {
                throw e;
            }
            throw new exceptions_1.TransactionException(new Error(e.message));
        }
    }
    async broadcastBlock(txRaw, broadcastMode = core_proto_ts_1.CosmosTxV1Beta1Service
        .BroadcastMode.BROADCAST_MODE_BLOCK) {
        const { txService } = this;
        const broadcastTxRequest = core_proto_ts_1.CosmosTxV1Beta1Service.BroadcastTxRequest.create();
        broadcastTxRequest.txBytes = core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.encode(txRaw).finish();
        broadcastTxRequest.mode = broadcastMode;
        try {
            const response = await txService.BroadcastTx(broadcastTxRequest);
            const txResponse = response.txResponse;
            if (!txResponse) {
                throw new exceptions_1.GeneralException(new Error('There was an issue broadcasting the transaction'));
            }
            const result = {
                ...txResponse,
                height: parseInt(txResponse.height, 10),
                gasWanted: parseInt(txResponse.gasWanted, 10),
                gasUsed: parseInt(txResponse.gasUsed, 10),
                txHash: txResponse.txhash,
            };
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
    }
}
exports.TxGrpcApi = TxGrpcApi;
//# sourceMappingURL=TxGrpcApi.js.map