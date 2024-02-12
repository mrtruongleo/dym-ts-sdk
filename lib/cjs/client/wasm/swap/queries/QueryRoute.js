"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryRoute = void 0;
const BaseWasmQuery_1 = require("../../BaseWasmQuery");
const utils_1 = require("../../../../utils");
class QueryRoute extends BaseWasmQuery_1.BaseWasmQuery {
    toPayload() {
        return (0, utils_1.toBase64)({
            get_route: {
                source_denom: this.params.sourceDenom,
                target_denom: this.params.targetDenom,
            },
        });
    }
}
exports.QueryRoute = QueryRoute;
//# sourceMappingURL=QueryRoute.js.map