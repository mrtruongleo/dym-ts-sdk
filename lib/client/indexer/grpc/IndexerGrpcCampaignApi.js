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
    module = IndexerModule.Campaign;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveCampaignRpc.InjectiveCampaignRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchCampaign({ skip, limit, marketId, campaignId, accountAddress, contractAddress, }) {
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
            const response = await this.retry(() => this.client.Ranking(request));
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
    }
    async fetchRound({ roundId, toRoundId, accountAddress, contractAddress, }) {
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
            const response = await this.retry(() => this.client.Campaigns(request));
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
    }
    async fetchGuilds({ skip, limit, sortBy, campaignContract, }) {
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
            const response = await this.retry(() => this.client.ListGuilds(request));
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
    }
    async fetchGuildMember({ address, campaignContract, }) {
        const request = InjectiveCampaignRpc.GetGuildMemberRequest.create();
        request.address = address;
        request.campaignContract = campaignContract;
        try {
            const response = await this.retry(() => this.client.GetGuildMember(request));
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
    }
    async fetchGuildMembers({ skip, limit, sortBy, guildId, campaignContract, includeGuildInfo, }) {
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
            const response = await this.retry(() => this.client.ListGuildMembers(request));
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
    }
}
