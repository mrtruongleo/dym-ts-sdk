"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerRestMarketChronosApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const BaseRestConsumer_1 = __importDefault(require("../../base/BaseRestConsumer"));
const types_1 = require("../types");
class IndexerRestMarketChronosApi extends BaseRestConsumer_1.default {
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
            if (e instanceof exceptions_1.HttpRequestException) {
                throw e;
            }
            throw new exceptions_1.HttpRequestException(new Error(e.message), {
                code: exceptions_1.UnspecifiedErrorCode,
                context: `${this.endpoint}/${pathWithParams}`,
                method: exceptions_1.HttpRequestMethod.Get,
                contextModule: types_1.IndexerModule.ChronosMarkets,
            });
        }
    }
}
exports.IndexerRestMarketChronosApi = IndexerRestMarketChronosApi;
//# sourceMappingURL=IndexerRestMarketChronosApi.js.map