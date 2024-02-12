import { cosmosSdkDecToBigNumber } from '../../../utils';
/**
 * @category Chain Grpc Transformer
 */
export class ChainGrpcDistributionTransformer {
    static moduleParamsResponseToModuleParams(response) {
        const params = response.params;
        return {
            communityTax: cosmosSdkDecToBigNumber(params.communityTax).toFixed(),
            baseProposerReward: params.baseProposerReward,
            bonusProposerReward: params.bonusProposerReward,
            withdrawAddrEnabled: params.withdrawAddrEnabled,
        };
    }
    static delegationRewardResponseToReward(response) {
        const grpcRewards = response.rewards;
        return grpcRewards.map((grpcReward) => {
            return {
                amount: cosmosSdkDecToBigNumber(grpcReward.amount).toFixed(),
                denom: grpcReward.denom,
            };
        });
    }
    static totalDelegationRewardResponseToTotalReward(response) {
        const grpcRewards = response.rewards;
        return grpcRewards.map((grpcReward) => {
            const rewards = grpcReward.reward.map((reward) => ({
                amount: cosmosSdkDecToBigNumber(reward.amount).toFixed(),
                denom: reward.denom,
            }));
            return {
                rewards,
                validatorAddress: grpcReward.validatorAddress,
            };
        });
    }
}
