import { StreamOperation } from '../../../types';
/**
 * @category Indexer Stream Transformer
 */
export class IndexerOracleStreamTransformer {
}
IndexerOracleStreamTransformer.pricesStreamCallback = (response) => ({
    price: response.price,
    operation: StreamOperation.Update,
    timestamp: parseInt(response.timestamp, 10),
});
IndexerOracleStreamTransformer.pricesByMarketsCallback = (response) => (Object.assign({}, response));
