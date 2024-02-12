"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcTokenFactoryApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const __1 = require("..");
/**
 * @category TokenFactory Grpc API
 */
class ChainGrpcTokenFactoryApi extends BaseGrpcConsumer_1.default {
    module = types_1.ChainModule.WasmX;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchDenomsFromCreator(creator) {
        const request = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.QueryDenomsFromCreatorRequest.create();
        request.creator = creator;
        try {
            const response = await this.retry(() => this.client.DenomsFromCreator(request));
            return __1.ChainGrpcTokenFactoryTransformer.denomsCreatorResponseToDenomsString(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'TokenFactoryDenomsFromCreator',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'TokenFactoryDenomsFromCreator',
                contextModule: this.module,
            });
        }
    }
    async fetchDenomAuthorityMetadata(creator, subDenom) {
        const request = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.QueryDenomAuthorityMetadataRequest.create();
        request.creator = creator;
        request.subDenom = subDenom;
        try {
            const response = await this.retry(() => this.client.DenomAuthorityMetadata(request));
            return __1.ChainGrpcTokenFactoryTransformer.authorityMetadataResponseToAuthorityMetadata(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'TokenFactoryDenomsFromCreator',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'TokenFactoryDenomsFromCreator',
                contextModule: this.module,
            });
        }
    }
    async fetchModuleParams() {
        const request = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.QueryParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.Params(request));
            return __1.ChainGrpcTokenFactoryTransformer.moduleParamsResponseToModuleParams(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'TokenFactoryParams',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'TokenFactoryParams',
                contextModule: this.module,
            });
        }
    }
    async fetchModuleState() {
        const request = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.QueryModuleStateRequest.create();
        try {
            const response = await this.retry(() => this.client.TokenfactoryModuleState(request));
            return __1.ChainGrpcTokenFactoryTransformer.moduleStateResponseToModuleState(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'TokenFactoryModuleState',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'TokenFactoryModuleState',
                contextModule: this.module,
            });
        }
    }
}
exports.ChainGrpcTokenFactoryApi = ChainGrpcTokenFactoryApi;
//# sourceMappingURL=ChainGrpcTokenFactoryApi.js.map