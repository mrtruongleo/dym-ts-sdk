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
exports.IndexerGrpcSpotApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcSpotApi extends BaseIndexerGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.IndexerModule.Spot;
        this.client =
            new indexer_proto_ts_1.InjectiveSpotExchangeRpc.InjectiveSpotExchangeRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchMarkets(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { baseDenom, marketStatus, quoteDenom, marketStatuses } = params || {};
            const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.MarketsRequest.create();
            if (baseDenom) {
                request.baseDenom = baseDenom;
            }
            if (marketStatus) {
                request.marketStatus = marketStatus;
            }
            if (marketStatuses) {
                request.marketStatuses = marketStatuses;
            }
            if (quoteDenom) {
                request.quoteDenom = quoteDenom;
            }
            try {
                const response = yield this.retry(() => this.client.Markets(request));
                return transformers_1.IndexerGrpcSpotTransformer.marketsResponseToMarkets(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveSpotExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Markets',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Markets',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchMarket(marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.MarketRequest.create();
            request.marketId = marketId;
            try {
                const response = yield this.retry(() => this.client.Market(request));
                return transformers_1.IndexerGrpcSpotTransformer.marketResponseToMarket(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveSpotExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Market',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Market',
                    contextModule: this.module,
                });
            }
        });
    }
    /** @deprecated - use fetchOrderbookV2 */
    fetchOrderbook(_marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new exceptions_1.GeneralException(new Error('deprecated - use fetchOrderbookV2'));
        });
    }
    fetchOrders(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marketId, marketIds, subaccountId, orderSide, pagination } = params || {};
            const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.OrdersRequest.create();
            if (marketId) {
                request.marketId = marketId;
            }
            if (marketIds) {
                request.marketIds = marketIds;
            }
            if (subaccountId) {
                request.subaccountId = subaccountId;
            }
            if (orderSide) {
                request.orderSide = orderSide;
            }
            /*
            if (isConditional !== undefined) {
              request.isConditional =isConditional
            }
            */
            if (pagination) {
                if (pagination.skip !== undefined) {
                    request.skip = pagination.skip.toString();
                }
                if (pagination.limit !== undefined) {
                    request.limit = pagination.limit;
                }
                if (pagination.endTime !== undefined) {
                    request.endTime = pagination.endTime.toString();
                }
                if (pagination.startTime !== undefined) {
                    request.startTime = pagination.startTime.toString();
                }
            }
            try {
                const response = yield this.retry(() => this.client.Orders(request));
                return transformers_1.IndexerGrpcSpotTransformer.ordersResponseToOrders(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveSpotExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Orders',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Orders',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchOrderHistory(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subaccountId, marketId, marketIds, orderTypes, executionTypes, direction, state, pagination, } = params || {};
            const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.OrdersHistoryRequest.create();
            if (subaccountId) {
                request.subaccountId = subaccountId;
            }
            if (marketId) {
                request.marketId = marketId;
            }
            if (marketIds) {
                request.marketIds = marketIds;
            }
            if (orderTypes) {
                request.orderTypes = orderTypes;
            }
            if (executionTypes) {
                request.executionTypes = executionTypes;
            }
            if (direction) {
                request.direction = direction;
            }
            if (state) {
                request.state = state;
            }
            /*
            if (isConditional !== undefined) {
              request.isConditional =isConditional
            }
            */
            if (pagination) {
                if (pagination.skip !== undefined) {
                    request.skip = pagination.skip.toString();
                }
                if (pagination.limit !== undefined) {
                    request.limit = pagination.limit;
                }
                if (pagination.endTime !== undefined) {
                    request.endTime = pagination.endTime.toString();
                }
                if (pagination.startTime !== undefined) {
                    request.startTime = pagination.startTime.toString();
                }
            }
            try {
                const response = yield this.retry(() => this.client.OrdersHistory(request));
                return transformers_1.IndexerGrpcSpotTransformer.orderHistoryResponseToOrderHistory(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveSpotExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'OrdersHistory',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'OrdersHistory',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchTrades(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { endTime, tradeId, marketId, startTime, direction, marketIds, pagination, subaccountId, executionSide, executionTypes, accountAddress, } = params || {};
            const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.TradesRequest.create();
            if (marketId) {
                request.marketId = marketId;
            }
            if (marketIds) {
                request.marketIds = marketIds;
            }
            if (subaccountId) {
                request.subaccountId = subaccountId;
            }
            if (accountAddress) {
                request.accountAddress = accountAddress;
            }
            if (tradeId) {
                request.tradeId = tradeId;
            }
            if (executionTypes) {
                request.executionTypes = executionTypes;
            }
            if (executionSide) {
                request.executionSide = executionSide;
            }
            if (direction) {
                request.direction = direction;
            }
            if (startTime) {
                request.startTime = startTime.toString();
            }
            if (endTime) {
                request.endTime = endTime.toString();
            }
            if (pagination) {
                if (pagination.skip !== undefined) {
                    request.skip = pagination.skip.toString();
                }
                if (pagination.limit !== undefined) {
                    request.limit = pagination.limit;
                }
                if (pagination.endTime !== undefined) {
                    request.endTime = pagination.endTime.toString();
                }
                if (pagination.startTime !== undefined) {
                    request.startTime = pagination.startTime.toString();
                }
            }
            try {
                const response = yield this.retry(() => this.client.Trades(request));
                return transformers_1.IndexerGrpcSpotTransformer.tradesResponseToTrades(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveSpotExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Trades',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Trades',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchSubaccountOrdersList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subaccountId, marketId, pagination } = params || {};
            const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.SubaccountOrdersListRequest.create();
            if (subaccountId) {
                request.subaccountId = subaccountId;
            }
            if (marketId) {
                request.marketId = marketId;
            }
            if (pagination) {
                if (pagination.skip !== undefined) {
                    request.skip = pagination.skip.toString();
                }
                if (pagination.limit !== undefined) {
                    request.limit = pagination.limit;
                }
            }
            try {
                const response = yield this.retry(() => this.client.SubaccountOrdersList(request));
                return transformers_1.IndexerGrpcSpotTransformer.ordersResponseToOrders(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveSpotExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'SubaccountOrdersList',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'SubaccountOrdersList',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchSubaccountTradesList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subaccountId, marketId, direction, executionType, pagination } = params || {};
            const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.SubaccountTradesListRequest.create();
            if (subaccountId) {
                request.subaccountId = subaccountId;
            }
            if (marketId) {
                request.marketId = marketId;
            }
            if (direction) {
                request.direction = direction;
            }
            if (executionType) {
                request.executionType = executionType;
            }
            if (pagination) {
                if (pagination.skip !== undefined) {
                    request.skip = pagination.skip.toString();
                }
                if (pagination.limit !== undefined) {
                    request.limit = pagination.limit;
                }
            }
            try {
                const response = yield this.retry(() => this.client.SubaccountTradesList(request));
                return transformers_1.IndexerGrpcSpotTransformer.subaccountTradesListResponseToTradesList(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveSpotExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'SubaccountTradesList',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'SubaccountTradesList',
                    contextModule: this.module,
                });
            }
        });
    }
    /** @deprecated - use fetchOrderbooksV2 */
    fetchOrderbooks(_marketIds) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new exceptions_1.GeneralException(new Error('deprecated - use fetchOrderbooksV2'));
        });
    }
    fetchOrderbooksV2(marketIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.OrderbooksV2Request.create();
            if (marketIds.length > 0) {
                request.marketIds = marketIds;
            }
            try {
                const response = yield this.retry(() => this.client.OrderbooksV2(request));
                return transformers_1.IndexerGrpcSpotTransformer.orderbooksV2ResponseToOrderbooksV2(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveSpotExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'OrderbooksV2',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'OrderbooksV2',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchOrderbookV2(marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.OrderbookV2Request.create();
            request.marketId = marketId;
            try {
                const response = yield this.retry(() => this.client.OrderbookV2(request));
                return transformers_1.IndexerGrpcSpotTransformer.orderbookV2ResponseToOrderbookV2(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveSpotExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'OrderbookV2',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: '',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchAtomicSwapHistory(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { address, contractAddress, pagination } = params || {};
            const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.AtomicSwapHistoryRequest.create();
            request.address = address;
            request.contractAddress = contractAddress;
            if (pagination) {
                if (pagination.fromNumber !== undefined) {
                    request.fromNumber = pagination.fromNumber;
                }
                if (pagination.toNumber !== undefined) {
                    request.toNumber = pagination.toNumber;
                }
                if (pagination.skip !== undefined) {
                    request.skip = pagination.skip;
                }
                if (pagination.limit !== undefined) {
                    request.limit = pagination.limit;
                }
            }
            try {
                const response = yield this.retry(() => this.client.AtomicSwapHistory(request));
                return transformers_1.IndexerGrpcSpotTransformer.grpcAtomicSwapHistoryListToAtomicSwapHistoryList(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveSpotExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AtomicSwapHistory',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'AtomicSwapHistory',
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.IndexerGrpcSpotApi = IndexerGrpcSpotApi;
