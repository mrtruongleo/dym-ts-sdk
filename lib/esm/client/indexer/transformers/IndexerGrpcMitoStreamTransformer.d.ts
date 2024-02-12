import { MitoApi } from '@injectivelabs/mito-proto-ts';
import { StreamOperation } from '../../../types';
/**
 * @category Indexer Stream Transformer
 */
export declare class IndexerGrpcMitoStreamTransformer {
    static transfersStreamCallback: (response: MitoApi.StreamTransfersResponse) => {
        transfer: import("..").MitoTransfer | undefined;
        opType: StreamOperation;
    };
    static vaultStreamCallback: (response: MitoApi.StreamVaultResponse) => {
        vault: import("..").MitoVault | undefined;
        opType: StreamOperation;
    };
    static vaultHolderSubscriptionStreamCallback: (response: MitoApi.StreamHolderSubscriptionResponse) => {
        subscription: import("..").MitoSubscription | undefined;
        opType: StreamOperation;
    };
    static stakingRewardByAccountStreamCallback: (response: MitoApi.StreamStakingRewardByAccountResponse) => {
        stakingReward: {
            apr: number;
            vaultName: string;
            vaultAddress: string;
            lockTimestamp: number;
            claimableRewards: import("@injectivelabs/ts-types").Coin[];
            stakedAmount: import("@injectivelabs/ts-types").Coin | undefined;
            lockedAmount: import("@injectivelabs/ts-types").Coin | undefined;
        } | undefined;
        opType: StreamOperation;
    };
    static historicalStakingStreamCallback: (response: MitoApi.StreamHistoricalStakingResponse) => {
        historicalStaking: {
            action: string;
            txHash: string;
            staker: string;
            vaultAddress: string;
            numberByAccount: number;
            timestamp: number;
            rewardedTokens: import("@injectivelabs/ts-types").Coin[];
            stakeAmount: import("@injectivelabs/ts-types").Coin | undefined;
        } | undefined;
        opType: StreamOperation;
    };
}
