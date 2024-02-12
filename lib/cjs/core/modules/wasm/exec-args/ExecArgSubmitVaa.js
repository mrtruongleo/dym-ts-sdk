"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
const utf8_1 = require("./../../../../utils/utf8");
/**
 * @category Contract Exec Arguments
 */
class ExecArgSubmitVaa extends ExecArgBase_1.ExecArgBase {
    static fromJSON(params) {
        return new ExecArgSubmitVaa(params);
    }
    toData() {
        const { params } = this;
        return {
            data: (0, utf8_1.binaryToBase64)(params.signed),
        };
    }
    toExecData() {
        return (0, ExecArgBase_1.dataToExecData)('submit_vaa', this.toData());
    }
}
exports.default = ExecArgSubmitVaa;
//# sourceMappingURL=ExecArgSubmitVaa.js.map