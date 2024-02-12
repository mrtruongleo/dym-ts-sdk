import { Coin } from '@injectivelabs/ts-types';
import { CosmosDistributionV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ValidatorRewards } from '../types';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcDistributionApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: CosmosDistributionV1Beta1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchModuleParams(): Promise<import("../types").DistributionModuleParams>;
    fetchDelegatorRewardsForValidator({ delegatorAddress, validatorAddress, }: {
        delegatorAddress: string;
        validatorAddress: string;
    }): Promise<Coin[]>;
    fetchDelegatorRewardsForValidatorNoThrow({ delegatorAddress, validatorAddress, }: {
        delegatorAddress: string;
        validatorAddress: string;
    }): Promise<Coin[]>;
    fetchDelegatorRewards(injectiveAddress: string): Promise<ValidatorRewards[]>;
    fetchDelegatorRewardsNoThrow(injectiveAddress: string): Promise<ValidatorRewards[]>;
}
