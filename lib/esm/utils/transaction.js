"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverTypedSignaturePubKey = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const secp256k1_1 = require("secp256k1");
const eth_sig_util_1 = require("@metamask/eth-sig-util");
const recoverTypedSignaturePubKey = (data, signature) => {
    const compressedPubKeyPrefix = Buffer.from('04', 'hex');
    const message = eth_sig_util_1.TypedDataUtils.eip712Hash(data, eth_sig_util_1.SignTypedDataVersion.V4);
    const sigParams = (0, ethereumjs_util_1.fromRpcSig)(signature);
    const publicKey = (0, ethereumjs_util_1.ecrecover)(message, sigParams.v, sigParams.r, sigParams.s);
    const prefixedKey = Buffer.concat([compressedPubKeyPrefix, publicKey]);
    const compressedKey = Buffer.from((0, secp256k1_1.publicKeyConvert)(prefixedKey));
    return `0x${compressedKey.toString('hex')}`;
};
exports.recoverTypedSignaturePubKey = recoverTypedSignaturePubKey;
//# sourceMappingURL=transaction.js.map