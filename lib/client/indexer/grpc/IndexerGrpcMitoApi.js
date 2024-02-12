var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UnspecifiedErrorCode, GrpcUnaryRequestException, } from "@injectivelabs/exceptions";
import { MitoApi } from "@injectivelabs/mito-proto-ts";
import { InjectiveMetaRpc } from "@injectivelabs/indexer-proto-ts";
import BaseGrpcConsumer from "../../base/BaseIndexerGrpcConsumer";
import { IndexerModule } from "../types";
import { IndexerGrpcMitoTransformer } from "../transformers";
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcMitoApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = IndexerModule.Mito;
        this.client = new MitoApi.MitoAPIClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchVault({ contractAddress, slug, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.GetVaultRequest.create();
            if (slug) {
                request.slug = slug;
            }
            if (contractAddress) {
                request.contractAddress = contractAddress;
            }
            try {
                const response = yield this.retry(() => this.client.GetVault(request));
                return IndexerGrpcMitoTransformer.vaultResponseToVault(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "GetVault",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "GetVault",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchVaults({ limit, codeId, pageIndex, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.GetVaultsRequest.create();
            if (codeId) {
                request.codeId = codeId;
            }
            if (limit) {
                request.limit = limit;
            }
            if (pageIndex) {
                request.pageIndex = pageIndex;
            }
            try {
                const response = yield this.retry(() => this.client.GetVaults(request));
                return IndexerGrpcMitoTransformer.vaultsResponseToVaults(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "GetVaults",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "GetVaults",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchLpTokenPriceChart({ to, from, vaultAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.LPTokenPriceChartRequest.create();
            request.vaultAddress = vaultAddress;
            if (from) {
                request.fromTime = from;
            }
            if (to) {
                request.toTime = to;
            }
            try {
                const response = yield this.retry(() => this.client.LPTokenPriceChart(request));
                return IndexerGrpcMitoTransformer.lpTokenPriceChartResponseToLPTokenPriceChart(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "LPTokenPriceChart",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "LPTokenPriceChart",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchTVLChartRequest({ to, from, vaultAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.TVLChartRequest.create();
            request.vaultAddress = vaultAddress;
            if (to) {
                request.toTime = to;
            }
            if (from) {
                request.fromTime = from;
            }
            try {
                const response = yield this.retry(() => this.client.TVLChart(request));
                return IndexerGrpcMitoTransformer.lpTokenPriceChartResponseToLPTokenPriceChart(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "TVLChart",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "TVLChart",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchVaultsByHolderAddress({ skip, limit, holderAddress, vaultAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.VaultsByHolderAddressRequest.create();
            request.holderAddress = holderAddress;
            if (vaultAddress) {
                request.vaultAddress = vaultAddress;
            }
            if (skip) {
                request.skip = skip;
            }
            if (limit) {
                request.limit = limit;
            }
            try {
                const response = yield this.retry(() => this.client.VaultsByHolderAddress(request));
                return IndexerGrpcMitoTransformer.vaultsByHolderAddressResponseToVaultsByHolderAddress(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "VaultsByHolderAddress",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "VaultsByHolderAddress",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchLPHolders({ skip, limit, vaultAddress, stakingContractAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.LPHoldersRequest.create();
            request.vaultAddress = vaultAddress;
            request.stakingContractAddress = stakingContractAddress;
            if (skip) {
                request.skip = skip;
            }
            if (limit) {
                request.limit = limit;
            }
            try {
                const response = yield this.retry(() => this.client.LPHolders(request));
                return IndexerGrpcMitoTransformer.lpHoldersResponseToLPHolders(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "LPHolders",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "LPHolders",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchHolderPortfolio({ holderAddress, stakingContractAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.PortfolioRequest.create();
            request.holderAddress = holderAddress;
            request.stakingContractAddress = stakingContractAddress;
            try {
                const response = yield this.retry(() => this.client.Portfolio(request));
                return IndexerGrpcMitoTransformer.portfolioResponseToPortfolio(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "Portfolio",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "Portfolio",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchLeaderboard(epochId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.LeaderboardRequest.create();
            if (epochId) {
                request.epochId = epochId;
            }
            try {
                const response = yield this.retry(() => this.client.Leaderboard(request));
                return IndexerGrpcMitoTransformer.leaderboardResponseToLeaderboard(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "Leaderboard",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "Leaderboard",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchTransferHistory({ vault, account, limit, toNumber, fromNumber, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.TransfersHistoryRequest.create();
            if (vault) {
                request.vault = vault;
            }
            if (account) {
                request.account = account;
            }
            if (limit) {
                request.limit = limit;
            }
            if (toNumber) {
                request.toNumber = toNumber;
            }
            if (fromNumber) {
                request.fromNumber = fromNumber;
            }
            try {
                const response = yield this.retry(() => this.client.TransfersHistory(request));
                return IndexerGrpcMitoTransformer.transferHistoryResponseToTransfer(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "TransfersHistory",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "TransfersHistory",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchLeaderboardEpochs({ limit, toEpochId, fromEpochId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.LeaderboardEpochsRequest.create();
            if (limit) {
                request.limit = limit;
            }
            if (toEpochId) {
                request.toEpochId = toEpochId;
            }
            if (fromEpochId) {
                request.fromEpochId = fromEpochId;
            }
            try {
                const response = yield this.retry(() => this.client.LeaderboardEpochs(request));
                return IndexerGrpcMitoTransformer.leaderboardEpochsResponseToLeaderboardEpochs(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "LeaderboardEpochs",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "LeaderboardEpochs",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchStakingPools({ staker, stakingContractAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.GetStakingPoolsRequest.create();
            request.stakingContractAddress = stakingContractAddress;
            if (staker) {
                request.staker = staker;
            }
            try {
                const response = yield this.retry(() => this.client.GetStakingPools(request));
                return IndexerGrpcMitoTransformer.stakingPoolsResponseToStakingPools(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "GetStakingPools",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "GetStakingPools",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchStakingHistory({ staker, toNumber, limit, fromNumber, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.StakingHistoryRequest.create();
            if (limit) {
                request.limit = limit;
            }
            if (staker) {
                request.staker = staker;
            }
            if (toNumber) {
                request.toNumber = toNumber;
            }
            if (fromNumber) {
                request.fromNumber = fromNumber;
            }
            try {
                const response = yield this.retry(() => this.client.StakingHistory(request));
                return IndexerGrpcMitoTransformer.mitoStakingHistoryResponseTpStakingHistory(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "StakingHistory",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "StakingHistory",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchStakingRewardsByAccount({ staker, stakingContractAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.StakingRewardByAccountRequest.create();
            request.staker = staker;
            request.stakingContractAddress = stakingContractAddress;
            try {
                const response = yield this.retry(() => this.client.StakingRewardByAccount(request));
                return IndexerGrpcMitoTransformer.stakingRewardByAccountResponseToStakingRewardByAccount(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "StakingReward",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "StakingReward",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchMissions({ accountAddress }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.MissionsRequest.create();
            request.accountAddress = accountAddress;
            try {
                const response = yield this.retry(() => this.client.Missions(request));
                return IndexerGrpcMitoTransformer.mitoMissionsResponseMissions(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "Missions",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "Missions",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchMissionLeaderboard(userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.MissionLeaderboardRequest.create();
            if (userAddress) {
                request.userAddress = userAddress;
            }
            try {
                const response = yield this.retry(() => this.client.MissionLeaderboard(request));
                return IndexerGrpcMitoTransformer.mitoMissionLeaderboardResponseToMissionLeaderboard(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "MissionLeaderboard",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "MissionLeaderboard",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchIDO({ contractAddress, accountAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.GetIDORequest.create();
            request.contractAddress = contractAddress;
            if (accountAddress) {
                request.accountAddress = accountAddress;
            }
            try {
                const response = yield this.retry(() => this.client.GetIDO(request));
                return IndexerGrpcMitoTransformer.mitoIDOResponseToIDO(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "GetIDO",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "GetIdo",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchIDOs({ status, limit, toNumber, accountAddress, ownerAddress, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.ListIDOsRequest.create();
            if (status) {
                request.status = status;
            }
            if (limit) {
                request.limit = limit;
            }
            if (toNumber) {
                request.toNumber = toNumber;
            }
            if (accountAddress) {
                request.accountAddress = accountAddress;
            }
            if (ownerAddress) {
                request.ownerAddress = ownerAddress;
            }
            try {
                const response = yield this.retry(() => this.client.ListIDOs(request));
                return IndexerGrpcMitoTransformer.mitoListIDOsResponseToIDOs(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "ListIDOs",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "ListIDOs",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchIDOSubscribers({ skip, limit, sortBy, contractAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.GetIDOSubscribersRequest.create();
            request.contractAddress = contractAddress;
            if (limit) {
                request.limit = limit;
            }
            if (skip) {
                request.skip = skip;
            }
            if (sortBy) {
                request.sortBy = sortBy;
            }
            try {
                const response = yield this.retry(() => this.client.GetIDOSubscribers(request));
                return IndexerGrpcMitoTransformer.mitoIDOSubscribersResponseToIDOSubscribers(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "GetIDOSubscribers",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "GetIDOSubscribers",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchIDOSubscription({ contractAddress, accountAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.GetIDOSubscriptionRequest.create();
            request.accountAddress = accountAddress;
            request.contractAddress = contractAddress;
            try {
                const response = yield this.retry(() => this.client.GetIDOSubscription(request));
                return IndexerGrpcMitoTransformer.mitoIDOSubscriptionResponseToIDOSubscription(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "GetIDOSubscription",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "GetIDOSubscription",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchIDOActivities({ contractAddress, accountAddress, limit, toNumber, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.GetIDOActivitiesRequest.create();
            if (contractAddress) {
                request.contractAddress = contractAddress;
            }
            if (accountAddress) {
                request.accountAddress = accountAddress;
            }
            if (limit) {
                request.limit = limit;
            }
            if (toNumber) {
                request.toNumber = toNumber;
            }
            try {
                const response = yield this.retry(() => this.client.GetIDOActivities(request));
                return IndexerGrpcMitoTransformer.mitoIDOActivitiesResponseToIDOActivities(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "GetIDOActivities",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "GetIDOActivities",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchIDOWhitelist({ skip, limit, idoAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = MitoApi.GetWhitelistRequest.create();
            request.idoAddress = idoAddress;
            if (skip) {
                request.skip = skip;
            }
            if (limit) {
                request.limit = limit;
            }
            try {
                const response = yield this.retry(() => this.client.GetWhitelist(request));
                return IndexerGrpcMitoTransformer.mitoWhitelistAccountResponseToWhitelistAccount(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "GetWhitelist",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "GetWhitelist",
                    contextModule: this.module,
                });
            }
        });
    }
}
