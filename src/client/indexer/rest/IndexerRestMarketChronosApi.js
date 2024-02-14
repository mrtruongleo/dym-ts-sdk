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
exports.IndexerRestMarketChronosApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const BaseRestConsumer_1 = __importDefault(require("../../base/BaseRestConsumer"));
const types_1 = require("../types");
class IndexerRestMarketChronosApi extends BaseRestConsumer_1.default {
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
        });
    }
}
exports.IndexerRestMarketChronosApi = IndexerRestMarketChronosApi;
