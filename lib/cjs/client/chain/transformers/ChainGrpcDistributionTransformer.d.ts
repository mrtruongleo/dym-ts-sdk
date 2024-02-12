import { Coin } from '@injectivelabs/ts-types';
import { DistributionModuleParams } from '../types/distribution';
import { ValidatorRewards } from '../types/distribution';
import { CosmosDistributionV1Beta1Query } from '@injectivelabs/core-proto-ts';
/**
 * @category Chain Grpc Transformer
 */
export declare class ChainGrpcDistributionTransformer {
    static moduleParamsResponseToModuleParams(response: CosmosDistributionV1Beta1Query.QueryParamsResponse): DistributionModuleParams;
    static delegationRewardResponseToReward(response: CosmosDistributionV1Beta1Query.QueryDelegationRewardsResponse): Coin[];
    static totalDelegationRewardResponseToTotalReward(response: CosmosDistributionV1Beta1Query.QueryDelegationTotalRewardsResponse): ValidatorRewards[];
}
