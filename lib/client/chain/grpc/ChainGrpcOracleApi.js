import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveOracleV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcOracleApi extends BaseGrpcConsumer {
    module = ChainModule.Oracle;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveOracleV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = InjectiveOracleV1Beta1Query.QueryParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.Params(request));
            return response.params;
        }
        catch (e) {
            if (e instanceof InjectiveOracleV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Params',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'Params',
                contextModule: this.module,
            });
        }
    }
}
