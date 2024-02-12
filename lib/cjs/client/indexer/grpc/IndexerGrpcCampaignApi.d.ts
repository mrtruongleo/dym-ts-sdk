import { InjectiveCampaignRpc } from "@injectivelabs/indexer-proto-ts";
import BaseGrpcConsumer from "../../base/BaseIndexerGrpcConsumer";
/**
 * @category Indexer Grpc API
 */
export declare class IndexerGrpcCampaignApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveCampaignRpc.InjectiveCampaignRPCClientImpl;
    constructor(endpoint: string);
    fetchCampaign({ skip, limit, marketId, campaignId, accountAddress, contractAddress, }: {
        skip?: string;
        limit?: number;
        marketId?: string;
        campaignId: string;
        accountAddress?: string;
        contractAddress?: string;
    }): Promise<{
        campaign: import("../types").Campaign | undefined;
        users: import("../types").CampaignUser[];
        paging: import("../../..").ExchangePagination;
    }>;
    fetchRound({ roundId, toRoundId, accountAddress, contractAddress, }: {
        roundId?: string;
        toRoundId?: number;
        accountAddress?: string;
        contractAddress?: string;
    }): Promise<{
        campaigns: import("../types").Campaign[];
        accumulatedRewards: InjectiveCampaignRpc.Coin[];
        rewardCount: string;
    }>;
    fetchGuilds({ skip, limit, sortBy, campaignContract, }: {
        skip?: number;
        limit?: number;
        sortBy: string;
        campaignContract: string;
    }): Promise<{
        guilds: import("../types").Guild[];
        paging: import("../../..").ExchangePagination;
        updatedAt: number;
        summary: import("../types").GuildCampaignSummary | undefined;
    }>;
    fetchGuildMember({ address, campaignContract, }: {
        address: string;
        campaignContract: string;
    }): Promise<{
        info: import("../types").GuildMember | undefined;
    }>;
    fetchGuildMembers({ skip, limit, sortBy, guildId, campaignContract, includeGuildInfo, }: {
        skip?: number;
        limit?: number;
        sortBy?: string;
        guildId: string;
        campaignContract: string;
        includeGuildInfo: boolean;
    }): Promise<{
        members: import("../types").GuildMember[];
        paging: import("../../..").ExchangePagination;
        guildInfo: import("../types").Guild | undefined;
    }>;
}
