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
import { InjectiveMetaRpc } from "@injectivelabs/indexer-proto-ts";
import { InjectiveCampaignRpc } from "@injectivelabs/indexer-proto-ts";
import BaseGrpcConsumer from "../../base/BaseIndexerGrpcConsumer";
import { IndexerCampaignTransformer } from "../transformers";
import { IndexerModule } from "../types";
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcCampaignApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = IndexerModule.Campaign;
        this.client = new InjectiveCampaignRpc.InjectiveCampaignRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchCampaign({ skip, limit, marketId, campaignId, accountAddress, contractAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveCampaignRpc.RankingRequest.create();
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
                return IndexerCampaignTransformer.CampaignResponseToCampaign(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "FetchCampaign",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "FetchCampaign",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchRound({ roundId, toRoundId, accountAddress, contractAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveCampaignRpc.CampaignsRequest.create();
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
                return IndexerCampaignTransformer.RoundsResponseToRounds(response);
            }
            catch (e) {
                if (e instanceof InjectiveCampaignRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "Campaigns",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "Campaigns",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchGuilds({ skip, limit, sortBy, campaignContract, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveCampaignRpc.ListGuildsRequest.create();
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
                return IndexerCampaignTransformer.GuildsResponseToGuilds(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "FetchGuilds",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "FetchGuilds",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchGuildMember({ address, campaignContract, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveCampaignRpc.GetGuildMemberRequest.create();
            request.address = address;
            request.campaignContract = campaignContract;
            try {
                const response = yield this.retry(() => this.client.GetGuildMember(request));
                return IndexerCampaignTransformer.GuildMemberResponseToGuildMember(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "FetchGuildMember",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "FetchGuildMember",
                    contextModule: this.module,
                });
            }
        });
    }
    fetchGuildMembers({ skip, limit, sortBy, guildId, campaignContract, includeGuildInfo, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveCampaignRpc.ListGuildMembersRequest.create();
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
                return IndexerCampaignTransformer.GuildMembersResponseToGuildMembers(response);
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: "FetchGuildMembers",
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: "FetchGuildMembers",
                    contextModule: this.module,
                });
            }
        });
    }
}
