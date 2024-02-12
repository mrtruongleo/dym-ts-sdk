import BaseRestConsumer from '../../base/BaseRestConsumer';
import { HttpRequestException, HttpRequestMethod, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
/**
 * @category Indexer Chronos API
 */
export class IndexerRestLeaderboardChronosApi extends BaseRestConsumer {
    async fetchLeaderboard(resolution) {
        const path = ``;
        try {
            const { data } = await this.retry(() => this.get(path, {
                resolution,
            }));
            return data;
        }
        catch (e) {
            if (e instanceof HttpRequestException) {
                throw e;
            }
            throw new HttpRequestException(new Error(e.message), {
                code: UnspecifiedErrorCode,
                context: `${this.endpoint}`,
                method: HttpRequestMethod.Get,
                contextModule: 'Leaderboard',
            });
        }
    }
}
