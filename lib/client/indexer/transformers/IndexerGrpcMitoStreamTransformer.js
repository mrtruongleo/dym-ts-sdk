import { IndexerGrpcMitoTransformer } from './IndexerGrpcMitoTransformer';
/**
 * @category Indexer Stream Transformer
 */
export class IndexerGrpcMitoStreamTransformer {
}
IndexerGrpcMitoStreamTransformer.transfersStreamCallback = (response) => ({
    transfer: response.data
        ? IndexerGrpcMitoTransformer.mitoTransferHistoryToTransferHistory(response.data)
        : undefined,
    opType: response.opType,
});
IndexerGrpcMitoStreamTransformer.vaultStreamCallback = (response) => ({
    vault: response.data
        ? IndexerGrpcMitoTransformer.mitoVaultToVault(response.data)
        : undefined,
    opType: response.opType,
});
IndexerGrpcMitoStreamTransformer.vaultHolderSubscriptionStreamCallback = (response) => ({
    subscription: response.data
        ? IndexerGrpcMitoTransformer.mitoSubscriptionToSubscription(response.data)
        : undefined,
    opType: response.opType,
});
IndexerGrpcMitoStreamTransformer.stakingRewardByAccountStreamCallback = (response) => ({
    stakingReward: response.data
        ? IndexerGrpcMitoTransformer.mitoStakingRewardToStakingReward(response.data)
        : undefined,
    opType: response.opType,
});
IndexerGrpcMitoStreamTransformer.historicalStakingStreamCallback = (response) => ({
    historicalStaking: response.data
        ? IndexerGrpcMitoTransformer.mitoStakingActivityToStakingActivity(response.data)
        : undefined,
    opType: response.opType,
});
