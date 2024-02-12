import { HttpRequestException, HttpRequestMethod, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import BaseRestConsumer from '../../base/BaseRestConsumer';
import { IndexerModule } from '../types';
/**
 * @category Indexer Chronos API
 */
export class IndexerRestSpotChronosApi extends BaseRestConsumer {
    async fetchMarketSummary(marketId) {
        const path = `market_summary`;
        try {
            const { data } = await this.retry(() => this.get(path, {
                marketId,
                resolution: '24h',
            }));
            return data;
        }
        catch (e) {
            if (e instanceof HttpRequestException) {
                throw e;
            }
            throw new HttpRequestException(new Error(e.message), {
                code: UnspecifiedErrorCode,
                context: `${this.endpoint}/${path}?marketId=${marketId}`,
                method: HttpRequestMethod.Get,
                contextModule: IndexerModule.ChronosSpot,
            });
        }
    }
    async fetchMarketsSummary() {
        const path = `market_summary_all`;
        try {
            const { data } = await this.retry(() => this.get(path, {
                resolution: '24h',
            }));
            return data;
        }
        catch (e) {
            if (e instanceof HttpRequestException) {
                throw e;
            }
            throw new HttpRequestException(new Error(e.message), {
                code: UnspecifiedErrorCode,
                context: `${this.endpoint}/${path}`,
                method: HttpRequestMethod.Get,
                contextModule: IndexerModule.ChronosSpot,
            });
        }
    }
}
