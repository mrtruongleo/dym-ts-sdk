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
exports.IndexerGrpcTradingApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcTradingApi extends BaseIndexerGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.IndexerModule.Trading;
        this.client = new indexer_proto_ts_1.InjectiveTradingRpc.InjectiveTradingRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchGridStrategies({ accountAddress, subaccountId, state, marketId, }) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const response = yield this.retry(() => this.client.ListTradingStrategies(request));
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
        });
    }
}
exports.IndexerGrpcTradingApi = IndexerGrpcTradingApi;
