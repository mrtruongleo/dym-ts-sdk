import { HttpRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import BaseRestConsumer from '../../base/BaseRestConsumer';
import { ChainModule } from '../types';
/**
 * @category Chain Rest API
 */
export class ChainRestTendermintApi extends BaseRestConsumer {
    async fetchLatestBlock(params = {}) {
        const endpoint = `cosmos/base/tendermint/v1beta1/blocks/latest`;
        try {
            const response = await this.retry(() => this.get(endpoint, params));
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
            if (e instanceof HttpRequestException) {
                throw e;
            }
            throw new HttpRequestException(new Error(e.message), {
                code: UnspecifiedErrorCode,
                context: `${this.endpoint}/${endpoint}`,
                contextModule: ChainModule.Tendermint,
            });
        }
    }
}
