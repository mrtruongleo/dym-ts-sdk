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
exports.ChainGrpcDistributionApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
/**
 * @category Chain Grpc API
 */
class ChainGrpcDistributionApi extends BaseGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.ChainModule.Distribution;
        this.client = new core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Params(request));
                return transformers_1.ChainGrpcDistributionTransformer.moduleParamsResponseToModuleParams(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosDistributionV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Params',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Params',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegatorRewardsForValidator({ delegatorAddress, validatorAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryDelegationRewardsRequest.create();
            request.validatorAddress = validatorAddress;
            request.delegatorAddress = delegatorAddress;
            try {
                const response = yield this.retry(() => this.client.DelegationRewards(request));
                return transformers_1.ChainGrpcDistributionTransformer.delegationRewardResponseToReward(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosDistributionV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegationRewards',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'DelegationRewards',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegatorRewardsForValidatorNoThrow({ delegatorAddress, validatorAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryDelegationRewardsRequest.create();
            request.validatorAddress = validatorAddress;
            request.delegatorAddress = delegatorAddress;
            try {
                const response = yield this.retry(() => this.client.DelegationRewards(request));
                return transformers_1.ChainGrpcDistributionTransformer.delegationRewardResponseToReward(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return [];
                }
                if (e instanceof core_proto_ts_1.CosmosDistributionV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegationRewards',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'DelegationRewards',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegatorRewards(injectiveAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryDelegationTotalRewardsRequest.create();
            request.delegatorAddress = injectiveAddress;
            try {
                const response = yield this.retry(() => this.client.DelegationTotalRewards(request));
                return transformers_1.ChainGrpcDistributionTransformer.totalDelegationRewardResponseToTotalReward(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosDistributionV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegationTotalRewards',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'DelegationTotalRewards',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegatorRewardsNoThrow(injectiveAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryDelegationTotalRewardsRequest.create();
            request.delegatorAddress = injectiveAddress;
            try {
                const response = yield this.retry(() => this.client.DelegationTotalRewards(request));
                return transformers_1.ChainGrpcDistributionTransformer.totalDelegationRewardResponseToTotalReward(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return [];
                }
                if (e instanceof core_proto_ts_1.CosmosDistributionV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegationTotalRewards',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'DelegationTotalRewards',
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.ChainGrpcDistributionApi = ChainGrpcDistributionApi;
