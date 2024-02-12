"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecArgFundCampaign extends ExecArgBase_1.ExecArgBase {
    static fromJSON(params) {
        return new ExecArgFundCampaign(params);
    }
    toData() {
        const { params } = this;
        return {
            campaign_id: params.campaignId,
        };
    }
    toExecData() {
        return (0, ExecArgBase_1.dataToExecData)('fund_campaign', this.toData());
    }
}
exports.default = ExecArgFundCampaign;
//# sourceMappingURL=ExecArgFundCampaign.js.map