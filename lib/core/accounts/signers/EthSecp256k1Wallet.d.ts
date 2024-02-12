import { AminoSignResponse, StdSignDoc } from "@cosmjs/amino";
import { AccountData, OfflineAminoSigner } from "./types/amino-signer";
export declare class EthSecp256k1Wallet implements OfflineAminoSigner {
    /**
     * Creates a EthSecp256k1Wallet from the given private key
     *
     * @param privKey The private key.
     * @param prefix The bech32 address prefix (human readable part)
     */
    static fromKey(privKey: Uint8Array, prefix?: string): Promise<EthSecp256k1Wallet>;
    private readonly privateKey;
    private readonly publicKey;
    private readonly prefix;
    private constructor();
    private get address();
    getAccounts(): Promise<readonly AccountData[]>;
    signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse>;
}