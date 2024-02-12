import { UnspecifiedErrorCode, GrpcUnaryRequestException, IndexerErrorModule, } from '@injectivelabs/exceptions';
import { InjectiveDmmRpc } from '@injectivelabs/dmm-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { DmmGrpcTransformer } from './transformers';
export class DmmGrpcApi extends BaseGrpcConsumer {
    module = IndexerErrorModule.Dmm;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveDmmRpc.InjectiveDmmV2RPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchEpochs(status) {
        const request = InjectiveDmmRpc.GetEpochsRequest.create();
        if (status) {
            request.status = status;
        }
        try {
            const response = await this.retry(() => this.client.GetEpochs(request));
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
    }
    async fetchMarketRewards(epochId) {
        const request = InjectiveDmmRpc.GetMarketRewardsRequest.create();
        request.epochId = epochId.toString();
        try {
            const response = await this.retry(() => this.client.GetMarketRewards(request));
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
    }
    async fetchEligibleAddresses({ epochId, page, }) {
        const request = InjectiveDmmRpc.GetEligibleAddressesRequest.create();
        InjectiveDmmRpc.GetRewardsDistributionRequest;
        request.epochId = epochId;
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetEligibleAddresses(request));
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
    }
    async fetchEpochScores({ epochId, page, }) {
        const request = InjectiveDmmRpc.GetEpochScoresRequest.create();
        request.epochId = epochId;
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetEpochScores(request));
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
    }
    async fetchEpochScoresHistory({ epochId, accountAddress, page, }) {
        const request = InjectiveDmmRpc.GetEpochScoresHistoryRequest.create();
        request.epochId = epochId;
        request.accountAddress = accountAddress;
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetEpochScoresHistory(request));
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
    }
    async fetchTotalScores({ epochId, marketId, page, }) {
        const request = InjectiveDmmRpc.GetTotalScoresRequest.create();
        request.epochId = epochId;
        request.marketId = marketId;
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetTotalScores(request));
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
    }
    async fetchTotalScoresHistory({ epochId, marketId, accountAddress, page, }) {
        const request = InjectiveDmmRpc.GetTotalScoresHistoryRequest.create();
        request.epochId = epochId;
        request.marketId = marketId;
        request.accountAddress = accountAddress;
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetTotalScoresHistory(request));
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
    }
    async fetchRewardsDistribution({ epochId, height, page, }) {
        const request = InjectiveDmmRpc.GetRewardsDistributionRequest.create();
        request.epochId = epochId;
        if (height) {
            request.height = height;
        }
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetRewardsDistribution(request));
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
    }
    async fetchAccountVolumes({ epochId, accountAddress, }) {
        const request = InjectiveDmmRpc.GetAccountVolumesRequest.create();
        request.epochId = epochId;
        request.accountAddress = accountAddress;
        try {
            const response = await this.retry(() => this.client.GetAccountVolumes(request));
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
    }
    async fetchRewardsEligibility({ epochId, accountAddress, }) {
        const request = InjectiveDmmRpc.GetRewardsEligibilityRequest.create();
        if (epochId) {
            request.epochId = epochId;
        }
        if (accountAddress) {
            request.accountAddress = accountAddress;
        }
        try {
            const response = await this.retry(() => this.client.GetRewardsEligibility(request));
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
    }
}
