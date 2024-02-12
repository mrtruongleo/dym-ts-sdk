"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerRestLeaderboardChronosApi = void 0;
const BaseRestConsumer_1 = __importDefault(require("../../base/BaseRestConsumer"));
const exceptions_1 = require("@injectivelabs/exceptions");
/**
 * @category Indexer Chronos API
 */
class IndexerRestLeaderboardChronosApi extends BaseRestConsumer_1.default {
    async fetchLeaderboard(resolution) {
        const path = ``;
        try {
            const { data } = await this.retry(() => this.get(path, {
                resolution,
            }));
            return data;
        }
        catch (e) {
            if (e instanceof exceptions_1.HttpRequestException) {
                throw e;
            }
            throw new exceptions_1.HttpRequestException(new Error(e.message), {
                code: exceptions_1.UnspecifiedErrorCode,
                context: `${this.endpoint}`,
                method: exceptions_1.HttpRequestMethod.Get,
                contextModule: 'Leaderboard',
            });
        }
    }
}
exports.IndexerRestLeaderboardChronosApi = IndexerRestLeaderboardChronosApi;
//# sourceMappingURL=IndexerRestLeaderboardChronosApi.js.map