import { IndexerGrpcSpotTransformer } from './IndexerGrpcSpotTransformer';
/**
 * @category Indexer Stream Transformer
 */
export class IndexerSpotStreamTransformer {
}
IndexerSpotStreamTransformer.tradesStreamCallback = (response) => {
    const trade = response.trade;
    return {
        trade: trade
            ? IndexerGrpcSpotTransformer.grpcTradeToTrade(trade)
            : undefined,
        operation: response.operationType,
        timestamp: response.timestamp,
    };
};
IndexerSpotStreamTransformer.ordersStreamCallback = (response) => {
    const order = response.order;
    return {
        order: order
            ? IndexerGrpcSpotTransformer.grpcOrderToOrder(order)
            : undefined,
        operation: response.operationType,
        timestamp: response.timestamp,
    };
};
IndexerSpotStreamTransformer.orderHistoryStreamCallback = (response) => {
    const order = response.order;
    return {
        order: order
            ? IndexerGrpcSpotTransformer.grpcOrderHistoryToOrderHistory(order)
            : undefined,
        operation: response.operationType,
        timestamp: response.timestamp,
    };
};
IndexerSpotStreamTransformer.orderbookV2StreamCallback = (response) => {
    const orderbook = response.orderbook;
    return {
        orderbook: orderbook
            ? IndexerGrpcSpotTransformer.grpcOrderbookV2ToOrderbookV2({
                sequence: parseInt(orderbook.sequence, 10),
                buys: orderbook.buys,
                sells: orderbook.sells,
            })
            : undefined,
        operation: response.operationType,
        marketId: response.marketId,
        timestamp: response.timestamp,
    };
};
IndexerSpotStreamTransformer.orderbookUpdateStreamCallback = (response) => {
    const orderbook = response.orderbookLevelUpdates;
    return {
        orderbook: orderbook
            ? IndexerGrpcSpotTransformer.grpcOrderbookV2ToOrderbookV2({
                sequence: parseInt(orderbook.sequence, 10),
                buys: orderbook.buys,
                sells: orderbook.sells,
            })
            : undefined,
        operation: response.operationType,
        marketId: response.marketId,
        timestamp: response.timestamp,
    };
};
