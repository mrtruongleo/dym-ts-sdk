"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmmGrpcApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const dmm_proto_ts_1 = require("@injectivelabs/dmm-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const transformers_1 = require("./transformers");
class DmmGrpcApi extends BaseGrpcConsumer_1.default {
    module = exceptions_1.IndexerErrorModule.Dmm;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new dmm_proto_ts_1.InjectiveDmmRpc.InjectiveDmmV2RPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchEpochs(status) {
        const request = dmm_proto_ts_1.InjectiveDmmRpc.GetEpochsRequest.create();
        if (status) {
            request.status = status;
        }
        try {
            const response = await this.retry(() => this.client.GetEpochs(request));
            return transformers_1.DmmGrpcTransformer.epochsResponseToEpochs(response);
        }
        catch (e) {
            if (e instanceof dmm_proto_ts_1.InjectiveDmmRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetEpochs',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GetEpochs',
                contextModule: this.module,
            });
        }
    }
    async fetchMarketRewards(epochId) {
        const request = dmm_proto_ts_1.InjectiveDmmRpc.GetMarketRewardsRequest.create();
        request.epochId = epochId.toString();
        try {
            const response = await this.retry(() => this.client.GetMarketRewards(request));
            return transformers_1.DmmGrpcTransformer.marketRewardsResponseToMarketRewards(response);
        }
        catch (e) {
            if (e instanceof dmm_proto_ts_1.InjectiveDmmRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetMarketRewards',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GetMarketRewards',
                contextModule: this.module,
            });
        }
    }
    async fetchEligibleAddresses({ epochId, page, }) {
        const request = dmm_proto_ts_1.InjectiveDmmRpc.GetEligibleAddressesRequest.create();
        dmm_proto_ts_1.InjectiveDmmRpc.GetRewardsDistributionRequest;
        request.epochId = epochId;
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetEligibleAddresses(request));
            return transformers_1.DmmGrpcTransformer.eligibleAddressesResponseToEligibleAddresses(response);
        }
        catch (e) {
            if (e instanceof dmm_proto_ts_1.InjectiveDmmRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetEligibleAddresses',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GetEligibleAddresses',
                contextModule: this.module,
            });
        }
    }
    async fetchEpochScores({ epochId, page, }) {
        const request = dmm_proto_ts_1.InjectiveDmmRpc.GetEpochScoresRequest.create();
        request.epochId = epochId;
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetEpochScores(request));
            return transformers_1.DmmGrpcTransformer.epochScoresResponseToEpochScores(response);
        }
        catch (e) {
            if (e instanceof dmm_proto_ts_1.InjectiveDmmRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetEpochScores',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GetEpochScores',
                contextModule: this.module,
            });
        }
    }
    async fetchEpochScoresHistory({ epochId, accountAddress, page, }) {
        const request = dmm_proto_ts_1.InjectiveDmmRpc.GetEpochScoresHistoryRequest.create();
        request.epochId = epochId;
        request.accountAddress = accountAddress;
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetEpochScoresHistory(request));
            return transformers_1.DmmGrpcTransformer.epochScoresHistoryResponseToEpochScoresHistory(response);
        }
        catch (e) {
            if (e instanceof dmm_proto_ts_1.InjectiveDmmRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetEpochScoresHistory',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GetEpochScoresHistory',
                contextModule: this.module,
            });
        }
    }
    async fetchTotalScores({ epochId, marketId, page, }) {
        const request = dmm_proto_ts_1.InjectiveDmmRpc.GetTotalScoresRequest.create();
        request.epochId = epochId;
        request.marketId = marketId;
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetTotalScores(request));
            return transformers_1.DmmGrpcTransformer.totalScoresResponseToTotalScores(response);
        }
        catch (e) {
            if (e instanceof dmm_proto_ts_1.InjectiveDmmRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetTotalScores',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GetTotalScores',
                contextModule: this.module,
            });
        }
    }
    async fetchTotalScoresHistory({ epochId, marketId, accountAddress, page, }) {
        const request = dmm_proto_ts_1.InjectiveDmmRpc.GetTotalScoresHistoryRequest.create();
        request.epochId = epochId;
        request.marketId = marketId;
        request.accountAddress = accountAddress;
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetTotalScoresHistory(request));
            return transformers_1.DmmGrpcTransformer.totalScoresHistoryResponseToTotalScoresHistory(response);
        }
        catch (e) {
            if (e instanceof dmm_proto_ts_1.InjectiveDmmRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetTotalScoresHistory',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GetTotalScoresHistory',
                contextModule: this.module,
            });
        }
    }
    async fetchRewardsDistribution({ epochId, height, page, }) {
        const request = dmm_proto_ts_1.InjectiveDmmRpc.GetRewardsDistributionRequest.create();
        request.epochId = epochId;
        if (height) {
            request.height = height;
        }
        if (page) {
            request.page = page;
        }
        try {
            const response = await this.retry(() => this.client.GetRewardsDistribution(request));
            return transformers_1.DmmGrpcTransformer.rewardsDistributionResponseToRewardsDistribution(response);
        }
        catch (e) {
            if (e instanceof dmm_proto_ts_1.InjectiveDmmRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetRewardsDistribution',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GetRewardsDistribution',
                contextModule: this.module,
            });
        }
    }
    async fetchAccountVolumes({ epochId, accountAddress, }) {
        const request = dmm_proto_ts_1.InjectiveDmmRpc.GetAccountVolumesRequest.create();
        request.epochId = epochId;
        request.accountAddress = accountAddress;
        try {
            const response = await this.retry(() => this.client.GetAccountVolumes(request));
            return transformers_1.DmmGrpcTransformer.accountVolumesResponseToAccountVolumes(response);
        }
        catch (e) {
            if (e instanceof dmm_proto_ts_1.InjectiveDmmRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetAccountVolumes',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GetAccountVolumes',
                contextModule: this.module,
            });
        }
    }
    async fetchRewardsEligibility({ epochId, accountAddress, }) {
        const request = dmm_proto_ts_1.InjectiveDmmRpc.GetRewardsEligibilityRequest.create();
        if (epochId) {
            request.epochId = epochId;
        }
        if (accountAddress) {
            request.accountAddress = accountAddress;
        }
        try {
            const response = await this.retry(() => this.client.GetRewardsEligibility(request));
            return transformers_1.DmmGrpcTransformer.rewardsEligibilityResponseToRewardsEligibility(response);
        }
        catch (e) {
            if (e instanceof dmm_proto_ts_1.InjectiveDmmRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetRewardsEligibility',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GetRewardsEligibility',
                contextModule: this.module,
            });
        }
    }
}
exports.DmmGrpcApi = DmmGrpcApi;
//# sourceMappingURL=DmmGrpcApi.js.map