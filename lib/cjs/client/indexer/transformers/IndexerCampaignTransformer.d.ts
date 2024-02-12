import { Coin } from "@injectivelabs/ts-types";
import { InjectiveCampaignRpc } from "@injectivelabs/indexer-proto-ts";
import { Guild, Campaign, GuildMember, CampaignUser, GuildCampaignSummary } from "../types/campaign";
import { GrpcCoin } from "../../../types";
export declare class IndexerCampaignTransformer {
    static GrpcCoinToCoin(coin: GrpcCoin): Coin;
    static GrpcCampaignUserToCampaignUser(campaignUser: InjectiveCampaignRpc.CampaignUser): CampaignUser;
    static GrpcCampaignToCampaign(campaign: InjectiveCampaignRpc.Campaign): Campaign;
    static GrpcGuildToGuild(guild: InjectiveCampaignRpc.Guild): Guild;
    static GrpcGuildMemberToGuildMember(member: InjectiveCampaignRpc.GuildMember): GuildMember;
    static GrpcGuildCampaignSummaryToGuildCampaignSummary(campaignSummary: InjectiveCampaignRpc.CampaignSummary): GuildCampaignSummary;
    static CampaignResponseToCampaign(response: InjectiveCampaignRpc.RankingResponse): {
        campaign: Campaign | undefined;
        users: CampaignUser[];
        paging: import("../../../types").ExchangePagination;
    };
    static RoundsResponseToRounds(response: InjectiveCampaignRpc.CampaignsResponse): {
        campaigns: Campaign[];
        accumulatedRewards: InjectiveCampaignRpc.Coin[];
        rewardCount: string;
    };
    static GuildsResponseToGuilds(response: InjectiveCampaignRpc.ListGuildsResponse): {
        guilds: Guild[];
        paging: import("../../../types").ExchangePagination;
        updatedAt: number;
        summary: GuildCampaignSummary | undefined;
    };
    static GuildMemberResponseToGuildMember(response: InjectiveCampaignRpc.GetGuildMemberResponse): {
        info: GuildMember | undefined;
    };
    static GuildMembersResponseToGuildMembers(response: InjectiveCampaignRpc.ListGuildMembersResponse): {
        members: GuildMember[];
        paging: import("../../../types").ExchangePagination;
        guildInfo: Guild | undefined;
    };
}
