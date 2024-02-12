var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpRequestException, UnspecifiedErrorCode, } from "@injectivelabs/exceptions";
import BaseRestConsumer from "../../base/BaseRestConsumer";
import { ChainModule } from "../types";
import { startWithPrefix } from "../../../utils/check";
/**
 * @category Chain Rest API
 */
export class ChainRestAuthApi extends BaseRestConsumer {
    /**
     * Looks up the account information for the Injective address.
     *
     * @param address address of account to look up
     */
    fetchAccount(address, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `cosmos/auth/v1beta1/accounts/${address}`;
            try {
                const response = yield this.retry(() => this.get(endpoint, params));
                return response.data;
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: ChainModule.Auth,
                });
            }
        });
    }
    /**
     * Looks up the account information for any cosmos chain address.
     *
     * @param address address of account to look up
     */
    fetchCosmosAccount(address, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `cosmos/auth/v1beta1/accounts/${address}`;
            try {
                const isInjectiveAddress = startWithPrefix(address);
                const response = yield this.retry(() => this.get(endpoint, params));
                const baseAccount = isInjectiveAddress
                    ? response.data.account.base_account
                    : response.data.account;
                return baseAccount;
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: ChainModule.Auth,
                });
            }
        });
    }
}
