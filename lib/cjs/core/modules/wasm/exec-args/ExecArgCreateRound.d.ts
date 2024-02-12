import { ExecArgBase, ExecDataRepresentation } from '../ExecArgBase';
export declare namespace ExecArgCreateRound {
    interface Params {
        name: string;
        endDate: number;
        startDate: number;
    }
    interface Data {
        name: string;
        end_date: number;
        start_date: number;
    }
}
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgCreateRound extends ExecArgBase<ExecArgCreateRound.Params, ExecArgCreateRound.Data> {
    static fromJSON(params: ExecArgCreateRound.Params): ExecArgCreateRound;
    toData(): ExecArgCreateRound.Data;
    toExecData(): ExecDataRepresentation<ExecArgCreateRound.Data>;
}
