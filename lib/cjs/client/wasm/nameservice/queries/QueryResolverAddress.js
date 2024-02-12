"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryResolverAddress = void 0;
const BaseWasmQuery_1 = require("../../BaseWasmQuery");
const utils_1 = require("../../../../utils");
class QueryResolverAddress extends BaseWasmQuery_1.BaseWasmQuery {
    toPayload() {
        return (0, utils_1.toBase64)({
            resolver: {
                node: this.params.node,
            },
        });
    }
}
exports.QueryResolverAddress = QueryResolverAddress;
//# sourceMappingURL=QueryResolverAddress.js.map