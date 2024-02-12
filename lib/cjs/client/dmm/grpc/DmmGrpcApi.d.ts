import { InjectiveDmmRpc } from '@injectivelabs/dmm-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
export declare class DmmGrpcApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveDmmRpc.InjectiveDmmV2RPCClientImpl;
    constructor(endpoint: string);
    fetchEpochs(status?: string): Promise<import("./types").EpochV2[]>;
    fetchMarketRewards(epochId: string): Promise<import("./types").MarketReward[]>;
    fetchEligibleAddresses({ epochId, page, }: {
        epochId: string;
        page?: InjectiveDmmRpc.Pagination;
    }): Promise<import("./types").EligibleAddresses>;
    fetchEpochScores({ epochId, page, }: {
        epochId: string;
        page?: InjectiveDmmRpc.Pagination;
    }): Promise<import("./types").EpochScores>;
    fetchEpochScoresHistory({ epochId, accountAddress, page, }: {
        epochId: string;
        accountAddress: string;
        page?: InjectiveDmmRpc.Pagination;
    }): Promise<import("./types").EpochScoresHistory>;
    fetchTotalScores({ epochId, marketId, page, }: {
        epochId: string;
        marketId: string;
        page?: InjectiveDmmRpc.Pagination;
    }): Promise<import("./types").TotalScores>;
    fetchTotalScoresHistory({ epochId, marketId, accountAddress, page, }: {
        epochId: string;
        marketId: string;
        accountAddress: string;
        page?: InjectiveDmmRpc.Pagination;
    }): Promise<import("./types").TotalScoresHistory>;
    fetchRewardsDistribution({ epochId, height, page, }: {
        epochId: string;
        height?: string;
        page?: InjectiveDmmRpc.Pagination;
    }): Promise<import("./types").RewardsDistribution>;
    fetchAccountVolumes({ epochId, accountAddress, }: {
        epochId: string;
        accountAddress: string;
    }): Promise<import("./types").AccountVolume[]>;
    fetchRewardsEligibility({ epochId, accountAddress, }: {
        epochId?: string;
        accountAddress?: string;
    }): Promise<import("./types").RewardsEligibility>;
}
