import { Account, StargateClient, accountFromAny } from "@cosmjs/stargate";
import { injectiveAccountParser } from "../accounts";
import { startWithChainIdPrefix } from "../../utils/check";

export class EthStargateClient extends StargateClient {
  public async getAccount(searchAddress: string): Promise<Account | null> {
    try {
      const chainId = await this.getChainId();
      const isInjective = startWithChainIdPrefix(chainId);

      const account = await this.forceGetQueryClient().auth.account(
        searchAddress
      );

      if (!account) {
        return null;
      }

      if (isInjective) {
        return injectiveAccountParser(account);
      }

      return accountFromAny(account);
    } catch (error: any) {
      if (/rpc error: code = NotFound/i.test(error.toString())) {
        return null;
      }

      throw error;
    }
  }
}
