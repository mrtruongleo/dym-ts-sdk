"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainRestAuthApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const BaseRestConsumer_1 = __importDefault(require("../../base/BaseRestConsumer"));
const types_1 = require("../types");
const check_1 = require("../../../utils/check");
/**
 * @category Chain Rest API
 */
class ChainRestAuthApi extends BaseRestConsumer_1.default {
    /**
     * Looks up the account information for the Injective address.
     *
     * @param address address of account to look up
     */
    async fetchAccount(address, params = {}) {
        const endpoint = `cosmos/auth/v1beta1/accounts/${address}`;
        try {
            const response = await this.retry(() => this.get(endpoint, params));
            return response.data;
        }
        catch (e) {
            if (e instanceof exceptions_1.HttpRequestException) {
                throw e;
            }
            throw new exceptions_1.HttpRequestException(new Error(e.message), {
                code: exceptions_1.UnspecifiedErrorCode,
                context: `${this.endpoint}/${endpoint}`,
                contextModule: types_1.ChainModule.Auth,
            });
        }
    }
    /**
     * Looks up the account information for any cosmos chain address.
     *
     * @param address address of account to look up
     */
    async fetchCosmosAccount(address, params = {}) {
        const endpoint = `cosmos/auth/v1beta1/accounts/${address}`;
        try {
            const isInjectiveAddress = (0, check_1.startWithPrefix)(address);
            const response = await this.retry(() => this.get(endpoint, params));
            const baseAccount = isInjectiveAddress
                ? response.data.account.base_account
                : response.data.account;
            return baseAccount;
        }
        catch (e) {
            if (e instanceof exceptions_1.HttpRequestException) {
                throw e;
            }
            throw new exceptions_1.HttpRequestException(new Error(e.message), {
                code: exceptions_1.UnspecifiedErrorCode,
                context: `${this.endpoint}/${endpoint}`,
                contextModule: types_1.ChainModule.Auth,
            });
        }
    }
}
exports.ChainRestAuthApi = ChainRestAuthApi;
//# sourceMappingURL=ChainRestAuthApi.js.map