import { MitoApi } from "@injectivelabs/mito-proto-ts";
import BaseGrpcConsumer from "../../base/BaseIndexerGrpcConsumer";
/**
 * @category Indexer Grpc API
 */
export declare class IndexerGrpcMitoApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: MitoApi.MitoAPIClientImpl;
    constructor(endpoint: string);
    fetchVault({ contractAddress, slug, }: {
        contractAddress?: string;
        slug?: string;
    }): Promise<import("../types").MitoVault>;
    fetchVaults({ limit, codeId, pageIndex, }: {
        limit?: number;
        codeId?: string;
        pageIndex?: number;
    }): Promise<{
        vaults: import("../types").MitoVault[];
        pagination?: import("../types").MitoPagination | undefined;
    }>;
    fetchLpTokenPriceChart({ to, from, vaultAddress, }: {
        to?: string;
        from?: string;
        vaultAddress: string;
    }): Promise<import("../types").MitoPriceSnapshot[]>;
    fetchTVLChartRequest({ to, from, vaultAddress, }: {
        to?: string;
        from?: string;
        vaultAddress: string;
    }): Promise<import("../types").MitoPriceSnapshot[]>;
    fetchVaultsByHolderAddress({ skip, limit, holderAddress, vaultAddress, }: {
        skip?: number;
        limit?: number;
        holderAddress: string;
        vaultAddress?: string;
    }): Promise<{
        subscriptions: import("../types").MitoSubscription[];
        pagination: import("../types").MitoPagination | undefined;
    }>;
    fetchLPHolders({ skip, limit, vaultAddress, stakingContractAddress, }: {
        skip?: number;
        limit?: number;
        vaultAddress: string;
        stakingContractAddress: string;
    }): Promise<{
        holders: import("../types").MitoHolders[];
        pagination: import("../types").MitoPagination | undefined;
    }>;
    fetchHolderPortfolio({ holderAddress, stakingContractAddress, }: {
        holderAddress: string;
        stakingContractAddress: string;
    }): Promise<import("../types").MitoPortfolio>;
    fetchLeaderboard(epochId?: number): Promise<import("../types").MitoLeaderboard>;
    fetchTransferHistory({ vault, account, limit, toNumber, fromNumber, }: {
        vault?: string;
        account?: string;
        limit?: number;
        toNumber?: number;
        fromNumber?: number;
    }): Promise<{
        transfers: import("../types").MitoTransfer[];
        pagination: import("../types").MitoPagination | undefined;
    }>;
    fetchLeaderboardEpochs({ limit, toEpochId, fromEpochId, }: {
        limit?: number;
        toEpochId?: number;
        fromEpochId?: number;
    }): Promise<{
        epochs: import("../types").MitoLeaderboardEpoch[];
        pagination: import("../types").MitoPagination | undefined;
    }>;
    fetchStakingPools({ staker, stakingContractAddress, }: {
        staker?: string;
        stakingContractAddress: string;
    }): Promise<{
        pools: {
            apr: number;
            vaultName: string;
            stakeDenom: string;
            vaultAddress: string;
            aprBreakdown: {
                [key: string]: number;
            };
            totalLiquidity: number;
            stakingAddress: string;
            gauges: {
                id: string;
                owner: string;
                lastDistribution: number;
                endTimestamp: number;
                startTimestamp: number;
                rewardTokens: import("@injectivelabs/ts-types").Coin[];
            }[];
        }[];
        pagination: import("../types").MitoPagination | undefined;
    }>;
    fetchStakingHistory({ staker, toNumber, limit, fromNumber, }?: {
        staker?: string;
        limit?: number;
        toNumber?: number;
        fromNumber?: number;
    }): Promise<{
        activities: {
            action: string;
            txHash: string;
            staker: string;
            vaultAddress: string;
            numberByAccount: number;
            timestamp: number;
            rewardedTokens: import("@injectivelabs/ts-types").Coin[];
            stakeAmount: import("@injectivelabs/ts-types").Coin | undefined;
        }[];
        pagination: import("../types").MitoPagination | undefined;
    }>;
    fetchStakingRewardsByAccount({ staker, stakingContractAddress, }: {
        staker: string;
        stakingContractAddress: string;
    }): Promise<{
        rewards: {
            apr: number;
            vaultName: string;
            vaultAddress: string;
            lockTimestamp: number;
            claimableRewards: import("@injectivelabs/ts-types").Coin[];
            stakedAmount: import("@injectivelabs/ts-types").Coin | undefined;
            lockedAmount: import("@injectivelabs/ts-types").Coin | undefined;
        }[];
        pagination: import("../types").MitoPagination | undefined;
    }>;
    fetchMissions({ accountAddress }: {
        accountAddress: string;
    }): Promise<import("../types").MitoMission[]>;
    fetchMissionLeaderboard(userAddress?: string): Promise<import("../types").MitoMissionLeaderboard>;
    fetchIDO({ contractAddress, accountAddress, }: {
        contractAddress: string;
        accountAddress?: string;
    }): Promise<{
        ido: import("../types").MitoIDO | undefined;
    }>;
    fetchIDOs({ status, limit, toNumber, accountAddress, ownerAddress, }?: {
        status?: string;
        limit?: number;
        toNumber?: number;
        accountAddress?: string;
        ownerAddress?: string;
    }): Promise<{
        idos: import("../types").MitoIDO[];
        pagination: import("../types").MitoPagination | undefined;
    }>;
    fetchIDOSubscribers({ skip, limit, sortBy, contractAddress, }: {
        skip?: number;
        limit?: number;
        sortBy?: string;
        contractAddress: string;
    }): Promise<{
        marketId: string;
        quoteDenom: string;
        subscribers: import("../types").MitoIDOSubscriber[];
        pagination: import("../types").MitoPagination | undefined;
        tokenInfo: import("../types").MitoTokenInfo | undefined;
    }>;
    fetchIDOSubscription({ contractAddress, accountAddress, }: {
        contractAddress: string;
        accountAddress: string;
    }): Promise<{
        subscription: import("../types").MitoIDOSubscription | undefined;
    }>;
    fetchIDOActivities({ contractAddress, accountAddress, limit, toNumber, }?: {
        contractAddress?: string;
        accountAddress?: string;
        limit?: number;
        toNumber?: string;
    }): Promise<{
        activities: import("../types").MitoIDOSubscriptionActivity[];
        pagination: import("../types").MitoPagination | undefined;
    }>;
    fetchIDOWhitelist({ skip, limit, idoAddress, }: {
        skip?: number;
        limit?: number;
        idoAddress: string;
    }): Promise<{
        idoAddress: string | undefined;
        accounts: import("../types").MitoWhitelistAccount[];
        pagination: import("../types").MitoPagination | undefined;
    }>;
}
