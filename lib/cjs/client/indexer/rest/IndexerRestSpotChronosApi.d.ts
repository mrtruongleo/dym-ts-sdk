import BaseRestConsumer from '../../base/BaseRestConsumer';
/**
 * @category Indexer Chronos API
 */
export declare class IndexerRestSpotChronosApi extends BaseRestConsumer {
    fetchMarketSummary(marketId: string): Promise<import("../types").ChronosSpotMarketSummary>;
    fetchMarketsSummary(): Promise<import("../types").AllChronosSpotMarketSummary[]>;
}
