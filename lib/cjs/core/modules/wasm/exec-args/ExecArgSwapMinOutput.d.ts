import { ExecArgBase, ExecDataRepresentation } from '../ExecArgBase';
export declare namespace ExecArgSwapMinOutput {
    interface Params {
        minOutputQuantity: string;
        targetDenom: string;
    }
    interface Data {
        min_output_quantity: string;
        target_denom: string;
    }
}
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgSwapMinOutput extends ExecArgBase<ExecArgSwapMinOutput.Params, ExecArgSwapMinOutput.Data> {
    static fromJSON(params: ExecArgSwapMinOutput.Params): ExecArgSwapMinOutput;
    toData(): ExecArgSwapMinOutput.Data;
    toExecData(): ExecDataRepresentation<ExecArgSwapMinOutput.Data>;
}
