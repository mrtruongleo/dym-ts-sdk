"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecArgCreateRound extends ExecArgBase_1.ExecArgBase {
    static fromJSON(params) {
        return new ExecArgCreateRound(params);
    }
    toData() {
        const { params } = this;
        return {
            name: params.name,
            start_date: params.startDate,
            end_date: params.endDate,
        };
    }
    toExecData() {
        return (0, ExecArgBase_1.dataToExecData)('create_round', this.toData());
    }
}
exports.default = ExecArgCreateRound;
//# sourceMappingURL=ExecArgCreateRound.js.map