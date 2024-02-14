"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcOracleStream = void 0;
const IndexerOracleStreamTransformer_1 = require("../transformers/IndexerOracleStreamTransformer");
const BaseIndexerGrpcWebConsumer_1 = require("../../base/BaseIndexerGrpcWebConsumer");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
/**
 * @category Indexer Grpc Stream
 */
class IndexerGrpcOracleStream {
    constructor(endpoint) {
        this.client = new indexer_proto_ts_1.InjectiveOracleRpc.InjectiveOracleRPCClientImpl((0, BaseIndexerGrpcWebConsumer_1.getGrpcIndexerWebImpl)(endpoint));
    }
    streamOraclePrices({ oracleType, baseSymbol, quoteSymbol, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveOracleRpc.StreamPricesRequest.create();
        if (baseSymbol) {
            request.baseSymbol = baseSymbol;
        }
        if (quoteSymbol) {
            request.quoteSymbol = quoteSymbol;
        }
        request.oracleType = oracleType;
        const subscription = this.client.StreamPrices(request).subscribe({
            next(response) {
                callback(IndexerOracleStreamTransformer_1.IndexerOracleStreamTransformer.pricesStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamOraclePricesByMarkets({ marketIds, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveOracleRpc.StreamPricesByMarketsRequest.create();
        if (marketIds) {
            request.marketIds = marketIds;
        }
        const subscription = this.client.StreamPricesByMarkets(request).subscribe({
            next(response) {
                callback(IndexerOracleStreamTransformer_1.IndexerOracleStreamTransformer.pricesByMarketsCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
}
exports.IndexerGrpcOracleStream = IndexerGrpcOracleStream;
