import { Coin } from "@injectivelabs/ts-types";
import { MitoApi } from "@injectivelabs/mito-proto-ts";
import { MitoIDO, MitoVault, MitoHolders, MitoChanges, MitoMission, MitoTransfer, MitoTokenInfo, MitoPortfolio, MitoPagination, MitoIDOProgress, MitoLeaderboard, MitoDenomBalance, MitoSubscription, MitoIDOSubscriber, MitoPriceSnapshot, MitoClaimReference, MitoIDOSubscription, MitoWhitelistAccount, MitoLeaderboardEpoch, MitoSubaccountBalance, MitoMissionLeaderboard, MitoStakeToSubscription, MitoIDOSubscriptionActivity, MitoMissionLeaderboardEntry } from "../types/mito";
import { GrpcCoin } from "../../../types";
/**
 * @category Indexer Grpc Transformer
 */
export declare class IndexerGrpcMitoTransformer {
    static grpcCoinToCoin(coin: GrpcCoin): Coin;
    static grpcTokenInfoToTokenInfo(tokenInfo: MitoApi.TokenInfo): MitoTokenInfo;
    static mitoPaginationToPagination(pagination?: MitoApi.Pagination): MitoPagination | undefined;
    static mitoDenomBalanceToDenomBalance(denomBalance: MitoApi.DenomBalance): MitoDenomBalance;
    static changesResponseToChanges(changes?: MitoApi.Changes): MitoChanges | undefined;
    static mitoSubaccountInfoToSubaccountInfo(mitoSubaccountInfo?: MitoApi.SubaccountBalance): MitoSubaccountBalance | undefined;
    static mitoVaultToVault(vault: MitoApi.Vault): MitoVault;
    static mitoPriceSnapshotToPriceSnapshot(snapshot: MitoApi.PriceSnapshot): MitoPriceSnapshot;
    static portfolioResponseToPortfolio(portfolio: MitoApi.PortfolioResponse): MitoPortfolio;
    static leaderboardResponseToLeaderboard(leaderboard: MitoApi.LeaderboardResponse): MitoLeaderboard;
    static mitoTransferHistoryToTransferHistory(transfer: MitoApi.Transfer): MitoTransfer;
    static mitoLeaderboardEpochToLeaderboardEpoch(leaderboardEpoch: MitoApi.LeaderboardEpoch): MitoLeaderboardEpoch;
    static mitoStakingRewardToStakingReward(stakingReward: MitoApi.StakingReward): {
        apr: number;
        vaultName: string;
        vaultAddress: string;
        lockTimestamp: number;
        claimableRewards: Coin[];
        stakedAmount: Coin | undefined;
        lockedAmount: Coin | undefined;
    };
    static mitoGaugeToGauge(gauge: MitoApi.Gauge): {
        id: string;
        owner: string;
        lastDistribution: number;
        endTimestamp: number;
        startTimestamp: number;
        rewardTokens: Coin[];
    };
    static mitoStakingPoolToStakingPool(stakingPool: MitoApi.StakingPool): {
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
            rewardTokens: Coin[];
        }[];
    };
    static mitoStakingActivityToStakingActivity(stakingActivity: MitoApi.StakingActivity): {
        action: string;
        txHash: string;
        staker: string;
        vaultAddress: string;
        numberByAccount: number;
        timestamp: number;
        rewardedTokens: Coin[];
        stakeAmount: Coin | undefined;
    };
    static mitoSubscriptionToSubscription(subscription: MitoApi.Subscription): MitoSubscription;
    static mitoLpHolderToLPHolder(holder: MitoApi.Holders): MitoHolders;
    static mitoMissionToMission(mission: MitoApi.Mission): MitoMission;
    static mitoMissionLeaderboardEntryToMissionLeaderboardEntry(entry: MitoApi.MissionLeaderboardEntry): MitoMissionLeaderboardEntry;
    static mitoIDOProgressToIDOProgress(progress: MitoApi.IDOProgress): MitoIDOProgress;
    static mitoStakedToSubscriptionToStakedToSubscription(data: MitoApi.ArrayOfString): MitoStakeToSubscription;
    static mitoIDOToIDO(IDO: MitoApi.IDO): MitoIDO;
    static mitoIDOSubscriberToIDOSubscriber(IDOSubscriber: MitoApi.IDOSubscriber): MitoIDOSubscriber;
    static mitoIDOSubscriptionToIDOSubscription(subscription: MitoApi.IDOSubscription): MitoIDOSubscription;
    static mitoIDOSubscriptionActivityToIDOSubscriptionActivity(IDOSubscriptionActivity: MitoApi.IDOSubscriptionActivity): MitoIDOSubscriptionActivity;
    static mitoWhitelistAccountToWhitelistAccount(account: MitoApi.WhitelistAccount): MitoWhitelistAccount;
    static mitoClaimReferenceToClaimReference(claimReference: any): MitoClaimReference;
    static vaultResponseToVault(response: MitoApi.GetVaultResponse): MitoVault;
    static vaultsResponseToVaults(response: MitoApi.GetVaultsResponse): {
        vaults: MitoVault[];
        pagination?: MitoPagination;
    };
    static lpTokenPriceChartResponseToLPTokenPriceChart(response: MitoApi.LPTokenPriceChartResponse): MitoPriceSnapshot[];
    static vaultsByHolderAddressResponseToVaultsByHolderAddress(response: MitoApi.VaultsByHolderAddressResponse): {
        subscriptions: MitoSubscription[];
        pagination: MitoPagination | undefined;
    };
    static lpHoldersResponseToLPHolders(response: MitoApi.LPHoldersResponse): {
        holders: MitoHolders[];
        pagination: MitoPagination | undefined;
    };
    static transferHistoryResponseToTransfer(response: MitoApi.TransfersHistoryResponse): {
        transfers: MitoTransfer[];
        pagination: MitoPagination | undefined;
    };
    static leaderboardEpochsResponseToLeaderboardEpochs(response: MitoApi.LeaderboardEpochsResponse): {
        epochs: MitoLeaderboardEpoch[];
        pagination: MitoPagination | undefined;
    };
    static stakingPoolsResponseToStakingPools(response: MitoApi.GetStakingPoolsResponse): {
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
                rewardTokens: Coin[];
            }[];
        }[];
        pagination: MitoPagination | undefined;
    };
    static stakingRewardByAccountResponseToStakingRewardByAccount(response: MitoApi.StakingRewardByAccountResponse): {
        rewards: {
            apr: number;
            vaultName: string;
            vaultAddress: string;
            lockTimestamp: number;
            claimableRewards: Coin[];
            stakedAmount: Coin | undefined;
            lockedAmount: Coin | undefined;
        }[];
        pagination: MitoPagination | undefined;
    };
    static mitoStakingHistoryResponseTpStakingHistory(response: MitoApi.StakingHistoryResponse): {
        activities: {
            action: string;
            txHash: string;
            staker: string;
            vaultAddress: string;
            numberByAccount: number;
            timestamp: number;
            rewardedTokens: Coin[];
            stakeAmount: Coin | undefined;
        }[];
        pagination: MitoPagination | undefined;
    };
    static mitoMissionsResponseMissions(response: MitoApi.MissionsResponse): MitoMission[];
    static mitoMissionLeaderboardResponseToMissionLeaderboard(response: MitoApi.MissionLeaderboardResponse): MitoMissionLeaderboard;
    static mitoListIDOsResponseToIDOs(response: MitoApi.ListIDOsResponse): {
        idos: MitoIDO[];
        pagination: MitoPagination | undefined;
    };
    static mitoIDOResponseToIDO(response: MitoApi.GetIDOResponse): {
        ido: MitoIDO | undefined;
    };
    static mitoIDOSubscribersResponseToIDOSubscribers(response: MitoApi.GetIDOSubscribersResponse): {
        marketId: string;
        quoteDenom: string;
        subscribers: MitoIDOSubscriber[];
        pagination: MitoPagination | undefined;
        tokenInfo: MitoTokenInfo | undefined;
    };
    static mitoIDOSubscriptionResponseToIDOSubscription(response: MitoApi.GetIDOSubscriptionResponse): {
        subscription: MitoIDOSubscription | undefined;
    };
    static mitoIDOActivitiesResponseToIDOActivities(response: MitoApi.GetIDOActivitiesResponse): {
        activities: MitoIDOSubscriptionActivity[];
        pagination: MitoPagination | undefined;
    };
    static mitoWhitelistAccountResponseToWhitelistAccount(response: MitoApi.GetWhitelistResponse): {
        idoAddress: string | undefined;
        accounts: MitoWhitelistAccount[];
        pagination: MitoPagination | undefined;
    };
    static claimReferencesResponseToClaimReferences(response: any): {
        claimReferences: MitoClaimReference[];
        pagination?: MitoPagination;
    };
}
