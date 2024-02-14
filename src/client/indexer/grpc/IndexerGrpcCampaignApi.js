"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcCampaignApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const indexer_proto_ts_2 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const transformers_1 = require("../transformers");
const types_1 = require("../types");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcCampaignApi extends BaseIndexerGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.IndexerModule.Campaign;
        this.client = new indexer_proto_ts_2.InjectiveCampaignRpc.InjectiveCampaignRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchCampaign({ skip, limit, marketId, campaignId, accountAddress, contractAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_2.InjectiveCampaignRpc.RankingRequest.create();
            request.campaignId = campaignId;
            if (skip) {
                request.skip = skip;
            }
            if (limit) {
                request.limit = limit;
            }
            if (marketId) {
                request.marketId = marketId;
            }
            if (accountAddress) {
                request.accountAddress = accountAddress;
            }
            if (contractAddress) {
                //request.contractAddress = contractAddress
            }
            try {
                const response = yield this.retry(() => this.client.Ranking(request));
                return transformers_1.IndexerCampaignTransformer.CampaignResponseToCampaign(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "FetchCampaign",
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: "FetchCampaign",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchRound({ roundId, toRoundId, accountAddress, contractAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_2.InjectiveCampaignRpc.CampaignsRequest.create();
            if (roundId) {
                request.roundId = roundId;
            }
            if (accountAddress) {
                request.accountAddress = accountAddress;
            }
            if (toRoundId) {
                request.toRoundId = toRoundId;
            }
            if (contractAddress) {
                //request.contractAddress = contractAddress
            }
            try {
                const response = yield this.retry(() => this.client.Campaigns(request));
                return transformers_1.IndexerCampaignTransformer.RoundsResponseToRounds(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_2.InjectiveCampaignRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "Campaigns",
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: "Campaigns",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchGuilds({ skip, limit, sortBy, campaignContract, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_2.InjectiveCampaignRpc.ListGuildsRequest.create();
            request.sortBy = sortBy;
            request.campaignContract = campaignContract;
            if (skip) {
                request.skip = skip;
            }
            if (limit) {
                request.limit = limit;
            }
            try {
                const response = yield this.retry(() => this.client.ListGuilds(request));
                return transformers_1.IndexerCampaignTransformer.GuildsResponseToGuilds(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "FetchGuilds",
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: "FetchGuilds",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchGuildMember({ address, campaignContract, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_2.InjectiveCampaignRpc.GetGuildMemberRequest.create();
            request.address = address;
            request.campaignContract = campaignContract;
            try {
                const response = yield this.retry(() => this.client.GetGuildMember(request));
                return transformers_1.IndexerCampaignTransformer.GuildMemberResponseToGuildMember(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "FetchGuildMember",
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: "FetchGuildMember",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchGuildMembers({ skip, limit, sortBy, guildId, campaignContract, includeGuildInfo, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_2.InjectiveCampaignRpc.ListGuildMembersRequest.create();
            request.guildId = guildId;
            request.campaignContract = campaignContract;
            request.includeGuildInfo = includeGuildInfo;
            if (sortBy) {
                request.sortBy = sortBy;
            }
            if (skip) {
                request.skip = skip;
            }
            if (limit) {
                request.limit = limit;
            }
            try {
                const response = yield this.retry(() => this.client.ListGuildMembers(request));
                return transformers_1.IndexerCampaignTransformer.GuildMembersResponseToGuildMembers(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "FetchGuildMembers",
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: "FetchGuildMembers",
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.IndexerGrpcCampaignApi = IndexerGrpcCampaignApi;
