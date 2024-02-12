var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import BaseRestConsumer from '../../base/BaseRestConsumer';
import { ChainModule } from '../types';
/**
 * @category Chain Rest API
 */
export class ChainRestTendermintApi extends BaseRestConsumer {
    fetchLatestBlock(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `cosmos/base/tendermint/v1beta1/blocks/latest`;
            try {
                const response = yield this.retry(() => this.get(endpoint, params));
                return response.data.block;
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: ChainModule.Tendermint,
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
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: ChainModule.Tendermint,
                });
            }
        });
    }
}
