"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcMitoStream = void 0;
const transformers_1 = require("../transformers");
const BaseIndexerGrpcWebConsumer_1 = require("../../base/BaseIndexerGrpcWebConsumer");
const mito_proto_ts_1 = require("@injectivelabs/mito-proto-ts");
/**
 * @category Indexer Grpc Stream
 */
class IndexerGrpcMitoStream {
    constructor(endpoint) {
        this.client = new mito_proto_ts_1.MitoApi.MitoAPIClientImpl((0, BaseIndexerGrpcWebConsumer_1.getGrpcIndexerWebImpl)(endpoint));
    }
    streamTransfers({ vault, account, callback, onEndCallback, onStatusCallback, }) {
        const request = mito_proto_ts_1.MitoApi.StreamTransfersRequest.create();
        if (vault) {
            request.vault = vault;
        }
        if (account) {
            request.account = account;
        }
        const subscription = this.client.StreamTransfers(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerGrpcMitoStreamTransformer.transfersStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamVault({ vault, callback, onEndCallback, onStatusCallback, }) {
        const request = mito_proto_ts_1.MitoApi.StreamVaultRequest.create();
        if (vault) {
            request.vault = vault;
        }
        const subscription = this.client.StreamVault(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerGrpcMitoStreamTransformer.vaultStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamVaultHolderSubscriptions({ holderAddress, vaultAddress, stakingContractAddress, callback, onEndCallback, onStatusCallback, }) {
        const request = mito_proto_ts_1.MitoApi.StreamHolderSubscriptionRequest.create();
        request.holderAddress = holderAddress;
        if (vaultAddress) {
            request.vaultAddress = vaultAddress;
        }
        if (stakingContractAddress) {
            request.stakingContractAddress = stakingContractAddress;
        }
        const subscription = this.client
            .StreamHolderSubscription(request)
            .subscribe({
            next(response) {
                callback(transformers_1.IndexerGrpcMitoStreamTransformer.vaultHolderSubscriptionStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamStakingRewardsByAccount({ staker, callback, onEndCallback, onStatusCallback, stakingContractAddress, }) {
        const request = mito_proto_ts_1.MitoApi.StreamStakingRewardByAccountRequest.create();
        request.staker = staker;
        request.stakingContractAddress = stakingContractAddress;
        const subscription = this.client
            .StreamStakingRewardByAccount(request)
            .subscribe({
            next(response) {
                callback(transformers_1.IndexerGrpcMitoStreamTransformer.stakingRewardByAccountStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamHistoricalStaking({ staker, stakingContractAddress, callback, onEndCallback, onStatusCallback, }) {
        const request = mito_proto_ts_1.MitoApi.StreamHistoricalStakingRequest.create();
        request.staker = staker;
        request.stakingContractAddress = stakingContractAddress;
        const subscription = this.client
            .StreamHistoricalStaking(request)
            .subscribe({
            next(response) {
                callback(transformers_1.IndexerGrpcMitoStreamTransformer.historicalStakingStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
}
exports.IndexerGrpcMitoStream = IndexerGrpcMitoStream;
