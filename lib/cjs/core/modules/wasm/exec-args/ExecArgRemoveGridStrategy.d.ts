import { ExecArgBase, ExecDataRepresentation } from '../ExecArgBase';
export declare namespace ExecArgRemoveGridStrategy {
    interface Params {
        subaccountId?: string;
    }
    interface Data {
        subaccount_id?: string;
    }
}
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgRemoveGridStrategy extends ExecArgBase<ExecArgRemoveGridStrategy.Params, ExecArgRemoveGridStrategy.Data> {
    static fromJSON(params: ExecArgRemoveGridStrategy.Params): ExecArgRemoveGridStrategy;
    toData(): ExecArgRemoveGridStrategy.Data;
    toExecData(): ExecDataRepresentation<ExecArgRemoveGridStrategy.Data>;
}
