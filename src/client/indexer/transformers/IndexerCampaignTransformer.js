"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerCampaignTransformer = void 0;
const pagination_1 = require("../../..//utils/pagination");
class IndexerCampaignTransformer {
    static GrpcCoinToCoin(coin) {
        return {
            denom: coin.denom,
            amount: coin.amount,
        };
    }
    static GrpcCampaignUserToCampaignUser(campaignUser) {
        return {
            campaignId: campaignUser.campaignId,
            marketId: campaignUser.marketId,
            accountAddress: campaignUser.accountAddress,
            score: campaignUser.score,
            contractUpdated: campaignUser.contractUpdated,
            blockHeight: campaignUser.blockHeight,
            blockTime: parseInt(campaignUser.blockTime, 10),
            purchasedAmount: campaignUser.purchasedAmount,
            galxeUpdated: campaignUser.galxeUpdated,
        };
    }
    static GrpcCampaignToCampaign(campaign) {
        return {
            campaignId: campaign.campaignId,
            marketId: campaign.marketId,
            totalScore: campaign.totalScore,
            lastUpdated: parseInt(campaign.lastUpdated, 10),
            startDate: parseInt(campaign.startDate, 10),
            endDate: parseInt(campaign.endDate, 10),
            isClaimable: campaign.isClaimable,
            rewards: campaign.rewards,
            roundId: campaign.roundId,
            userClaimed: false, //campaign.userClaimed,
            userScore: campaign.userScore,
            rewardContract: campaign.contract,
            version: "",
        };
    }
    static GrpcGuildToGuild(guild) {
        return {
            campaignContract: guild.campaignContract,
            guildId: guild.guildId,
            masterAddress: guild.masterAddress,
            createdAt: parseInt(guild.createdAt, 10),
            tvlScore: guild.tvlScore,
            volumeScore: guild.volumeScore,
            rankByVolume: guild.rankByVolume,
            rankByTvl: guild.rankByTvl,
            logo: guild.logo,
            totalTvl: guild.totalTvl,
            updatedAt: parseInt(guild.updatedAt, 10),
            name: guild.name,
            isActive: guild.isActive,
            masterBalance: guild.masterBalance,
            description: guild.description,
        };
    }
    static GrpcGuildMemberToGuildMember(member) {
        return {
            campaignContract: member.campaignContract,
            guildId: member.guildId,
            address: member.address,
            joinedAt: parseInt(member.joinedAt, 10),
            tvlScore: member.tvlScore,
            volumeScore: member.volumeScore,
            totalTvl: member.totalTvl,
            volumeScorePercentage: member.volumeScorePercentage,
            tvlScorePercentage: member.tvlScorePercentage,
            tvlReward: member.tvlReward.map(IndexerCampaignTransformer.GrpcCoinToCoin),
            volumeReward: member.volumeReward.map(IndexerCampaignTransformer.GrpcCoinToCoin),
        };
    }
    static GrpcGuildCampaignSummaryToGuildCampaignSummary(campaignSummary) {
        return {
            campaignId: campaignSummary.campaignId,
            campaignContract: campaignSummary.campaignContract,
            totalGuildsCount: campaignSummary.totalGuildsCount,
            totalTvl: campaignSummary.totalTvl,
            totalAverageTvl: campaignSummary.totalAverageTvl,
            totalVolume: campaignSummary.totalVolume,
            updatedAt: parseInt(campaignSummary.updatedAt, 10),
            totalMembersCount: campaignSummary.totalMembersCount,
            startTime: parseInt(campaignSummary.startTime, 10),
            endTime: parseInt(campaignSummary.endTime, 10),
        };
    }
    static CampaignResponseToCampaign(response) {
        return {
            campaign: response.campaign
                ? IndexerCampaignTransformer.GrpcCampaignToCampaign(response.campaign)
                : undefined,
            users: response.users.map(IndexerCampaignTransformer.GrpcCampaignUserToCampaignUser),
            paging: (0, pagination_1.grpcPagingToPaging)(response.paging),
        };
    }
    static RoundsResponseToRounds(response) {
        return {
            campaigns: response.campaigns.map((campaign) => IndexerCampaignTransformer.GrpcCampaignToCampaign(campaign)),
            accumulatedRewards: response.accountRewards,
            rewardCount: "",
        };
    }
    static GuildsResponseToGuilds(response) {
        return {
            guilds: response.guilds.map(IndexerCampaignTransformer.GrpcGuildToGuild),
            paging: (0, pagination_1.grpcPagingToPaging)(response.paging),
            updatedAt: parseInt(response.updatedAt, 10),
            summary: response.campaignSummary
                ? IndexerCampaignTransformer.GrpcGuildCampaignSummaryToGuildCampaignSummary(response.campaignSummary)
                : undefined,
        };
    }
    static GuildMemberResponseToGuildMember(response) {
        return {
            info: response.info
                ? IndexerCampaignTransformer.GrpcGuildMemberToGuildMember(response.info)
                : undefined,
        };
    }
    static GuildMembersResponseToGuildMembers(response) {
        return {
            members: response.members.map(IndexerCampaignTransformer.GrpcGuildMemberToGuildMember),
            paging: (0, pagination_1.grpcPagingToPaging)(response.paging),
            guildInfo: response.guildInfo
                ? IndexerCampaignTransformer.GrpcGuildToGuild(response.guildInfo)
                : undefined,
        };
    }
}
exports.IndexerCampaignTransformer = IndexerCampaignTransformer;
