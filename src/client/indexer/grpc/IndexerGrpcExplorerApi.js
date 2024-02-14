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
exports.IndexerGrpcExplorerApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcExplorerApi extends BaseIndexerGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.IndexerModule.Explorer;
        this.client = new indexer_proto_ts_1.InjectiveExplorerRpc.InjectiveExplorerRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchTxByHash(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveExplorerRpc.GetTxByTxHashRequest.create();
            request.hash = hash;
            try {
                const response = yield this.client.GetTxByTxHash(request);
                return transformers_1.IndexerGrpcExplorerTransformer.getTxByTxHashResponseToTx(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveExplorerRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetTxByTxHash',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'GetTxByTxHash',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchAccountTx({ address, limit, type, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveExplorerRpc.GetAccountTxsRequest.create();
            request.address = address;
            if (limit) {
                request.limit = limit;
            }
            if (type) {
                request.type = type;
            }
            try {
                const response = yield this.retry(() => this.client.GetAccountTxs(request));
                return transformers_1.IndexerGrpcExplorerTransformer.getAccountTxsResponseToAccountTxs(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveExplorerRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetAccountTxs',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'GetAccountTxs',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidator(validatorAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveExplorerRpc.GetValidatorRequest.create();
            request.address = validatorAddress;
            try {
                const response = yield this.retry(() => this.client.GetValidator(request));
                return transformers_1.IndexerGrpcExplorerTransformer.validatorResponseToValidator(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveExplorerRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetValidator',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'GetValidator',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidatorUptime(validatorAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveExplorerRpc.GetValidatorUptimeRequest.create();
            request.address = validatorAddress;
            try {
                const response = yield this.retry(() => this.client.GetValidatorUptime(request));
                return transformers_1.IndexerGrpcExplorerTransformer.getValidatorUptimeResponseToValidatorUptime(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveExplorerRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetValidatorUptime',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'GetValidatorUptime',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchPeggyDepositTxs({ sender, receiver, limit, skip, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveExplorerRpc.GetPeggyDepositTxsRequest.create();
            if (sender) {
                request.sender = sender;
            }
            if (receiver) {
                request.receiver = receiver;
            }
            if (limit) {
                request.limit = limit;
            }
            if (skip) {
                request.skip = skip.toString();
            }
            try {
                const response = yield this.retry(() => this.client.GetPeggyDepositTxs(request));
                return transformers_1.IndexerGrpcExplorerTransformer.getPeggyDepositTxsResponseToPeggyDepositTxs(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveExplorerRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetPeggyDepositTxs',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'GetPeggyDepositTxs',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchPeggyWithdrawalTxs({ sender, receiver, limit, skip, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveExplorerRpc.GetPeggyWithdrawalTxsRequest.create();
            if (sender) {
                request.sender = sender;
            }
            if (receiver) {
                request.receiver = receiver;
            }
            if (limit) {
                request.limit = limit;
            }
            if (skip) {
                request.skip = skip.toString();
            }
            try {
                const response = yield this.retry(() => this.client.GetPeggyWithdrawalTxs(request));
                return transformers_1.IndexerGrpcExplorerTransformer.getPeggyWithdrawalTxsResponseToPeggyWithdrawalTxs(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveExplorerRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetPeggyWithdrawalTxs',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'GetPeggyWithdrawalTxs',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchBlocks({ before, after, limit, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveExplorerRpc.GetBlocksRequest.create();
            if (before) {
                request.before = before.toString();
            }
            if (after) {
                request.after = after.toString();
            }
            if (limit) {
                request.limit = limit;
            }
            try {
                const response = yield this.retry(() => this.client.GetBlocks(request));
                return response;
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveExplorerRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetBlocks',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'GetBlocks',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchBlock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveExplorerRpc.GetBlockRequest.create();
            request.id = id;
            try {
                const response = yield this.retry(() => this.client.GetBlock(request));
                return response;
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveExplorerRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetBlock',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'GetBlock',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchTxs({ before, after, limit, skip, type, module, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveExplorerRpc.GetTxsRequest.create();
            if (before) {
                request.before = before.toString();
            }
            if (after) {
                request.after = after.toString();
            }
            if (limit) {
                request.limit = limit;
            }
            if (skip) {
                request.skip = skip.toString();
            }
            if (type) {
                request.type = type;
            }
            if (module) {
                request.module = module;
            }
            try {
                const response = yield this.retry(() => this.client.GetTxs(request));
                return response;
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveExplorerRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetTxs',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'GetTxs',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchIBCTransferTxs({ sender, receiver, srcChannel, srcPort, destChannel, destPort, limit, skip, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveExplorerRpc.GetIBCTransferTxsRequest.create();
            if (sender) {
                request.sender = sender;
            }
            if (receiver) {
                request.receiver = receiver;
            }
            if (limit) {
                request.limit = limit;
            }
            if (skip) {
                request.skip = skip.toString();
            }
            if (srcChannel) {
                request.srcChannel = srcChannel;
            }
            if (srcPort) {
                request.srcPort = srcPort;
            }
            if (destChannel) {
                request.destChannel = destChannel;
            }
            if (destPort) {
                request.destPort = destPort;
            }
            try {
                const response = yield this.retry(() => this.client.GetIBCTransferTxs(request));
                return transformers_1.IndexerGrpcExplorerTransformer.getIBCTransferTxsResponseToIBCTransferTxs(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveExplorerRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetIBCTransferTxs',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'GetIBCTransferTxs',
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.IndexerGrpcExplorerApi = IndexerGrpcExplorerApi;
