import { dataToExecData, ExecArgBase, } from '../ExecArgBase';
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgFundCampaign extends ExecArgBase {
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
        return dataToExecData('fund_campaign', this.toData());
    }
}
