"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryInputQuantity = void 0;
const BaseWasmQuery_1 = require("../../BaseWasmQuery");
const utils_1 = require("../../../../utils");
class QueryInputQuantity extends BaseWasmQuery_1.BaseWasmQuery {
    toPayload() {
        return (0, utils_1.toBase64)({
            get_input_quantity: {
                to_quantity: this.params.toQuantity,
                source_denom: this.params.sourceDenom,
                target_denom: this.params.targetDenom,
            },
        });
    }
}
exports.QueryInputQuantity = QueryInputQuantity;
//# sourceMappingURL=QueryInputQuantity.js.map