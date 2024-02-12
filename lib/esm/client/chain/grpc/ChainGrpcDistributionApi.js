import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { CosmosDistributionV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcDistributionTransformer } from '../transformers';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcDistributionApi extends BaseGrpcConsumer {
    module = ChainModule.Distribution;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new CosmosDistributionV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = CosmosDistributionV1Beta1Query.QueryParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.Params(request));
            return ChainGrpcDistributionTransformer.moduleParamsResponseToModuleParams(response);
        }
        catch (e) {
            if (e instanceof CosmosDistributionV1Beta1Query.GrpcWebError) {
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
    async fetchDelegatorRewardsForValidator({ delegatorAddress, validatorAddress, }) {
        const request = CosmosDistributionV1Beta1Query.QueryDelegationRewardsRequest.create();
        request.validatorAddress = validatorAddress;
        request.delegatorAddress = delegatorAddress;
        try {
            const response = await this.retry(() => this.client.DelegationRewards(request));
            return ChainGrpcDistributionTransformer.delegationRewardResponseToReward(response);
        }
        catch (e) {
            if (e instanceof CosmosDistributionV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'DelegationRewards',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'DelegationRewards',
                contextModule: this.module,
            });
        }
    }
    async fetchDelegatorRewardsForValidatorNoThrow({ delegatorAddress, validatorAddress, }) {
        const request = CosmosDistributionV1Beta1Query.QueryDelegationRewardsRequest.create();
        request.validatorAddress = validatorAddress;
        request.delegatorAddress = delegatorAddress;
        try {
            const response = await this.retry(() => this.client.DelegationRewards(request));
            return ChainGrpcDistributionTransformer.delegationRewardResponseToReward(response);
        }
        catch (e) {
            if (e.message.includes('does not exist')) {
                return [];
            }
            if (e instanceof CosmosDistributionV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'DelegationRewards',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'DelegationRewards',
                contextModule: this.module,
            });
        }
    }
    async fetchDelegatorRewards(injectiveAddress) {
        const request = CosmosDistributionV1Beta1Query.QueryDelegationTotalRewardsRequest.create();
        request.delegatorAddress = injectiveAddress;
        try {
            const response = await this.retry(() => this.client.DelegationTotalRewards(request));
            return ChainGrpcDistributionTransformer.totalDelegationRewardResponseToTotalReward(response);
        }
        catch (e) {
            if (e instanceof CosmosDistributionV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'DelegationTotalRewards',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'DelegationTotalRewards',
                contextModule: this.module,
            });
        }
    }
    async fetchDelegatorRewardsNoThrow(injectiveAddress) {
        const request = CosmosDistributionV1Beta1Query.QueryDelegationTotalRewardsRequest.create();
        request.delegatorAddress = injectiveAddress;
        try {
            const response = await this.retry(() => this.client.DelegationTotalRewards(request));
            return ChainGrpcDistributionTransformer.totalDelegationRewardResponseToTotalReward(response);
        }
        catch (e) {
            if (e.message.includes('does not exist')) {
                return [];
            }
            if (e instanceof CosmosDistributionV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'DelegationTotalRewards',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'DelegationTotalRewards',
                contextModule: this.module,
            });
        }
    }
}