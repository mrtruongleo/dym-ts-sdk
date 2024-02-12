"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerRestSpotChronosApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const BaseRestConsumer_1 = __importDefault(require("../../base/BaseRestConsumer"));
const types_1 = require("../types");
/**
 * @category Indexer Chronos API
 */
class IndexerRestSpotChronosApi extends BaseRestConsumer_1.default {
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
            if (e instanceof exceptions_1.HttpRequestException) {
                throw e;
            }
            throw new exceptions_1.HttpRequestException(new Error(e.message), {
                code: exceptions_1.UnspecifiedErrorCode,
                context: `${this.endpoint}/${path}?marketId=${marketId}`,
                method: exceptions_1.HttpRequestMethod.Get,
                contextModule: types_1.IndexerModule.ChronosSpot,
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
            if (e instanceof exceptions_1.HttpRequestException) {
                throw e;
            }
            throw new exceptions_1.HttpRequestException(new Error(e.message), {
                code: exceptions_1.UnspecifiedErrorCode,
                context: `${this.endpoint}/${path}`,
                method: exceptions_1.HttpRequestMethod.Get,
                contextModule: types_1.IndexerModule.ChronosSpot,
            });
        }
    }
}
exports.IndexerRestSpotChronosApi = IndexerRestSpotChronosApi;
//# sourceMappingURL=IndexerRestSpotChronosApi.js.map