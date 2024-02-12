import { ExecArgBase, ExecDataRepresentation } from '../ExecArgBase';
export declare namespace ExecArgSubmitVaa {
    interface Params {
        signed: string;
    }
    interface Data {
        data: string;
    }
}
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgSubmitVaa extends ExecArgBase<ExecArgSubmitVaa.Params, ExecArgSubmitVaa.Data> {
    static fromJSON(params: ExecArgSubmitVaa.Params): ExecArgSubmitVaa;
    toData(): ExecArgSubmitVaa.Data;
    toExecData(): ExecDataRepresentation<ExecArgSubmitVaa.Data>;
}
