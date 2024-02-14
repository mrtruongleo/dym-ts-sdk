"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StargateClient = void 0;
const stargate_1 = require("@cosmjs/stargate");
const accounts_1 = require("../accounts");
const check_1 = require("../../utils/check");
class StargateClient extends stargate_1.StargateClient {
    getAccount(searchAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chainId = yield this.getChainId();
                console.log("chainid: ", chainId);
                const isInjective = (0, check_1.startWithChainIdPrefix)(chainId);
                const account = yield this.forceGetQueryClient().auth.account(searchAddress);
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
        });
    }
}
exports.StargateClient = StargateClient;
