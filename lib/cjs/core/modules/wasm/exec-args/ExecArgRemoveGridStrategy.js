"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecArgRemoveGridStrategy extends ExecArgBase_1.ExecArgBase {
    static fromJSON(params) {
        return new ExecArgRemoveGridStrategy(params);
    }
    toData() {
        const { params } = this;
        return {
            subaccount_id: params.subaccountId,
        };
    }
    toExecData() {
        return (0, ExecArgBase_1.dataToExecData)('remove_strategy', this.toData());
    }
}
exports.default = ExecArgRemoveGridStrategy;
//# sourceMappingURL=ExecArgRemoveGridStrategy.js.map