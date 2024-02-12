"use strict";
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
    module = types_1.IndexerModule.Oracle;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new indexer_proto_ts_1.InjectiveOracleRpc.InjectiveOracleRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchOracleList() {
        const request = indexer_proto_ts_1.InjectiveOracleRpc.OracleListRequest.create();
        try {
            const response = await this.retry(() => this.client.OracleList(request));
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
    }
    async fetchOraclePrice({ baseSymbol, quoteSymbol, oracleScaleFactor, oracleType, }) {
        const request = indexer_proto_ts_1.InjectiveOracleRpc.PriceRequest.create();
        request.baseSymbol = baseSymbol;
        request.quoteSymbol = quoteSymbol;
        request.oracleType = oracleType;
        if (oracleScaleFactor) {
            request.oracleScaleFactor = oracleScaleFactor;
        }
        try {
            const response = await this.retry(() => this.client.Price(request));
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
    }
    async fetchOraclePriceNoThrow({ baseSymbol, quoteSymbol, oracleScaleFactor, oracleType, }) {
        const request = indexer_proto_ts_1.InjectiveOracleRpc.PriceRequest.create();
        request.baseSymbol = baseSymbol;
        request.quoteSymbol = quoteSymbol;
        request.oracleType = oracleType;
        if (oracleScaleFactor) {
            request.oracleScaleFactor = oracleScaleFactor;
        }
        try {
            const response = await this.retry(() => this.client.Price(request));
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
    }
}
exports.IndexerGrpcOracleApi = IndexerGrpcOracleApi;
//# sourceMappingURL=IndexerGrpcOracleApi.js.map