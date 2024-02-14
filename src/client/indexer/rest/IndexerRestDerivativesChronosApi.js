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
exports.IndexerRestDerivativesChronosApi = void 0;
const BaseRestConsumer_1 = __importDefault(require("../../base/BaseRestConsumer"));
const exceptions_1 = require("@injectivelabs/exceptions");
const types_1 = require("../types");
/**
 * @category Indexer Chronos API
 */
class IndexerRestDerivativesChronosApi extends BaseRestConsumer_1.default {
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
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${path}?marketId=${marketId}`,
                    method: exceptions_1.HttpRequestMethod.Get,
                    contextModule: types_1.IndexerModule.ChronosDerivative,
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
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${path}`,
                    method: exceptions_1.HttpRequestMethod.Get,
                    contextModule: types_1.IndexerModule.ChronosDerivative,
                });
            }
        });
    }
}
exports.IndexerRestDerivativesChronosApi = IndexerRestDerivativesChronosApi;
