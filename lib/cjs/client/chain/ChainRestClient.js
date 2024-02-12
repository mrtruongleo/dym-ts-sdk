"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainRestClient = void 0;
const ChainRestAuthApi_1 = require("./rest/ChainRestAuthApi");
/**
 * @category Chain Rest API
 * @hidden
 */
class ChainRestClient {
    auth;
    constructor(endpoint) {
        this.auth = new ChainRestAuthApi_1.ChainRestAuthApi(endpoint);
    }
}
exports.ChainRestClient = ChainRestClient;
//# sourceMappingURL=ChainRestClient.js.map