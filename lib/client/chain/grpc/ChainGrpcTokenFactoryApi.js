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
import { InjectiveTokenFactoryV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcTokenFactoryTransformer } from '..';
/**
 * @category TokenFactory Grpc API
 */
export class ChainGrpcTokenFactoryApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.WasmX;
        this.client = new InjectiveTokenFactoryV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchDenomsFromCreator(creator) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveTokenFactoryV1Beta1Query.QueryDenomsFromCreatorRequest.create();
            request.creator = creator;
            try {
                const response = yield this.retry(() => this.client.DenomsFromCreator(request));
                return ChainGrpcTokenFactoryTransformer.denomsCreatorResponseToDenomsString(response);
            }
            catch (e) {
                if (e instanceof InjectiveTokenFactoryV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'TokenFactoryDenomsFromCreator',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'TokenFactoryDenomsFromCreator',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDenomAuthorityMetadata(creator, subDenom) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveTokenFactoryV1Beta1Query.QueryDenomAuthorityMetadataRequest.create();
            request.creator = creator;
            request.subDenom = subDenom;
            try {
                const response = yield this.retry(() => this.client.DenomAuthorityMetadata(request));
                return ChainGrpcTokenFactoryTransformer.authorityMetadataResponseToAuthorityMetadata(response);
            }
            catch (e) {
                if (e instanceof InjectiveTokenFactoryV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'TokenFactoryDenomsFromCreator',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'TokenFactoryDenomsFromCreator',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveTokenFactoryV1Beta1Query.QueryParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Params(request));
                return ChainGrpcTokenFactoryTransformer.moduleParamsResponseToModuleParams(response);
            }
            catch (e) {
                if (e instanceof InjectiveTokenFactoryV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'TokenFactoryParams',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'TokenFactoryParams',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchModuleState() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveTokenFactoryV1Beta1Query.QueryModuleStateRequest.create();
            try {
                const response = yield this.retry(() => this.client.TokenfactoryModuleState(request));
                return ChainGrpcTokenFactoryTransformer.moduleStateResponseToModuleState(response);
            }
            catch (e) {
                if (e instanceof InjectiveTokenFactoryV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'TokenFactoryModuleState',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'TokenFactoryModuleState',
                    contextModule: this.module,
                });
            }
        });
    }
}
