import { OrderSide, OrderState } from '@injectivelabs/ts-types';
import { InjectiveDerivativeExchangeRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { TradeDirection, TradeExecutionSide, TradeExecutionType } from '../../../types/exchange';
import { PaginationOption } from '../../../types/pagination';
/**
 * @category Indexer Grpc API
 */
export declare class IndexerGrpcDerivativesApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveDerivativeExchangeRpc.InjectiveDerivativeExchangeRPCClientImpl;
    constructor(endpoint: string);
    fetchMarkets(params?: {
        quoteDenom?: string;
        marketStatus?: string;
        marketStatuses?: string[];
    }): Promise<import("../types").DerivativeMarket[]>;
    fetchMarket(marketId: string): Promise<import("../types").DerivativeMarket>;
    fetchBinaryOptionsMarkets(params?: {
        marketStatus?: string;
        quoteDenom?: string;
        pagination?: PaginationOption;
    }): Promise<import("../types").BinaryOptionsMarket[] | {
        markets: import("../types").BinaryOptionsMarket[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchBinaryOptionsMarket(marketId: string): Promise<import("../types").BinaryOptionsMarket>;
    /** @deprecated - use fetchOrderbookV2 */
    fetchOrderbook(_marketId: string): Promise<void>;
    fetchOrders(params?: {
        marketId?: string;
        marketIds?: string[];
        orderSide?: OrderSide;
        isConditional?: boolean;
        subaccountId?: string;
        pagination?: PaginationOption;
    }): Promise<{
        orders: import("../types").DerivativeLimitOrder[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchOrderHistory(params?: {
        subaccountId?: string;
        marketId?: string;
        marketIds?: string[];
        orderTypes?: OrderSide[];
        executionTypes?: TradeExecutionType[];
        direction?: TradeDirection;
        isConditional?: boolean;
        state?: OrderState;
        pagination?: PaginationOption;
    }): Promise<{
        orderHistory: import("../types").DerivativeOrderHistory[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchPositions(params?: {
        marketId?: string;
        marketIds?: string[];
        subaccountId?: string;
        direction?: TradeDirection;
        pagination?: PaginationOption;
    }): Promise<{
        positions: import("../types").Position[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchPositionsV2(params?: {
        address?: string;
        marketId?: string;
        marketIds?: string[];
        subaccountId?: string;
        direction?: TradeDirection;
        pagination?: PaginationOption;
    }): Promise<{
        positions: import("../types").PositionV2[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchTrades(params?: {
        endTime?: number;
        tradeId?: string;
        marketId?: string;
        startTime?: number;
        marketIds?: string[];
        subaccountId?: string;
        accountAddress?: string;
        direction?: TradeDirection;
        pagination?: PaginationOption;
        executionSide?: TradeExecutionSide;
        executionTypes?: TradeExecutionType[];
    }): Promise<{
        trades: import("../types").DerivativeTrade[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchFundingPayments(params?: {
        marketId?: string;
        marketIds?: string[];
        subaccountId?: string;
        pagination?: PaginationOption;
    }): Promise<{
        fundingPayments: import("../types").FundingPayment[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchFundingRates(params?: {
        marketId?: string;
        pagination?: PaginationOption;
    }): Promise<{
        fundingRates: import("../types").FundingRate[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchSubaccountOrdersList(params?: {
        marketId?: string;
        subaccountId?: string;
        pagination?: PaginationOption;
    }): Promise<{
        orders: import("../types").DerivativeLimitOrder[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchSubaccountTradesList(params: {
        marketId?: string;
        subaccountId?: string;
        direction?: TradeDirection;
        executionType?: TradeExecutionType;
        pagination?: PaginationOption;
    }): Promise<import("../types").DerivativeTrade[]>;
    /** @deprecated - use fetchOrderbooksV2 */
    fetchOrderbooks(_marketIds: string[]): Promise<void>;
    fetchOrderbooksV2(marketIds: string[]): Promise<{
        marketId: string;
        orderbook: import("../types").OrderbookWithSequence;
    }[]>;
    fetchOrderbookV2(marketId: string): Promise<import("../types").OrderbookWithSequence>;
}
