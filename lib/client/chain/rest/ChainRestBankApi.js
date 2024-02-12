var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StatusCodes } from 'http-status-codes';
import { ErrorType, GeneralException, HttpRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import BaseRestConsumer from '../../base/BaseRestConsumer';
import { ChainModule } from '../types';
/**
 * @category Chain Rest API
 */
export class ChainRestBankApi extends BaseRestConsumer {
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
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: ChainModule.Bank,
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
                    throw new GeneralException(new Error(`The ${denom} balance was not found`), {
                        code: StatusCodes.NOT_FOUND,
                        type: ErrorType.NotFoundError,
                    });
                }
                return balance;
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                if (e instanceof GeneralException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: ChainModule.Bank,
                });
            }
        });
    }
}
