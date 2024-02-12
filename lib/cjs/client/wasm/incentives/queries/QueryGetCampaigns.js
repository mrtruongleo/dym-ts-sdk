"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryGetCampaigns = void 0;
const BaseWasmQuery_1 = require("../../BaseWasmQuery");
const utils_1 = require("../../../../utils");
class QueryGetCampaigns extends BaseWasmQuery_1.BaseWasmQuery {
    toPayload() {
        const payload = {
            get_campaigns: {
                campaigns: this.params.campaigns,
            },
        };
        return (0, utils_1.toBase64)(payload);
    }
}
exports.QueryGetCampaigns = QueryGetCampaigns;
//# sourceMappingURL=QueryGetCampaigns.js.map