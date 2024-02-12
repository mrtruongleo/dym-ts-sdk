"use strict";
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
    async fetchLatestBlock(params = {}) {
        const endpoint = `cosmos/base/tendermint/v1beta1/blocks/latest`;
        try {
            const response = await this.retry(() => this.get(endpoint, params));
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
    }
    async fetchNodeInfo(params = {}) {
        const endpoint = `cosmos/base/tendermint/v1beta1/node_info`;
        try {
            const response = await this.retry(() => this.get(endpoint, params));
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
    }
}
exports.ChainRestTendermintApi = ChainRestTendermintApi;
//# sourceMappingURL=ChainRestTendermintApi.js.map