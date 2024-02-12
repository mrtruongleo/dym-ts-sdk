"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryAllRoutes = void 0;
const BaseWasmQuery_1 = require("../../BaseWasmQuery");
const utils_1 = require("../../../../utils");
class QueryAllRoutes extends BaseWasmQuery_1.BaseWasmQuery {
    toPayload() {
        return (0, utils_1.toBase64)({ get_all_routes: {} });
    }
}
exports.QueryAllRoutes = QueryAllRoutes;
//# sourceMappingURL=QueryAllRoutes.js.map