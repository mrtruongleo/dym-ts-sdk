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
exports.IndexerGrpcOracleApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
const IndexerGrpcOracleTransformer_1 = require("../transformers/IndexerGrpcOracleTransformer");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcOracleApi extends BaseIndexerGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.IndexerModule.Oracle;
        this.client = new indexer_proto_ts_1.InjectiveOracleRpc.InjectiveOracleRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchOracleList() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveOracleRpc.OracleListRequest.create();
            try {
                const response = yield this.retry(() => this.client.OracleList(request));
                return IndexerGrpcOracleTransformer_1.IndexerGrpcOracleTransformer.oraclesResponseToOracles(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveOracleRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'OracleList',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'OracleList',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchOraclePrice({ baseSymbol, quoteSymbol, oracleScaleFactor, oracleType, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveOracleRpc.PriceRequest.create();
            request.baseSymbol = baseSymbol;
            request.quoteSymbol = quoteSymbol;
            request.oracleType = oracleType;
            if (oracleScaleFactor) {
                request.oracleScaleFactor = oracleScaleFactor;
            }
            try {
                const response = yield this.retry(() => this.client.Price(request));
                return response;
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveOracleRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Price',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Price',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchOraclePriceNoThrow({ baseSymbol, quoteSymbol, oracleScaleFactor, oracleType, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveOracleRpc.PriceRequest.create();
            request.baseSymbol = baseSymbol;
            request.quoteSymbol = quoteSymbol;
            request.oracleType = oracleType;
            if (oracleScaleFactor) {
                request.oracleScaleFactor = oracleScaleFactor;
            }
            try {
                const response = yield this.retry(() => this.client.Price(request));
                return response;
            }
            catch (e) {
                if (e.message.includes('object not found')) {
                    return {
                        price: '0',
                    };
                }
                if (e instanceof indexer_proto_ts_1.InjectiveOracleRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Price',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Price',
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.IndexerGrpcOracleApi = IndexerGrpcOracleApi;
