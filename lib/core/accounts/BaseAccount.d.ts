import { Address } from "./Address";
import { AccountResponse, BaseAccountRestResponse } from "../../client";
import { AccountDetails } from "../../types/auth";
/**
 * @category Utility Classes
 */
export declare class BaseAccount extends Address {
    accountNumber: number;
    sequence: number;
    pubKey: {
        type: string;
        key: string;
    };
    constructor({ address, accountNumber, sequence, pubKey, }: {
        address: string;
        accountNumber: number;
        sequence: number;
        pubKey: {
            type: string;
            key: string;
        };
    });
    static fromRestApi(accountResponse: AccountResponse): BaseAccount;
    static fromRestCosmosApi(accountResponse: BaseAccountRestResponse): BaseAccount;
    incrementSequence(): this;
    toAccountDetails(): AccountDetails;
}
