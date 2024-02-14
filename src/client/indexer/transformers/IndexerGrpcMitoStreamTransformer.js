"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcMitoStreamTransformer = void 0;
const IndexerGrpcMitoTransformer_1 = require("./IndexerGrpcMitoTransformer");
/**
 * @category Indexer Stream Transformer
 */
class IndexerGrpcMitoStreamTransformer {
}
exports.IndexerGrpcMitoStreamTransformer = IndexerGrpcMitoStreamTransformer;
IndexerGrpcMitoStreamTransformer.transfersStreamCallback = (response) => ({
    transfer: response.data
        ? IndexerGrpcMitoTransformer_1.IndexerGrpcMitoTransformer.mitoTransferHistoryToTransferHistory(response.data)
        : undefined,
    opType: response.opType,
});
IndexerGrpcMitoStreamTransformer.vaultStreamCallback = (response) => ({
    vault: response.data
        ? IndexerGrpcMitoTransformer_1.IndexerGrpcMitoTransformer.mitoVaultToVault(response.data)
        : undefined,
    opType: response.opType,
});
IndexerGrpcMitoStreamTransformer.vaultHolderSubscriptionStreamCallback = (response) => ({
    subscription: response.data
        ? IndexerGrpcMitoTransformer_1.IndexerGrpcMitoTransformer.mitoSubscriptionToSubscription(response.data)
        : undefined,
    opType: response.opType,
});
IndexerGrpcMitoStreamTransformer.stakingRewardByAccountStreamCallback = (response) => ({
    stakingReward: response.data
        ? IndexerGrpcMitoTransformer_1.IndexerGrpcMitoTransformer.mitoStakingRewardToStakingReward(response.data)
        : undefined,
    opType: response.opType,
});
IndexerGrpcMitoStreamTransformer.historicalStakingStreamCallback = (response) => ({
    historicalStaking: response.data
        ? IndexerGrpcMitoTransformer_1.IndexerGrpcMitoTransformer.mitoStakingActivityToStakingActivity(response.data)
        : undefined,
    opType: response.opType,
});
