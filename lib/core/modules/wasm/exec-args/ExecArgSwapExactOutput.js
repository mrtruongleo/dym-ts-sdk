import { dataToExecData, ExecArgBase, } from '../ExecArgBase';
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgSwapExactOutput extends ExecArgBase {
    static fromJSON(params) {
        return new ExecArgSwapExactOutput(params);
    }
    toData() {
        const { params } = this;
        return {
            target_output_quantity: params.targetOutputQuantity,
            target_denom: params.targetDenom,
        };
    }
    toExecData() {
        return dataToExecData('swap_exact_output', this.toData());
    }
}
