import { StreamOperation } from '../../../types';
import { InjectiveDerivativeExchangeRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Stream Transformer
 */
export declare class IndexerDerivativeStreamTransformer {
    static tradesStreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamTradesResponse) => {
        trade: import("..").DerivativeTrade;
        operation: StreamOperation;
        timestamp: string;
    };
    static positionStreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamPositionsResponse) => {
        position: import("..").Position;
        timestamp: string;
    };
    static ordersStreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamOrdersResponse) => {
        order: import("..").DerivativeLimitOrder;
        operation: StreamOperation;
        timestamp: string;
    };
    static orderHistoryStreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamOrdersHistoryResponse) => {
        order: import("..").DerivativeOrderHistory;
        operation: StreamOperation;
        timestamp: string;
    };
    static orderbookV2StreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamOrderbookV2Response) => {
        orderbook: import("..").OrderbookWithSequence;
        operation: StreamOperation;
        marketId: string;
        timestamp: string;
    };
    static orderbookUpdateStreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamOrderbookUpdateResponse) => {
        orderbook: import("..").OrderbookWithSequence;
        operation: StreamOperation;
        marketId: string;
        timestamp: string;
    };
}
