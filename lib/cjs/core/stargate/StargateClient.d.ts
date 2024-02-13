import { Account, StargateClient } from "@cosmjs/stargate";
export declare class EthStargateClient extends StargateClient {
    getAccount(searchAddress: string): Promise<Account | null>;
}
