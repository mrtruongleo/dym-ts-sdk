"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryAllRounds = void 0;
const BaseWasmQuery_1 = require("../../BaseWasmQuery");
const utils_1 = require("../../../../utils");
class QueryAllRounds extends BaseWasmQuery_1.BaseWasmQuery {
    toPayload() {
        const payload = {
            all_rounds: {
                ...(this.params.limit ? { limit: this.params.limit } : {}),
                ...(this.params.startAfter
                    ? {
                        start_after: this.params.startAfter,
                    }
                    : {}),
            },
        };
        return (0, utils_1.toBase64)(payload);
    }
}
exports.QueryAllRounds = QueryAllRounds;
//# sourceMappingURL=QueryAllRounds.js.map