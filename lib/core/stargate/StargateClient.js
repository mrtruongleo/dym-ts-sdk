import { StargateClient as CosmjsStargateClient, accountFromAny, } from "@cosmjs/stargate";
import { injectiveAccountParser } from "../accounts";
import { startWithChainIdPrefix } from "../../utils/check";
export class StargateClient extends CosmjsStargateClient {
    async getAccount(searchAddress) {
        try {
            const chainId = await this.getChainId();
            console.log("chainid: ", chainId);
            const isInjective = startWithChainIdPrefix(chainId);
            const account = await this.forceGetQueryClient().auth.account(searchAddress);
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
    }
}
