"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecArgCreateCampaign extends ExecArgBase_1.ExecArgBase {
    static fromJSON(params) {
        return new ExecArgCreateCampaign(params);
    }
    toData() {
        const { params } = this;
        return {
            name: params.name,
            rewards: params.rewards,
            in_round: params.inRound,
            market_id: params.marketId,
            description: params.description,
            subaccount_id_suffix: params.subaccountIdSuffix,
        };
    }
    toExecData() {
        return (0, ExecArgBase_1.dataToExecData)('create_campaign', this.toData());
    }
}
exports.default = ExecArgCreateCampaign;
//# sourceMappingURL=ExecArgCreateCampaign.js.map