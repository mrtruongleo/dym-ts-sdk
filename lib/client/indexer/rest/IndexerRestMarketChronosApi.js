import { HttpRequestException, HttpRequestMethod, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import BaseRestConsumer from '../../base/BaseRestConsumer';
import { IndexerModule } from '../types';
export class IndexerRestMarketChronosApi extends BaseRestConsumer {
    async fetchMarketsHistory({ marketIds, resolution, countback, }) {
        const path = `history`;
        const queryMarketIds = marketIds.map((marketId) => ({
            marketIDs: marketId,
        }));
        const params = [
            ...queryMarketIds,
            { resolution: String(resolution) },
            { countback: String(countback) },
        ];
        const stringifiedParams = params
            .map((param) => new URLSearchParams(param))
            .join('&');
        const pathWithParams = `${path}?${stringifiedParams}`;
        try {
            const { data } = await this.retry(() => this.get(pathWithParams));
            return data;
        }
        catch (e) {
            if (e instanceof HttpRequestException) {
                throw e;
            }
            throw new HttpRequestException(new Error(e.message), {
                code: UnspecifiedErrorCode,
                context: `${this.endpoint}/${pathWithParams}`,
                method: HttpRequestMethod.Get,
                contextModule: IndexerModule.ChronosMarkets,
            });
        }
    }
}
