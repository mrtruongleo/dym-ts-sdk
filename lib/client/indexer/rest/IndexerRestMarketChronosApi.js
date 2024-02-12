var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpRequestException, HttpRequestMethod, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import BaseRestConsumer from '../../base/BaseRestConsumer';
import { IndexerModule } from '../types';
export class IndexerRestMarketChronosApi extends BaseRestConsumer {
    fetchMarketsHistory({ marketIds, resolution, countback, }) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const { data } = yield this.retry(() => this.get(pathWithParams));
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
        });
    }
}
