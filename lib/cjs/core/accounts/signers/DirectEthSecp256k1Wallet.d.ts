import { DirectSignResponse } from "@cosmjs/proto-signing";
import { AccountData, OfflineDirectSigner } from "./types/proto-signer";
import { CosmosTxV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare class DirectEthSecp256k1Wallet implements OfflineDirectSigner {
    /**
     * Creates a DirectEthSecp256k1Wallet from the given private key
     *
     * @param privKey The private key.
     * @param prefix The bech32 address prefix (human readable part)
     */
    static fromKey(privKey: Uint8Array, prefix?: string): Promise<DirectEthSecp256k1Wallet>;
    private readonly privkey;
    private readonly pubkey;
    private readonly prefix;
    private constructor();
    private get address();
    getAccounts(): Promise<readonly AccountData[]>;
    signDirect(address: string, signDoc: Omit<CosmosTxV1Beta1Tx.SignDoc, "accountNumber"> & {
        accountNumber: bigint;
    } & any): Promise<DirectSignResponse>;
}
