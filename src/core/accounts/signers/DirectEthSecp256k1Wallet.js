"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectEthSecp256k1Wallet = void 0;
const proto_signing_1 = require("@cosmjs/proto-signing");
const PrivateKey_1 = require("../PrivateKey");
const PublicKey_1 = require("../PublicKey");
const __1 = require("../../..");
class DirectEthSecp256k1Wallet {
    /**
     * Creates a DirectEthSecp256k1Wallet from the given private key
     *
     * @param privKey The private key.
     * @param prefix The bech32 address prefix (human readable part)
     */
    static fromKey(privKey, prefix = __1.AddressPrefix) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicKey = PrivateKey_1.PrivateKey.fromHex(Buffer.from(privKey).toString("hex"))
                .toPublicKey()
                .toPubKeyBytes();
            return new DirectEthSecp256k1Wallet(privKey, publicKey, prefix);
        });
    }
    constructor(privKey, pubKey, prefix) {
        this.privateKey = PrivateKey_1.PrivateKey.fromHex(Buffer.from(privKey).toString("hex"));
        this.publicKey = PublicKey_1.PublicKey.fromBytes(pubKey);
        this.prefix = prefix;
    }
    get address() {
        return this.publicKey.toAddress().toBech32(this.prefix);
    }
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return [
                {
                    algo: "eth_secp256k1",
                    address: this.address,
                    pubkey: this.publicKey.toPubKeyBytes(),
                },
            ];
        });
    }
    signDirect(address, signDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            const signBytes = (0, proto_signing_1.makeSignBytes)(signDoc);
            if (address !== this.address) {
                throw new Error(`Address ${address} not found in wallet`);
            }
            const signature = yield this.privateKey.sign(Buffer.from(signBytes));
            return {
                signed: signDoc,
                signature: {
                    pub_key: {
                        type: "tendermint/PubKeyEthSecp256k1",
                        value: this.publicKey.toBase64(),
                    },
                    signature: Buffer.from(signature).toString("base64"),
                },
            };
        });
    }
}
exports.DirectEthSecp256k1Wallet = DirectEthSecp256k1Wallet;
