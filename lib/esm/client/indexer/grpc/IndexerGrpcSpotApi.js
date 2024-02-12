"use strict";
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
    module = types_1.IndexerModule.Spot;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client =
            new indexer_proto_ts_1.InjectiveSpotExchangeRpc.InjectiveSpotExchangeRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchMarkets(params) {
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
            const response = await this.retry(() => this.client.Markets(request));
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
    }
    async fetchMarket(marketId) {
        const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.MarketRequest.create();
        request.marketId = marketId;
        try {
            const response = await this.retry(() => this.client.Market(request));
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
    }
    /** @deprecated - use fetchOrderbookV2 */
    async fetchOrderbook(_marketId) {
        throw new exceptions_1.GeneralException(new Error('deprecated - use fetchOrderbookV2'));
    }
    async fetchOrders(params) {
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
            const response = await this.retry(() => this.client.Orders(request));
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
    }
    async fetchOrderHistory(params) {
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
            const response = await this.retry(() => this.client.OrdersHistory(request));
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
    }
    async fetchTrades(params) {
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
            const response = await this.retry(() => this.client.Trades(request));
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
    }
    async fetchSubaccountOrdersList(params) {
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
            const response = await this.retry(() => this.client.SubaccountOrdersList(request));
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
    }
    async fetchSubaccountTradesList(params) {
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
            const response = await this.retry(() => this.client.SubaccountTradesList(request));
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
    }
    /** @deprecated - use fetchOrderbooksV2 */
    async fetchOrderbooks(_marketIds) {
        throw new exceptions_1.GeneralException(new Error('deprecated - use fetchOrderbooksV2'));
    }
    async fetchOrderbooksV2(marketIds) {
        const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.OrderbooksV2Request.create();
        if (marketIds.length > 0) {
            request.marketIds = marketIds;
        }
        try {
            const response = await this.retry(() => this.client.OrderbooksV2(request));
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
    }
    async fetchOrderbookV2(marketId) {
        const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.OrderbookV2Request.create();
        request.marketId = marketId;
        try {
            const response = await this.retry(() => this.client.OrderbookV2(request));
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
    }
    async fetchAtomicSwapHistory(params) {
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
            const response = await this.retry(() => this.client.AtomicSwapHistory(request));
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
    }
}
exports.IndexerGrpcSpotApi = IndexerGrpcSpotApi;
//# sourceMappingURL=IndexerGrpcSpotApi.js.map