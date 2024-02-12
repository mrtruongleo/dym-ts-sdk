"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecArgDepositTokens extends ExecArgBase_1.ExecArgBase {
    static fromJSON(params) {
        return new ExecArgDepositTokens(params);
    }
    toData() {
        return {};
    }
    toExecData() {
        return (0, ExecArgBase_1.dataToExecData)('deposit_tokens', this.toData());
    }
}
exports.default = ExecArgDepositTokens;
//# sourceMappingURL=ExecArgDepositTokens.js.map