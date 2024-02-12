"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../../utils/utf8");
const ExecArgBase_1 = require("../ExecArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecArgCW20Send extends ExecArgBase_1.ExecArgBase {
    static fromJSON(params) {
        return new ExecArgCW20Send(params);
    }
    toData() {
        const { params } = this;
        return {
            contract: params.contractAddress,
            amount: params.amount,
            msg: Buffer.from((0, utf8_1.fromUtf8)(JSON.stringify(params.msg || {}))).toString('base64'),
        };
    }
    toExecData() {
        return (0, ExecArgBase_1.dataToExecData)('send', this.toData());
    }
}
exports.default = ExecArgCW20Send;
//# sourceMappingURL=ExecArgCW20Send.js.map