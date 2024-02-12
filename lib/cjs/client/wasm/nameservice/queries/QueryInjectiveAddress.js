"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryInjectiveAddress = void 0;
const BaseWasmQuery_1 = require("../../BaseWasmQuery");
const utils_1 = require("../../../../utils");
class QueryInjectiveAddress extends BaseWasmQuery_1.BaseWasmQuery {
    toPayload() {
        return (0, utils_1.toBase64)({
            address: {
                node: this.params.node,
            },
        });
    }
}
exports.QueryInjectiveAddress = QueryInjectiveAddress;
//# sourceMappingURL=QueryInjectiveAddress.js.map