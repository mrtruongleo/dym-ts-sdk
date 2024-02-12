"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerDerivativeStreamTransformer = void 0;
const IndexerGrpcDerivativeTransformer_1 = require("./IndexerGrpcDerivativeTransformer");
/**
 * @category Indexer Stream Transformer
 */
class IndexerDerivativeStreamTransformer {
    static tradesStreamCallback = (response) => {
        const trade = response.trade;
        return {
            trade: trade
                ? IndexerGrpcDerivativeTransformer_1.IndexerGrpcDerivativeTransformer.grpcTradeToTrade(trade)
                : undefined,
            operation: response.operationType,
            timestamp: response.timestamp,
        };
    };
    static positionStreamCallback = (response) => {
        const position = response.position;
        return {
            position: position
                ? IndexerGrpcDerivativeTransformer_1.IndexerGrpcDerivativeTransformer.grpcPositionToPosition(position)
                : undefined,
            timestamp: response.timestamp,
        };
    };
    static ordersStreamCallback = (response) => {
        const order = response.order;
        return {
            order: order
                ? IndexerGrpcDerivativeTransformer_1.IndexerGrpcDerivativeTransformer.grpcOrderToOrder(order)
                : undefined,
            operation: response.operationType,
            timestamp: response.timestamp,
        };
    };
    static orderHistoryStreamCallback = (response) => {
        const order = response.order;
        return {
            order: order
                ? IndexerGrpcDerivativeTransformer_1.IndexerGrpcDerivativeTransformer.grpcOrderHistoryToOrderHistory(order)
                : undefined,
            operation: response.operationType,
            timestamp: response.timestamp,
        };
    };
    static orderbookV2StreamCallback = (response) => {
        const orderbook = response.orderbook;
        return {
            orderbook: orderbook
                ? IndexerGrpcDerivativeTransformer_1.IndexerGrpcDerivativeTransformer.grpcOrderbookV2ToOrderbookV2({
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
    static orderbookUpdateStreamCallback = (response) => {
        const orderbook = response.orderbookLevelUpdates;
        return {
            orderbook: orderbook
                ? IndexerGrpcDerivativeTransformer_1.IndexerGrpcDerivativeTransformer.grpcOrderbookV2ToOrderbookV2({
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
}
exports.IndexerDerivativeStreamTransformer = IndexerDerivativeStreamTransformer;
//# sourceMappingURL=IndexerDerivativeStreamTransformer.js.map