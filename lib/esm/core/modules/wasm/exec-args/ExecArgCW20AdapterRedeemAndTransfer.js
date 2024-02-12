"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecArgCW20AdapterRedeemAndTransfer extends ExecArgBase_1.ExecArgBase {
    static fromJSON(params) {
        return new ExecArgCW20AdapterRedeemAndTransfer(params);
    }
    toData() {
        const { params } = this;
        return {
            recipient: params.recipient,
        };
    }
    toExecData() {
        return (0, ExecArgBase_1.dataToExecData)('redeem_and_transfer', this.toData());
    }
}
exports.default = ExecArgCW20AdapterRedeemAndTransfer;
//# sourceMappingURL=ExecArgCW20AdapterRedeemAndTransfer.js.map