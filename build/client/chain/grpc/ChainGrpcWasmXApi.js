import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveWasmxV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcWasmXApi extends BaseGrpcConsumer {
    module = ChainModule.WasmX;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveWasmxV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = InjectiveWasmxV1Beta1Query.QueryWasmxParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.WasmxParams(request));
            return response;
        }
        catch (e) {
            if (e instanceof InjectiveWasmxV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'WasmxParams',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'WasmxParams',
                contextModule: this.module,
            });
        }
    }
    async fetchModuleState() {
        const request = InjectiveWasmxV1Beta1Query.QueryModuleStateRequest.create();
        try {
            const response = await this.retry(() => this.client.WasmxModuleState(request));
            return response.state; /* TODO */
        }
        catch (e) {
            if (e instanceof InjectiveWasmxV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'WasmxModuleState',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'WasmxModuleState',
                contextModule: this.module,
            });
        }
    }
}
