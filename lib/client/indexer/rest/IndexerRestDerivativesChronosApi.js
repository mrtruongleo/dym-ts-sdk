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
import { IndexerModule } from '../types';
/**
 * @category Indexer Chronos API
 */
export class IndexerRestDerivativesChronosApi extends BaseRestConsumer {
    fetchMarketSummary(marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = `market_summary`;
            try {
                const { data } = yield this.retry(() => this.get(path, {
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
                    contextModule: IndexerModule.ChronosDerivative,
                });
            }
        });
    }
    fetchMarketsSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            const path = `market_summary_all`;
            try {
                const { data } = yield this.retry(() => this.get(path, {
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
                    contextModule: IndexerModule.ChronosDerivative,
                });
            }
        });
    }
}
