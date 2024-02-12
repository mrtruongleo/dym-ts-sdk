var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UnspecifiedErrorCode, GrpcUnaryRequestException, IndexerErrorModule, } from '@injectivelabs/exceptions';
import { InjectiveDmmRpc } from '@injectivelabs/dmm-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { DmmGrpcTransformer } from './transformers';
export class DmmGrpcApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = IndexerErrorModule.Dmm;
        this.client = new InjectiveDmmRpc.InjectiveDmmV2RPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchEpochs(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveDmmRpc.GetEpochsRequest.create();
            if (status) {
                request.status = status;
            }
            try {
                const response = yield this.retry(() => this.client.GetEpochs(request));
                return DmmGrpcTransformer.epochsResponseToEpochs(response);
            }
            catch (e) {
                if (e instanceof InjectiveDmmRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetEpochs',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GetEpochs',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchMarketRewards(epochId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveDmmRpc.GetMarketRewardsRequest.create();
            request.epochId = epochId.toString();
            try {
                const response = yield this.retry(() => this.client.GetMarketRewards(request));
                return DmmGrpcTransformer.marketRewardsResponseToMarketRewards(response);
            }
            catch (e) {
                if (e instanceof InjectiveDmmRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetMarketRewards',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GetMarketRewards',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchEligibleAddresses({ epochId, page, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveDmmRpc.GetEligibleAddressesRequest.create();
            InjectiveDmmRpc.GetRewardsDistributionRequest;
            request.epochId = epochId;
            if (page) {
                request.page = page;
            }
            try {
                const response = yield this.retry(() => this.client.GetEligibleAddresses(request));
                return DmmGrpcTransformer.eligibleAddressesResponseToEligibleAddresses(response);
            }
            catch (e) {
                if (e instanceof InjectiveDmmRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetEligibleAddresses',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GetEligibleAddresses',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchEpochScores({ epochId, page, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveDmmRpc.GetEpochScoresRequest.create();
            request.epochId = epochId;
            if (page) {
                request.page = page;
            }
            try {
                const response = yield this.retry(() => this.client.GetEpochScores(request));
                return DmmGrpcTransformer.epochScoresResponseToEpochScores(response);
            }
            catch (e) {
                if (e instanceof InjectiveDmmRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetEpochScores',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GetEpochScores',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchEpochScoresHistory({ epochId, accountAddress, page, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveDmmRpc.GetEpochScoresHistoryRequest.create();
            request.epochId = epochId;
            request.accountAddress = accountAddress;
            if (page) {
                request.page = page;
            }
            try {
                const response = yield this.retry(() => this.client.GetEpochScoresHistory(request));
                return DmmGrpcTransformer.epochScoresHistoryResponseToEpochScoresHistory(response);
            }
            catch (e) {
                if (e instanceof InjectiveDmmRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetEpochScoresHistory',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GetEpochScoresHistory',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchTotalScores({ epochId, marketId, page, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveDmmRpc.GetTotalScoresRequest.create();
            request.epochId = epochId;
            request.marketId = marketId;
            if (page) {
                request.page = page;
            }
            try {
                const response = yield this.retry(() => this.client.GetTotalScores(request));
                return DmmGrpcTransformer.totalScoresResponseToTotalScores(response);
            }
            catch (e) {
                if (e instanceof InjectiveDmmRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetTotalScores',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GetTotalScores',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchTotalScoresHistory({ epochId, marketId, accountAddress, page, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveDmmRpc.GetTotalScoresHistoryRequest.create();
            request.epochId = epochId;
            request.marketId = marketId;
            request.accountAddress = accountAddress;
            if (page) {
                request.page = page;
            }
            try {
                const response = yield this.retry(() => this.client.GetTotalScoresHistory(request));
                return DmmGrpcTransformer.totalScoresHistoryResponseToTotalScoresHistory(response);
            }
            catch (e) {
                if (e instanceof InjectiveDmmRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetTotalScoresHistory',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GetTotalScoresHistory',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchRewardsDistribution({ epochId, height, page, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveDmmRpc.GetRewardsDistributionRequest.create();
            request.epochId = epochId;
            if (height) {
                request.height = height;
            }
            if (page) {
                request.page = page;
            }
            try {
                const response = yield this.retry(() => this.client.GetRewardsDistribution(request));
                return DmmGrpcTransformer.rewardsDistributionResponseToRewardsDistribution(response);
            }
            catch (e) {
                if (e instanceof InjectiveDmmRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetRewardsDistribution',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GetRewardsDistribution',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchAccountVolumes({ epochId, accountAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveDmmRpc.GetAccountVolumesRequest.create();
            request.epochId = epochId;
            request.accountAddress = accountAddress;
            try {
                const response = yield this.retry(() => this.client.GetAccountVolumes(request));
                return DmmGrpcTransformer.accountVolumesResponseToAccountVolumes(response);
            }
            catch (e) {
                if (e instanceof InjectiveDmmRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetAccountVolumes',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GetAccountVolumes',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchRewardsEligibility({ epochId, accountAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveDmmRpc.GetRewardsEligibilityRequest.create();
            if (epochId) {
                request.epochId = epochId;
            }
            if (accountAddress) {
                request.accountAddress = accountAddress;
            }
            try {
                const response = yield this.retry(() => this.client.GetRewardsEligibility(request));
                return DmmGrpcTransformer.rewardsEligibilityResponseToRewardsEligibility(response);
            }
            catch (e) {
                if (e instanceof InjectiveDmmRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GetRewardsEligibility',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GetRewardsEligibility',
                    contextModule: this.module,
                });
            }
        });
    }
}
