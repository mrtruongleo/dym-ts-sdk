import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveTokenFactoryV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcTokenFactoryTransformer } from '..';
/**
 * @category TokenFactory Grpc API
 */
export class ChainGrpcTokenFactoryApi extends BaseGrpcConsumer {
    module = ChainModule.WasmX;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveTokenFactoryV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchDenomsFromCreator(creator) {
        const request = InjectiveTokenFactoryV1Beta1Query.QueryDenomsFromCreatorRequest.create();
        request.creator = creator;
        try {
            const response = await this.retry(() => this.client.DenomsFromCreator(request));
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
    }
    async fetchDenomAuthorityMetadata(creator, subDenom) {
        const request = InjectiveTokenFactoryV1Beta1Query.QueryDenomAuthorityMetadataRequest.create();
        request.creator = creator;
        request.subDenom = subDenom;
        try {
            const response = await this.retry(() => this.client.DenomAuthorityMetadata(request));
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
    }
    async fetchModuleParams() {
        const request = InjectiveTokenFactoryV1Beta1Query.QueryParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.Params(request));
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
    }
    async fetchModuleState() {
        const request = InjectiveTokenFactoryV1Beta1Query.QueryModuleStateRequest.create();
        try {
            const response = await this.retry(() => this.client.TokenfactoryModuleState(request));
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
    }
}
