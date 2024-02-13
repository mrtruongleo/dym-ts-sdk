"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthSecp256k1Wallet = void 0;
const amino_1 = require("@cosmjs/amino");
const PrivateKey_1 = require("../PrivateKey");
const PublicKey_1 = require("../PublicKey");
const __1 = require("../../..");
class EthSecp256k1Wallet {
    /**
     * Creates a EthSecp256k1Wallet from the given private key
     *
     * @param privKey The private key.
     * @param prefix The bech32 address prefix (human readable part)
     */
    static async fromKey(privKey, prefix = __1.AddressPrefix) {
        const publicKey = PrivateKey_1.PrivateKey.fromHex(Buffer.from(privKey).toString("hex"))
            .toPublicKey()
            .toPubKeyBytes();
        return new EthSecp256k1Wallet(privKey, publicKey, prefix);
    }
    privkey;
    pubkey;
    prefix;
    constructor(privKey, pubKey, prefix) {
        this.privkey = privKey;
        this.pubkey = pubKey;
        this.prefix = prefix;
    }
    get address() {
        return PublicKey_1.PublicKey.fromBytes(this.pubkey).toAddress().toBech32(this.prefix);
    }
    async getAccounts() {
        return [
            {
                algo: "eth_secp256k1",
                address: this.address,
                pubkey: this.pubkey,
            },
        ];
    }
    async signAmino(signerAddress, signDoc) {
        if (signerAddress !== this.address) {
            throw new Error(`Address ${signerAddress} not found in wallet`);
        }
        const messageBytes = (0, amino_1.serializeSignDoc)(signDoc);
        const signature = await PrivateKey_1.PrivateKey.fromHex(Buffer.from(this.privkey)).sign(Buffer.from(messageBytes));
        return {
            signed: signDoc,
            signature: {
                pub_key: {
                    type: "tendermint/PubKeyEthSecp256k1",
                    value: PublicKey_1.PublicKey.fromBytes(this.pubkey).toBase64(),
                },
                signature: Buffer.from(signature).toString("base64"),
            },
        };
    }
}
exports.EthSecp256k1Wallet = EthSecp256k1Wallet;
//# sourceMappingURL=EthSecp256k1Wallet.js.map