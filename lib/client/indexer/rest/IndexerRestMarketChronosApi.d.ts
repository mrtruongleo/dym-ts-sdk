import BaseRestConsumer from '../../base/BaseRestConsumer';
export declare class IndexerRestMarketChronosApi extends BaseRestConsumer {
    fetchMarketsHistory({ marketIds, resolution, countback, }: {
        marketIds: string[];
        resolution: string | number;
        countback: string | number;
    }): Promise<import("../types").AllChronosMarketHistory[]>;
}
