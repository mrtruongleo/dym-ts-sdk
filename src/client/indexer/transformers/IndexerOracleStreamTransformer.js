"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerOracleStreamTransformer = void 0;
const types_1 = require("../../../types");
/**
 * @category Indexer Stream Transformer
 */
class IndexerOracleStreamTransformer {
}
exports.IndexerOracleStreamTransformer = IndexerOracleStreamTransformer;
IndexerOracleStreamTransformer.pricesStreamCallback = (response) => ({
    price: response.price,
    operation: types_1.StreamOperation.Update,
    timestamp: parseInt(response.timestamp, 10),
});
IndexerOracleStreamTransformer.pricesByMarketsCallback = (response) => (Object.assign({}, response));
