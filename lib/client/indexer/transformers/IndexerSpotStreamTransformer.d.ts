import { StreamOperation } from '../../../types';
import { InjectiveSpotExchangeRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Stream Transformer
 */
export declare class IndexerSpotStreamTransformer {
    static tradesStreamCallback: (response: InjectiveSpotExchangeRpc.StreamTradesResponse) => {
        trade: import("..").SpotTrade | undefined;
        operation: StreamOperation;
        timestamp: string;
    };
    static ordersStreamCallback: (response: InjectiveSpotExchangeRpc.StreamOrdersResponse) => {
        order: import("..").SpotLimitOrder | undefined;
        operation: StreamOperation;
        timestamp: string;
    };
    static orderHistoryStreamCallback: (response: InjectiveSpotExchangeRpc.StreamOrdersHistoryResponse) => {
        order: import("..").SpotOrderHistory | undefined;
        operation: StreamOperation;
        timestamp: string;
    };
    static orderbookV2StreamCallback: (response: InjectiveSpotExchangeRpc.StreamOrderbookV2Response) => {
        orderbook: import("..").OrderbookWithSequence | undefined;
        operation: StreamOperation;
        marketId: string;
        timestamp: string;
    };
    static orderbookUpdateStreamCallback: (response: InjectiveSpotExchangeRpc.StreamOrderbookUpdateResponse) => {
        orderbook: import("..").OrderbookWithSequence | undefined;
        operation: StreamOperation;
        marketId: string;
        timestamp: string;
    };
}
