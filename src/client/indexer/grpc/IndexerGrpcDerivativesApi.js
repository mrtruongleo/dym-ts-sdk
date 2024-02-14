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
exports.IndexerGrpcDerivativesApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcDerivativesApi extends BaseIndexerGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.IndexerModule.Derivatives;
        this.client =
            new indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.InjectiveDerivativeExchangeRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchMarkets(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marketStatus, quoteDenom, marketStatuses } = params || {};
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.MarketsRequest.create();
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
                return transformers_1.IndexerGrpcDerivativeTransformer.marketsResponseToMarkets(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
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
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.MarketRequest.create();
            request.marketId = marketId;
            try {
                const response = yield this.retry(() => this.client.Market(request));
                return transformers_1.IndexerGrpcDerivativeTransformer.marketResponseToMarket(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
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
    fetchBinaryOptionsMarkets(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marketStatus, quoteDenom, pagination } = params || {};
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.BinaryOptionsMarketsRequest.create();
            if (marketStatus) {
                request.marketStatus = marketStatus;
            }
            if (quoteDenom) {
                request.quoteDenom = quoteDenom;
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
                const response = yield this.retry(() => this.client.BinaryOptionsMarkets(request));
                return pagination
                    ? transformers_1.IndexerGrpcDerivativeTransformer.binaryOptionsMarketResponseWithPaginationToBinaryOptionsMarket(response)
                    : transformers_1.IndexerGrpcDerivativeTransformer.binaryOptionsMarketsResponseToBinaryOptionsMarkets(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'BinaryOptionsMarkets',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'BinaryOptionsMarkets',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchBinaryOptionsMarket(marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.BinaryOptionsMarketRequest.create();
            request.marketId = marketId;
            try {
                const response = yield this.retry(() => this.client.BinaryOptionsMarket(request));
                return transformers_1.IndexerGrpcDerivativeTransformer.binaryOptionsMarketResponseToBinaryOptionsMarket(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'BinaryOptionsMarket',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'BinaryOptionsMarket',
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
            const { marketId, marketIds, subaccountId, orderSide, isConditional, pagination, } = params || {};
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.OrdersRequest.create();
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
            if (isConditional !== undefined) {
                request.isConditional = isConditional ? 'true' : 'false';
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
                const response = yield this.retry(() => this.client.Orders(request));
                return transformers_1.IndexerGrpcDerivativeTransformer.ordersResponseToOrders(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
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
            const { subaccountId, marketId, marketIds, orderTypes, executionTypes, direction, isConditional, state, pagination, } = params || {};
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.OrdersHistoryRequest.create();
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
            if (isConditional !== undefined) {
                request.isConditional = isConditional ? 'true' : 'false';
            }
            if (state) {
                request.state = state;
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
                const response = yield this.retry(() => this.client.OrdersHistory(request));
                return transformers_1.IndexerGrpcDerivativeTransformer.orderHistoryResponseToOrderHistory(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
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
    fetchPositions(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marketId, marketIds, subaccountId, direction, pagination } = params || {};
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.PositionsRequest.create();
            if (marketId) {
                request.marketId = marketId;
            }
            if (marketIds) {
                request.marketIds = marketIds;
            }
            if (direction) {
                request.direction = direction;
            }
            if (subaccountId) {
                request.subaccountId = subaccountId;
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
                const response = yield this.retry(() => this.client.Positions(request));
                return transformers_1.IndexerGrpcDerivativeTransformer.positionsResponseToPositions(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Positions',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Positions',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchPositionsV2(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marketId, marketIds, subaccountId, direction, pagination, address, } = params || {};
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.PositionsV2Request.create();
            if (marketId) {
                request.marketId = marketId;
            }
            if (address) {
                request.accountAddress = address;
            }
            if (marketIds) {
                request.marketIds = marketIds;
            }
            if (direction) {
                request.direction = direction;
            }
            if (subaccountId) {
                request.subaccountId = subaccountId;
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
                const response = yield this.retry(() => this.client.PositionsV2(request));
                return transformers_1.IndexerGrpcDerivativeTransformer.positionsV2ResponseToPositionsV2(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Positions',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Positions',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchTrades(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { endTime, tradeId, marketId, startTime, direction, marketIds, pagination, subaccountId, executionSide, executionTypes, accountAddress, } = params || {};
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.TradesRequest.create();
            if (marketId) {
                request.marketId = marketId;
            }
            if (subaccountId) {
                request.subaccountId = subaccountId;
            }
            if (tradeId) {
                request.tradeId = tradeId;
            }
            if (accountAddress) {
                request.accountAddress = accountAddress;
            }
            if (marketIds) {
                request.marketIds = marketIds;
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
                return transformers_1.IndexerGrpcDerivativeTransformer.tradesResponseToTrades(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
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
    fetchFundingPayments(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marketId, marketIds, subaccountId, pagination } = params || {};
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.FundingPaymentsRequest.create();
            if (marketId) {
                request.marketId = marketId;
            }
            if (subaccountId) {
                request.subaccountId = subaccountId;
            }
            if (marketIds) {
                request.marketIds = marketIds;
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
            }
            try {
                const response = yield this.retry(() => this.client.FundingPayments(request));
                return transformers_1.IndexerGrpcDerivativeTransformer.fundingPaymentsResponseToFundingPayments(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'FundingPayments',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'FundingPayments',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchFundingRates(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marketId, pagination } = params || {};
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.FundingRatesRequest.create();
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
                const response = yield this.retry(() => this.client.FundingRates(request));
                return transformers_1.IndexerGrpcDerivativeTransformer.fundingRatesResponseToFundingRates(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'FundingRates',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'FundingRates',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchSubaccountOrdersList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marketId, subaccountId, pagination } = params || {};
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.SubaccountOrdersListRequest.create();
            if (marketId) {
                request.marketId = marketId;
            }
            if (subaccountId) {
                request.subaccountId = subaccountId;
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
                return transformers_1.IndexerGrpcDerivativeTransformer.ordersResponseToOrders(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
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
            const { marketId, subaccountId, direction, executionType, pagination } = params || {};
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.SubaccountTradesListRequest.create();
            if (marketId) {
                request.marketId = marketId;
            }
            if (subaccountId) {
                request.subaccountId = subaccountId;
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
                return transformers_1.IndexerGrpcDerivativeTransformer.subaccountTradesListResponseToSubaccountTradesList(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
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
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.OrderbooksV2Request.create();
            if (marketIds.length > 0) {
                request.marketIds = marketIds;
            }
            try {
                const response = yield this.retry(() => this.client.OrderbooksV2(request));
                return transformers_1.IndexerGrpcDerivativeTransformer.orderbooksV2ResponseToOrderbooksV2(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
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
            const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.OrderbookV2Request.create();
            request.marketId = marketId;
            try {
                const response = yield this.retry(() => this.client.OrderbookV2(request));
                return transformers_1.IndexerGrpcDerivativeTransformer.orderbookV2ResponseToOrderbookV2(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'OrderbookV2',
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
}
exports.IndexerGrpcDerivativesApi = IndexerGrpcDerivativesApi;
