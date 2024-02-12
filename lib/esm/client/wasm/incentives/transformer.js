"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncentivesQueryTransformer = void 0;
const utils_1 = require("../../../utils");
class IncentivesQueryTransformer {
    static contractRoundResponseToContractRound(response) {
        const data = JSON.parse((0, utils_1.toUtf8)(response.data));
        return data.map((round) => ({
            id: round.id,
            name: round.name,
            endDate: round.end_date,
            campaigns: round.campaigns,
            startDate: round.start_date,
        }));
    }
    static contractCampaignResponseToContractCampaign(response) {
        const data = JSON.parse((0, utils_1.toUtf8)(response.data));
        return data.map((campaign) => ({
            id: campaign.id,
            name: campaign.name,
            rewards: campaign.rewards,
            inRound: campaign.in_round,
            marketId: campaign.market_id,
            isFunded: campaign.is_funded,
            description: campaign.description,
            isFinalized: campaign.is_finalized,
            totalRewards: campaign.total_rewards,
            subaccountIdSuffix: campaign.subaccount_id_suffix,
        }));
    }
}
exports.IncentivesQueryTransformer = IncentivesQueryTransformer;
//# sourceMappingURL=transformer.js.map