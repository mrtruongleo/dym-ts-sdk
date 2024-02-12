"use strict";
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
    module = types_1.ChainModule.Distribution;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.Params(request));
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
    }
    async fetchDelegatorRewardsForValidator({ delegatorAddress, validatorAddress, }) {
        const request = core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryDelegationRewardsRequest.create();
        request.validatorAddress = validatorAddress;
        request.delegatorAddress = delegatorAddress;
        try {
            const response = await this.retry(() => this.client.DelegationRewards(request));
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
    }
    async fetchDelegatorRewardsForValidatorNoThrow({ delegatorAddress, validatorAddress, }) {
        const request = core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryDelegationRewardsRequest.create();
        request.validatorAddress = validatorAddress;
        request.delegatorAddress = delegatorAddress;
        try {
            const response = await this.retry(() => this.client.DelegationRewards(request));
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
    }
    async fetchDelegatorRewards(injectiveAddress) {
        const request = core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryDelegationTotalRewardsRequest.create();
        request.delegatorAddress = injectiveAddress;
        try {
            const response = await this.retry(() => this.client.DelegationTotalRewards(request));
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
    }
    async fetchDelegatorRewardsNoThrow(injectiveAddress) {
        const request = core_proto_ts_1.CosmosDistributionV1Beta1Query.QueryDelegationTotalRewardsRequest.create();
        request.delegatorAddress = injectiveAddress;
        try {
            const response = await this.retry(() => this.client.DelegationTotalRewards(request));
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
    }
}
exports.ChainGrpcDistributionApi = ChainGrpcDistributionApi;
//# sourceMappingURL=ChainGrpcDistributionApi.js.map