"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecArgIncreaseAllowance extends ExecArgBase_1.ExecArgBase {
    static fromJSON(params) {
        return new ExecArgIncreaseAllowance(params);
    }
    toData() {
        const { params } = this;
        return {
            amount: params.amount,
            spender: params.spender,
            expires: params.expires,
        };
    }
    toExecData() {
        return (0, ExecArgBase_1.dataToExecData)('increase_allowance', this.toData());
    }
}
exports.default = ExecArgIncreaseAllowance;
//# sourceMappingURL=ExecArgIncreaseAllowance.js.map