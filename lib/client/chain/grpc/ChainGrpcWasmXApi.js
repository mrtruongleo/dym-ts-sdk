var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveWasmxV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcWasmXApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.WasmX;
        this.client = new InjectiveWasmxV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveWasmxV1Beta1Query.QueryWasmxParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.WasmxParams(request));
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
        });
    }
    fetchModuleState() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveWasmxV1Beta1Query.QueryModuleStateRequest.create();
            try {
                const response = yield this.retry(() => this.client.WasmxModuleState(request));
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
        });
    }
}
