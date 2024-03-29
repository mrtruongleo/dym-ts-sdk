import { ExecArgBase, ExecDataRepresentation } from '../ExecArgBase';
import { Coin } from '@injectivelabs/ts-types';
export declare namespace ExecArgCreateCampaign {
    interface Params {
        name: string;
        rewards: Coin[];
        inRound: number;
        marketId: string;
        description: string;
        subaccountIdSuffix: string;
    }
    interface Data {
        name: string;
        rewards: Coin[];
        in_round: number;
        market_id: string;
        description: string;
        subaccount_id_suffix: string;
    }
}
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgCreateCampaign extends ExecArgBase<ExecArgCreateCampaign.Params, ExecArgCreateCampaign.Data> {
    static fromJSON(params: ExecArgCreateCampaign.Params): ExecArgCreateCampaign;
    toData(): ExecArgCreateCampaign.Data;
    toExecData(): ExecDataRepresentation<ExecArgCreateCampaign.Data>;
}
