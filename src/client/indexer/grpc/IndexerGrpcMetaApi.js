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
exports.IndexerGrpcMetaApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcMetaApi extends BaseIndexerGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.IndexerModule.Meta;
        this.client = new indexer_proto_ts_1.InjectiveMetaRpc.InjectiveMetaRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchPing() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveMetaRpc.PingRequest.create();
            try {
                const response = yield this.retry(() => this.client.Ping(request));
                return response;
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Ping',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Ping',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveMetaRpc.VersionRequest.create();
            try {
                const response = yield this.retry(() => this.client.Version(request));
                return response;
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Version',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Version',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveMetaRpc.InfoRequest.create();
            request.timestamp = Date.now().toString();
            try {
                const response = yield this.retry(() => this.client.Info(request));
                return response;
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Info',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Info',
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.IndexerGrpcMetaApi = IndexerGrpcMetaApi;
