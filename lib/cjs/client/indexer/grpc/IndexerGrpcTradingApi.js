"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcTradingApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcTradingApi extends BaseIndexerGrpcConsumer_1.default {
    module = types_1.IndexerModule.Trading;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new indexer_proto_ts_1.InjectiveTradingRpc.InjectiveTradingRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchGridStrategies({ accountAddress, subaccountId, state, marketId, }) {
        const request = indexer_proto_ts_1.InjectiveTradingRpc.ListTradingStrategiesRequest.create();
        if (accountAddress) {
            request.accountAddress = accountAddress;
        }
        if (subaccountId) {
            request.subaccountId = subaccountId;
        }
        if (state) {
            request.state = state;
        }
        if (marketId) {
            request.marketId = marketId;
        }
        try {
            const response = await this.retry(() => this.client.ListTradingStrategies(request));
            return response;
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveTradingRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GridStrategies',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GridStrategies',
                contextModule: this.module,
            });
        }
    }
}
exports.IndexerGrpcTradingApi = IndexerGrpcTradingApi;
//# sourceMappingURL=IndexerGrpcTradingApi.js.map