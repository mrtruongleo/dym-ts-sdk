import { ExecArgBase, ExecDataRepresentation } from '../ExecArgBase';
export declare namespace ExecArgSwapExactOutput {
    interface Params {
        targetOutputQuantity: string;
        targetDenom: string;
    }
    interface Data {
        target_output_quantity: string;
        target_denom: string;
    }
}
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgSwapExactOutput extends ExecArgBase<ExecArgSwapExactOutput.Params, ExecArgSwapExactOutput.Data> {
    static fromJSON(params: ExecArgSwapExactOutput.Params): ExecArgSwapExactOutput;
    toData(): ExecArgSwapExactOutput.Data;
    toExecData(): ExecDataRepresentation<ExecArgSwapExactOutput.Data>;
}
