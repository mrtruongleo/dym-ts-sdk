import { DirectSignResponse, makeSignBytes } from "@cosmjs/proto-signing";
import { PrivateKey } from "../PrivateKey";
import { PublicKey } from "../PublicKey";
import { AccountData, OfflineDirectSigner } from "./types/proto-signer";
import { CosmosTxV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { AddressPrefix } from "../../..";

export class DirectEthSecp256k1Wallet implements OfflineDirectSigner {
  /**
   * Creates a DirectEthSecp256k1Wallet from the given private key
   *
   * @param privKey The private key.
   * @param prefix The bech32 address prefix (human readable part)
   */
  public static async fromKey(
    privKey: Uint8Array,
    prefix = AddressPrefix
  ): Promise<DirectEthSecp256k1Wallet> {
    const publicKey = PrivateKey.fromHex(Buffer.from(privKey).toString("hex"))
      .toPublicKey()
      .toPubKeyBytes();

    return new DirectEthSecp256k1Wallet(privKey, publicKey, prefix);
  }

  private readonly privkey: Uint8Array;
  private readonly pubkey: Uint8Array;
  private readonly prefix: string;

  private constructor(privKey: Uint8Array, pubKey: Uint8Array, prefix: string) {
    this.privkey = privKey;
    this.pubkey = pubKey;
    this.prefix = prefix;
  }

  private get address(): string {
    return PublicKey.fromBytes(this.pubkey).toAddress().toBech32(this.prefix);
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    return [
      {
        algo: "eth_secp256k1",
        address: this.address,
        pubkey: this.pubkey,
      },
    ];
  }

  public async signDirect(
    address: string,
    signDoc: Omit<CosmosTxV1Beta1Tx.SignDoc, "accountNumber"> & {
      accountNumber: bigint;
    } & any
  ): Promise<DirectSignResponse> {
    const signBytes = makeSignBytes(signDoc);

    if (address !== this.address) {
      throw new Error(`Address ${address} not found in wallet`);
    }
    const prv = PrivateKey.fromHex(Buffer.from(this.privkey).toString("hex"));
    const signature = await prv.sign(Buffer.from(signBytes));

    return {
      signed: signDoc,
      signature: {
        pub_key: {
          type: "tendermint/PubKeyEthSecp256k1",
          value: PublicKey.fromBytes(this.pubkey).toBase64(),
        },
        signature: Buffer.from(signature).toString("base64"),
      },
    };
  }
}
