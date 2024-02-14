"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerSpotStreamTransformer = void 0;
const IndexerGrpcSpotTransformer_1 = require("./IndexerGrpcSpotTransformer");
/**
 * @category Indexer Stream Transformer
 */
class IndexerSpotStreamTransformer {
}
exports.IndexerSpotStreamTransformer = IndexerSpotStreamTransformer;
IndexerSpotStreamTransformer.tradesStreamCallback = (response) => {
    const trade = response.trade;
    return {
        trade: trade
            ? IndexerGrpcSpotTransformer_1.IndexerGrpcSpotTransformer.grpcTradeToTrade(trade)
            : undefined,
        operation: response.operationType,
        timestamp: response.timestamp,
    };
};
IndexerSpotStreamTransformer.ordersStreamCallback = (response) => {
    const order = response.order;
    return {
        order: order
            ? IndexerGrpcSpotTransformer_1.IndexerGrpcSpotTransformer.grpcOrderToOrder(order)
            : undefined,
        operation: response.operationType,
        timestamp: response.timestamp,
    };
};
IndexerSpotStreamTransformer.orderHistoryStreamCallback = (response) => {
    const order = response.order;
    return {
        order: order
            ? IndexerGrpcSpotTransformer_1.IndexerGrpcSpotTransformer.grpcOrderHistoryToOrderHistory(order)
            : undefined,
        operation: response.operationType,
        timestamp: response.timestamp,
    };
};
IndexerSpotStreamTransformer.orderbookV2StreamCallback = (response) => {
    const orderbook = response.orderbook;
    return {
        orderbook: orderbook
            ? IndexerGrpcSpotTransformer_1.IndexerGrpcSpotTransformer.grpcOrderbookV2ToOrderbookV2({
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
            ? IndexerGrpcSpotTransformer_1.IndexerGrpcSpotTransformer.grpcOrderbookV2ToOrderbookV2({
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
