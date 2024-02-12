var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StargateClient as CosmjsStargateClient, accountFromAny, } from "@cosmjs/stargate";
import { injectiveAccountParser } from "../accounts";
import { startWithChainIdPrefix } from "../../utils/check";
export class StargateClient extends CosmjsStargateClient {
    getAccount(searchAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chainId = yield this.getChainId();
                console.log("chainid: ", chainId);
                const isInjective = startWithChainIdPrefix(chainId);
                const account = yield this.forceGetQueryClient().auth.account(searchAddress);
                if (!account) {
                    return null;
                }
                if (isInjective) {
                    return injectiveAccountParser(account);
                }
                return accountFromAny(account);
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
