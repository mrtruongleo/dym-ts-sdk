import { TradeDirection, TradeExecutionSide, TradeExecutionType } from '../../../types';
import { StreamStatusResponse } from '../types';
import { PaginationOption } from '../../../types/pagination';
import { OrderSide, OrderState } from '@injectivelabs/ts-types';
import { IndexerSpotStreamTransformer } from '../transformers';
import { Subscription } from 'rxjs';
import { InjectiveSpotExchangeRpc } from '@injectivelabs/indexer-proto-ts';
export type MarketsStreamCallback = (response: InjectiveSpotExchangeRpc.StreamMarketsResponse) => void;
export type SpotOrderbookV2StreamCallback = (response: ReturnType<typeof IndexerSpotStreamTransformer.orderbookV2StreamCallback>) => void;
export type SpotOrderbookUpdateStreamCallback = (response: ReturnType<typeof IndexerSpotStreamTransformer.orderbookUpdateStreamCallback>) => void;
export type SpotOrdersStreamCallback = (response: ReturnType<typeof IndexerSpotStreamTransformer.ordersStreamCallback>) => void;
export type SpotOrderHistoryStreamCallback = (response: ReturnType<typeof IndexerSpotStreamTransformer.orderHistoryStreamCallback>) => void;
export type SpotTradesStreamCallback = (response: ReturnType<typeof IndexerSpotStreamTransformer.tradesStreamCallback>) => void;
/**
 * @category Indexer Grpc Stream
 */
export declare class IndexerGrpcSpotStream {
    protected client: InjectiveSpotExchangeRpc.InjectiveSpotExchangeRPCClientImpl;
    constructor(endpoint: string);
    /** @deprecated - use streamSpotOrderbookV2 */
    streamSpotOrderbook(_args: {
        marketIds: string[];
        callback: any;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamSpotOrders({ marketId, subaccountId, orderSide, callback, onEndCallback, onStatusCallback, }: {
        marketId?: string;
        subaccountId?: string;
        orderSide?: OrderSide;
        callback: SpotOrdersStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamSpotOrderHistory({ marketId, subaccountId, orderTypes, executionTypes, direction, state, callback, onEndCallback, onStatusCallback, }: {
        marketId?: string;
        subaccountId?: string;
        orderTypes?: OrderSide[];
        executionTypes?: TradeExecutionType[];
        direction?: TradeDirection;
        state?: OrderState;
        callback: SpotOrderHistoryStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamSpotTrades({ marketIds, marketId, subaccountIds, subaccountId, pagination, direction, executionSide, callback, onEndCallback, onStatusCallback, }: {
        marketIds?: string[];
        marketId?: string;
        subaccountIds?: string[];
        subaccountId?: string;
        pagination?: PaginationOption;
        direction?: TradeDirection;
        executionSide?: TradeExecutionSide;
        callback: SpotTradesStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamSpotMarket({ marketIds, callback, onEndCallback, onStatusCallback, }: {
        marketIds?: string[];
        callback: MarketsStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamSpotOrderbookV2({ marketIds, callback, onEndCallback, onStatusCallback, }: {
        marketIds: string[];
        callback: SpotOrderbookV2StreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamSpotOrderbookUpdate({ marketIds, callback, onEndCallback, onStatusCallback, }: {
        marketIds: string[];
        callback: SpotOrderbookUpdateStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
}
