"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecArgSwapMinOutput extends ExecArgBase_1.ExecArgBase {
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
        return (0, ExecArgBase_1.dataToExecData)('swap_min_output', this.toData());
    }
}
exports.default = ExecArgSwapMinOutput;
//# sourceMappingURL=ExecArgSwapMinOutput.js.map