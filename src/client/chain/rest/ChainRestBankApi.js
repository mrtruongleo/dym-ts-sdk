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
exports.ChainRestBankApi = void 0;
const http_status_codes_1 = require("http-status-codes");
const exceptions_1 = require("@injectivelabs/exceptions");
const BaseRestConsumer_1 = __importDefault(require("../../base/BaseRestConsumer"));
const types_1 = require("../types");
/**
 * @category Chain Rest API
 */
class ChainRestBankApi extends BaseRestConsumer_1.default {
    /**
     * Get address's balance
     *
     * @param address address of account to look up
     */
    fetchBalances(address, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `cosmos/bank/v1beta1/balances/${address}`;
            try {
                const response = yield this.retry(() => this.get(endpoint, params));
                return response.data;
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.ChainModule.Bank,
                });
            }
        });
    }
    /**
     * Get address's balances
     *
     * @param address address of account to look up
     */
    fetchBalance(address, denom, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `cosmos/bank/v1beta1/balances/${address}`;
            try {
                const response = yield this.retry(() => this.get(endpoint, params));
                const balance = response.data.balances.find((balance) => balance.denom === denom);
                if (!balance) {
                    throw new exceptions_1.GeneralException(new Error(`The ${denom} balance was not found`), {
                        code: http_status_codes_1.StatusCodes.NOT_FOUND,
                        type: exceptions_1.ErrorType.NotFoundError,
                    });
                }
                return balance;
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                if (e instanceof exceptions_1.GeneralException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.ChainModule.Bank,
                });
            }
        });
    }
}
exports.ChainRestBankApi = ChainRestBankApi;
