var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CosmosBaseTendermintV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcTendermintApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Tendermint;
        this.client = new CosmosBaseTendermintV1Beta1Query.ServiceClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchLatestBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosBaseTendermintV1Beta1Query.GetLatestBlockRequest.create();
            try {
                const response = yield this.retry(() => this.client.GetLatestBlock(request));
                return response.block || response.sdkBlock;
            }
            catch (e) {
                if (e instanceof CosmosBaseTendermintV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'TendermintApi.fetchLatestBlock',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'TendermintApi.fetchLatestBlock',
                    contextModule: this.module,
                });
            }
        });
    }
}
