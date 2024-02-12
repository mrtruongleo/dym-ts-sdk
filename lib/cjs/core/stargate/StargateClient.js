"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StargateClient = void 0;
const stargate_1 = require("@cosmjs/stargate");
const accounts_1 = require("../accounts");
const check_1 = require("../../utils/check");
class StargateClient extends stargate_1.StargateClient {
    async getAccount(searchAddress) {
        try {
            const chainId = await this.getChainId();
            const isInjective = (0, check_1.startWithChainIdPrefix)(chainId);
            const account = await this.forceGetQueryClient().auth.account(searchAddress);
            if (!account) {
                return null;
            }
            if (isInjective) {
                return (0, accounts_1.injectiveAccountParser)(account);
            }
            return (0, stargate_1.accountFromAny)(account);
        }
        catch (error) {
            if (/rpc error: code = NotFound/i.test(error.toString())) {
                return null;
            }
            throw error;
        }
    }
}
exports.StargateClient = StargateClient;
//# sourceMappingURL=StargateClient.js.map