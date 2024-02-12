import { IndexerOracleStreamTransformer } from '../transformers/IndexerOracleStreamTransformer';
import { getGrpcIndexerWebImpl } from '../../base/BaseIndexerGrpcWebConsumer';
import { InjectiveOracleRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Grpc Stream
 */
export class IndexerGrpcOracleStream {
    constructor(endpoint) {
        this.client = new InjectiveOracleRpc.InjectiveOracleRPCClientImpl(getGrpcIndexerWebImpl(endpoint));
    }
    streamOraclePrices({ oracleType, baseSymbol, quoteSymbol, callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveOracleRpc.StreamPricesRequest.create();
        if (baseSymbol) {
            request.baseSymbol = baseSymbol;
        }
        if (quoteSymbol) {
            request.quoteSymbol = quoteSymbol;
        }
        request.oracleType = oracleType;
        const subscription = this.client.StreamPrices(request).subscribe({
            next(response) {
                callback(IndexerOracleStreamTransformer.pricesStreamCallback(response));
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
        const request = InjectiveOracleRpc.StreamPricesByMarketsRequest.create();
        if (marketIds) {
            request.marketIds = marketIds;
        }
        const subscription = this.client.StreamPricesByMarkets(request).subscribe({
            next(response) {
                callback(IndexerOracleStreamTransformer.pricesByMarketsCallback(response));
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
