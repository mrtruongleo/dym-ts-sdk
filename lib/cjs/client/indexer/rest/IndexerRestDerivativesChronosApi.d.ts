import BaseRestConsumer from '../../base/BaseRestConsumer';
/**
 * @category Indexer Chronos API
 */
export declare class IndexerRestDerivativesChronosApi extends BaseRestConsumer {
    fetchMarketSummary(marketId: string): Promise<import("../types").ChronosDerivativeMarketSummary>;
    fetchMarketsSummary(): Promise<import("../types").AllChronosDerivativeMarketSummary[]>;
}
