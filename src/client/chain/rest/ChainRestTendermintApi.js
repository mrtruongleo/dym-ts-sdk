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
exports.ChainRestTendermintApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const BaseRestConsumer_1 = __importDefault(require("../../base/BaseRestConsumer"));
const types_1 = require("../types");
/**
 * @category Chain Rest API
 */
class ChainRestTendermintApi extends BaseRestConsumer_1.default {
    fetchLatestBlock(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `cosmos/base/tendermint/v1beta1/blocks/latest`;
            try {
                const response = yield this.retry(() => this.get(endpoint, params));
                return response.data.block;
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.ChainModule.Tendermint,
                });
            }
        });
    }
    fetchNodeInfo(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `cosmos/base/tendermint/v1beta1/node_info`;
            try {
                const response = yield this.retry(() => this.get(endpoint, params));
                return {
                    nodeInfo: response.data.default_node_info,
                    applicationVersion: response.data.application_version,
                };
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.ChainModule.Tendermint,
                });
            }
        });
    }
}
exports.ChainRestTendermintApi = ChainRestTendermintApi;
