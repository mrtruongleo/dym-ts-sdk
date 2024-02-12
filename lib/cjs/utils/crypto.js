"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decompressPubKey = exports.hexToUnit8Array = exports.uint8ArrayToHex = exports.messageHash = exports.domainHash = exports.privateKeyHashToPublicKeyBase64 = exports.privateKeyToPublicKeyBase64 = exports.privateKeyHashToPublicKey = exports.privateKeyToPublicKey = exports.ripemd160 = exports.sha256 = exports.hashToHex = void 0;
const SHA256_1 = require("jscrypto/SHA256");
const RIPEMD160_1 = require("jscrypto/RIPEMD160");
const Base64_1 = require("jscrypto/Base64");
const jscrypto_1 = require("jscrypto");
const secp256k1 = __importStar(require("secp256k1"));
const eth_sig_util_1 = require("@metamask/eth-sig-util");
const hashToHex = (data) => {
    return SHA256_1.SHA256.hash(Base64_1.Base64.parse(data)).toString().toUpperCase();
};
exports.hashToHex = hashToHex;
const sha256 = (data) => {
    return SHA256_1.SHA256.hash(new jscrypto_1.Word32Array(data)).toUint8Array();
};
exports.sha256 = sha256;
const ripemd160 = (data) => {
    return RIPEMD160_1.RIPEMD160.hash(new jscrypto_1.Word32Array(data)).toUint8Array();
};
exports.ripemd160 = ripemd160;
const privateKeyToPublicKey = (privateKey) => {
    return secp256k1.publicKeyCreate(privateKey, true);
};
exports.privateKeyToPublicKey = privateKeyToPublicKey;
const privateKeyHashToPublicKey = (privateKeyHash) => {
    const privateKey = privateKeyHash.startsWith('0x')
        ? privateKeyHash.slice(2)
        : privateKeyHash;
    return secp256k1.publicKeyCreate(Buffer.from(privateKey, 'hex'), true);
};
exports.privateKeyHashToPublicKey = privateKeyHashToPublicKey;
const privateKeyToPublicKeyBase64 = (privateKey) => {
    return Buffer.from((0, exports.privateKeyToPublicKey)(privateKey)).toString('base64');
};
exports.privateKeyToPublicKeyBase64 = privateKeyToPublicKeyBase64;
const privateKeyHashToPublicKeyBase64 = (privateKeyHash) => {
    return Buffer.from((0, exports.privateKeyHashToPublicKey)(privateKeyHash)).toString('base64');
};
exports.privateKeyHashToPublicKeyBase64 = privateKeyHashToPublicKeyBase64;
const domainHash = (message) => eth_sig_util_1.TypedDataUtils.hashStruct('EIP712Domain', message.domain, message.types, eth_sig_util_1.SignTypedDataVersion.V4);
exports.domainHash = domainHash;
const messageHash = (message) => eth_sig_util_1.TypedDataUtils.hashStruct(message.primaryType, message.message, message.types, eth_sig_util_1.SignTypedDataVersion.V4);
exports.messageHash = messageHash;
function uint8ArrayToHex(arr) {
    return Buffer.from(arr).toString('hex');
}
exports.uint8ArrayToHex = uint8ArrayToHex;
function hexToUnit8Array(str) {
    return new Uint8Array(Buffer.from(str, 'hex'));
}
exports.hexToUnit8Array = hexToUnit8Array;
function decompressPubKey(startsWith02Or03) {
    // if already decompressed an not has trailing 04
    const testBuffer = Buffer.from(startsWith02Or03, 'hex');
    if (testBuffer.length === 64)
        startsWith02Or03 = '04' + startsWith02Or03;
    let decompressed = uint8ArrayToHex(secp256k1.publicKeyConvert(hexToUnit8Array(startsWith02Or03), false));
    // remove trailing 04
    decompressed = decompressed.substring(2);
    return decompressed;
}
exports.decompressPubKey = decompressPubKey;
//# sourceMappingURL=crypto.js.map