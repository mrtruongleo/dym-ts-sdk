"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.ChainModule.WasmX;
        this.client = new core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchDenomsFromCreator(creator) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.QueryDenomsFromCreatorRequest.create();
            request.creator = creator;
            try {
                const response = yield this.retry(() => this.client.DenomsFromCreator(request));
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
        });
    }
    fetchDenomAuthorityMetadata(creator, subDenom) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.QueryDenomAuthorityMetadataRequest.create();
            request.creator = creator;
            request.subDenom = subDenom;
            try {
                const response = yield this.retry(() => this.client.DenomAuthorityMetadata(request));
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
        });
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.QueryParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Params(request));
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
        });
    }
    fetchModuleState() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Query.QueryModuleStateRequest.create();
            try {
                const response = yield this.retry(() => this.client.TokenfactoryModuleState(request));
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
        });
    }
}
exports.ChainGrpcTokenFactoryApi = ChainGrpcTokenFactoryApi;
