"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecArgCW20Transfer extends ExecArgBase_1.ExecArgBase {
    static fromJSON(params) {
        return new ExecArgCW20Transfer(params);
    }
    toData() {
        const { params } = this;
        return {
            recipient: params.recipient,
            amount: params.amount,
        };
    }
    toExecData() {
        return (0, ExecArgBase_1.dataToExecData)('transfer', this.toData());
    }
}
exports.default = ExecArgCW20Transfer;
//# sourceMappingURL=ExecArgCW20Transfer.js.map