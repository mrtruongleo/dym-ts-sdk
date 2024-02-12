"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecArgSwapExactOutput extends ExecArgBase_1.ExecArgBase {
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
        return (0, ExecArgBase_1.dataToExecData)('swap_exact_output', this.toData());
    }
}
exports.default = ExecArgSwapExactOutput;
//# sourceMappingURL=ExecArgSwapExactOutput.js.map