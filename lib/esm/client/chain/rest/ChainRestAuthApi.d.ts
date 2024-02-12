import BaseRestConsumer from "../../base/BaseRestConsumer";
import { AccountResponse, BaseAccountRestResponse } from "./../types/auth-rest";
/**
 * @category Chain Rest API
 */
export declare class ChainRestAuthApi extends BaseRestConsumer {
    /**
     * Looks up the account information for the Injective address.
     *
     * @param address address of account to look up
     */
    fetchAccount(address: string, params?: Record<string, any>): Promise<AccountResponse>;
    /**
     * Looks up the account information for any cosmos chain address.
     *
     * @param address address of account to look up
     */
    fetchCosmosAccount(address: string, params?: Record<string, any>): Promise<BaseAccountRestResponse>;
}
