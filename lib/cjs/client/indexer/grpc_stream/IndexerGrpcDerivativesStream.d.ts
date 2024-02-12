import { TradeDirection, TradeExecutionSide, TradeExecutionType } from '../../../types';
import { StreamStatusResponse } from '../types';
import { PaginationOption } from '../../../types/pagination';
import { OrderSide, OrderState } from '@injectivelabs/ts-types';
import { IndexerDerivativeStreamTransformer } from '../transformers';
import { Subscription } from 'rxjs';
import { InjectiveDerivativeExchangeRpc } from '@injectivelabs/indexer-proto-ts';
export type DerivativeOrderbookV2StreamCallback = (response: ReturnType<typeof IndexerDerivativeStreamTransformer.orderbookV2StreamCallback>) => void;
export type DerivativeOrderbookUpdateStreamCallback = (response: ReturnType<typeof IndexerDerivativeStreamTransformer.orderbookUpdateStreamCallback>) => void;
export type DerivativeOrdersStreamCallback = (response: ReturnType<typeof IndexerDerivativeStreamTransformer.ordersStreamCallback>) => void;
export type DerivativeOrderHistoryStreamCallback = (response: ReturnType<typeof IndexerDerivativeStreamTransformer.orderHistoryStreamCallback>) => void;
export type DerivativeTradesStreamCallback = (response: ReturnType<typeof IndexerDerivativeStreamTransformer.tradesStreamCallback>) => void;
export type PositionsStreamCallback = (response: ReturnType<typeof IndexerDerivativeStreamTransformer.positionStreamCallback>) => void;
export type MarketStreamCallback = (response: InjectiveDerivativeExchangeRpc.StreamMarketResponse) => void;
/**
 * @category Indexer Grpc Stream
 */
export declare class IndexerGrpcDerivativesStream {
    protected client: InjectiveDerivativeExchangeRpc.InjectiveDerivativeExchangeRPCClientImpl;
    constructor(endpoint: string);
    /** @deprecated - use streamDerivativeOrderbookV2 */
    streamDerivativeOrderbook(_args: {
        marketIds: string[];
        callback: any;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamDerivativeOrders({ marketId, subaccountId, orderSide, callback, onEndCallback, onStatusCallback, }: {
        marketId?: string;
        subaccountId?: string;
        orderSide?: OrderSide;
        callback: DerivativeOrdersStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamDerivativeOrderHistory({ subaccountId, marketId, orderTypes, executionTypes, direction, state, callback, onEndCallback, onStatusCallback, }: {
        marketId?: string;
        subaccountId?: string;
        orderTypes?: OrderSide[];
        executionTypes?: TradeExecutionType[];
        direction?: TradeDirection;
        state?: OrderState;
        callback: DerivativeOrderHistoryStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamDerivativeTrades({ marketIds, marketId, subaccountIds, subaccountId, callback, pagination, executionSide, direction, onEndCallback, onStatusCallback, }: {
        marketIds?: string[];
        marketId?: string;
        subaccountIds?: string[];
        subaccountId?: string;
        pagination?: PaginationOption;
        executionSide?: TradeExecutionSide;
        direction?: TradeDirection;
        callback: DerivativeTradesStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamDerivativePositions({ marketId, subaccountId, callback, address, onEndCallback, onStatusCallback, }: {
        marketId?: string;
        address?: string;
        subaccountId?: string;
        callback: PositionsStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamDerivativeMarket({ marketIds, callback, onEndCallback, onStatusCallback, }: {
        marketIds?: string[];
        callback: MarketStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamDerivativeOrderbookV2({ marketIds, callback, onEndCallback, onStatusCallback, }: {
        marketIds: string[];
        callback: DerivativeOrderbookV2StreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamDerivativeOrderbookUpdate({ marketIds, callback, onEndCallback, onStatusCallback, }: {
        marketIds: string[];
        callback: DerivativeOrderbookV2StreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
}
