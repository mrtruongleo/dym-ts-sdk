import { OrderSide, OrderState } from '@injectivelabs/ts-types';
import { InjectiveSpotExchangeRpc } from '@injectivelabs/indexer-proto-ts';
import { TradeExecutionSide, TradeDirection, TradeExecutionType } from '../../../types/exchange';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { PaginationOption } from '../../../types/pagination';
/**
 * @category Indexer Grpc API
 */
export declare class IndexerGrpcSpotApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveSpotExchangeRpc.InjectiveSpotExchangeRPCClientImpl;
    constructor(endpoint: string);
    fetchMarkets(params?: {
        baseDenom?: string;
        marketStatus?: string;
        quoteDenom?: string;
        marketStatuses?: string[];
    }): Promise<import("../types").SpotMarket[]>;
    fetchMarket(marketId: string): Promise<import("../types").SpotMarket>;
    /** @deprecated - use fetchOrderbookV2 */
    fetchOrderbook(_marketId: string): Promise<void>;
    fetchOrders(params?: {
        marketId?: string;
        marketIds?: string[];
        subaccountId?: string;
        orderSide?: OrderSide;
        isConditional?: boolean;
        pagination?: PaginationOption;
    }): Promise<{
        orders: import("../types").SpotLimitOrder[];
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
        orderHistory: import("../types").SpotOrderHistory[];
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
        trades: import("../types").SpotTrade[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchSubaccountOrdersList(params?: {
        subaccountId?: string;
        marketId?: string;
        pagination?: PaginationOption;
    }): Promise<{
        orders: import("../types").SpotLimitOrder[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchSubaccountTradesList(params?: {
        subaccountId?: string;
        marketId?: string;
        direction?: TradeDirection;
        executionType?: TradeExecutionType;
        pagination?: PaginationOption;
    }): Promise<import("../types").SpotTrade[]>;
    /** @deprecated - use fetchOrderbooksV2 */
    fetchOrderbooks(_marketIds: string[]): Promise<void>;
    fetchOrderbooksV2(marketIds: string[]): Promise<{
        marketId: string;
        orderbook: import("../types").OrderbookWithSequence;
    }[]>;
    fetchOrderbookV2(marketId: string): Promise<import("../types").OrderbookWithSequence>;
    fetchAtomicSwapHistory(params: {
        address: string;
        contractAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        swapHistory: import("../types").AtomicSwap[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
}
