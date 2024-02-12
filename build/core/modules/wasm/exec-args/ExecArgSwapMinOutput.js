import { dataToExecData, ExecArgBase, } from '../ExecArgBase';
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgSwapMinOutput extends ExecArgBase {
    static fromJSON(params) {
        return new ExecArgSwapMinOutput(params);
    }
    toData() {
        const { params } = this;
        return {
            min_output_quantity: params.minOutputQuantity,
            target_denom: params.targetDenom,
        };
    }
    toExecData() {
        return dataToExecData('swap_min_output', this.toData());
    }
}
