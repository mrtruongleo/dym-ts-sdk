import { InjectiveOracleRpc } from '@injectivelabs/indexer-proto-ts';
import { StreamOperation } from '../../../types';
/**
 * @category Indexer Stream Transformer
 */
export declare class IndexerOracleStreamTransformer {
    static pricesStreamCallback: (response: InjectiveOracleRpc.StreamPricesResponse) => {
        price: string;
        operation: StreamOperation;
        timestamp: number;
    };
    static pricesByMarketsCallback: (response: InjectiveOracleRpc.StreamPricesByMarketsResponse) => {
        price: string;
        timestamp: string;
        marketId: string;
    };
}
