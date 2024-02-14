"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        });
    }
}
exports.IndexerRestLeaderboardChronosApi = IndexerRestLeaderboardChronosApi;
