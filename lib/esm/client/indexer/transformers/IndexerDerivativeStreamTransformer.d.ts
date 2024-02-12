import { StreamOperation } from '../../../types';
import { InjectiveDerivativeExchangeRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Stream Transformer
 */
export declare class IndexerDerivativeStreamTransformer {
    static tradesStreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamTradesResponse) => {
        trade: import("..").DerivativeTrade | undefined;
        operation: StreamOperation;
        timestamp: string;
    };
    static positionStreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamPositionsResponse) => {
        position: import("..").Position | undefined;
        timestamp: string;
    };
    static ordersStreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamOrdersResponse) => {
        order: import("..").DerivativeLimitOrder | undefined;
        operation: StreamOperation;
        timestamp: string;
    };
    static orderHistoryStreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamOrdersHistoryResponse) => {
        order: import("..").DerivativeOrderHistory | undefined;
        operation: StreamOperation;
        timestamp: string;
    };
    static orderbookV2StreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamOrderbookV2Response) => {
        orderbook: import("..").OrderbookWithSequence | undefined;
        operation: StreamOperation;
        marketId: string;
        timestamp: string;
    };
    static orderbookUpdateStreamCallback: (response: InjectiveDerivativeExchangeRpc.StreamOrderbookUpdateResponse) => {
        orderbook: import("..").OrderbookWithSequence | undefined;
        operation: StreamOperation;
        marketId: string;
        timestamp: string;
    };
}
