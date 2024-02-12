import { StreamOperation } from '../../../types';
/**
 * @category Indexer Stream Transformer
 */
export class IndexerOracleStreamTransformer {
    static pricesStreamCallback = (response) => ({
        price: response.price,
        operation: StreamOperation.Update,
        timestamp: parseInt(response.timestamp, 10),
    });
    static pricesByMarketsCallback = (response) => ({
        ...response,
    });
}
