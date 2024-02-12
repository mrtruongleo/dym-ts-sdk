var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseRestConsumer from '../../base/BaseRestConsumer';
import { HttpRequestException, HttpRequestMethod, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
/**
 * @category Indexer Chronos API
 */
export class IndexerRestLeaderboardChronosApi extends BaseRestConsumer {
    fetchLeaderboard(resolution) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = ``;
            try {
                const { data } = yield this.retry(() => this.get(path, {
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
        });
    }
}
