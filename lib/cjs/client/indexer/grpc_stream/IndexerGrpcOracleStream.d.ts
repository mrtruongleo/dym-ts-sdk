import { StreamStatusResponse } from '../types';
import { IndexerOracleStreamTransformer } from '../transformers/IndexerOracleStreamTransformer';
import { Subscription } from 'rxjs';
import { InjectiveOracleRpc } from '@injectivelabs/indexer-proto-ts';
export type OraclePriceStreamCallback = (response: ReturnType<typeof IndexerOracleStreamTransformer.pricesStreamCallback>) => void;
export type OraclePricesByMarketsStreamCallback = (response: ReturnType<typeof IndexerOracleStreamTransformer.pricesByMarketsCallback>) => void;
/**
 * @category Indexer Grpc Stream
 */
export declare class IndexerGrpcOracleStream {
    protected client: InjectiveOracleRpc.InjectiveOracleRPCClientImpl;
    constructor(endpoint: string);
    streamOraclePrices({ oracleType, baseSymbol, quoteSymbol, callback, onEndCallback, onStatusCallback, }: {
        oracleType: string;
        baseSymbol?: string;
        quoteSymbol?: string;
        callback: OraclePriceStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamOraclePricesByMarkets({ marketIds, callback, onEndCallback, onStatusCallback, }: {
        marketIds?: string[];
        callback: OraclePricesByMarketsStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
}
