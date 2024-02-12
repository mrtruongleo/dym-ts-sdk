import { SHA256 } from 'jscrypto/SHA256';
import { RIPEMD160 } from 'jscrypto/RIPEMD160';
import { Base64 } from 'jscrypto/Base64';
import { Word32Array } from 'jscrypto';
import * as secp256k1 from 'secp256k1';
import { SignTypedDataVersion, TypedDataUtils } from '@metamask/eth-sig-util';
export const hashToHex = (data) => {
    return SHA256.hash(Base64.parse(data)).toString().toUpperCase();
};
export const sha256 = (data) => {
    return SHA256.hash(new Word32Array(data)).toUint8Array();
};
export const ripemd160 = (data) => {
    return RIPEMD160.hash(new Word32Array(data)).toUint8Array();
};
export const privateKeyToPublicKey = (privateKey) => {
    return secp256k1.publicKeyCreate(privateKey, true);
};
export const privateKeyHashToPublicKey = (privateKeyHash) => {
    const privateKey = privateKeyHash.startsWith('0x')
        ? privateKeyHash.slice(2)
        : privateKeyHash;
    return secp256k1.publicKeyCreate(Buffer.from(privateKey, 'hex'), true);
};
export const privateKeyToPublicKeyBase64 = (privateKey) => {
    return Buffer.from(privateKeyToPublicKey(privateKey)).toString('base64');
};
export const privateKeyHashToPublicKeyBase64 = (privateKeyHash) => {
    return Buffer.from(privateKeyHashToPublicKey(privateKeyHash)).toString('base64');
};
export const domainHash = (message) => TypedDataUtils.hashStruct('EIP712Domain', message.domain, message.types, SignTypedDataVersion.V4);
export const messageHash = (message) => TypedDataUtils.hashStruct(message.primaryType, message.message, message.types, SignTypedDataVersion.V4);
export function uint8ArrayToHex(arr) {
    return Buffer.from(arr).toString('hex');
}
export function hexToUnit8Array(str) {
    return new Uint8Array(Buffer.from(str, 'hex'));
}
export function decompressPubKey(startsWith02Or03) {
    // if already decompressed an not has trailing 04
    const testBuffer = Buffer.from(startsWith02Or03, 'hex');
    if (testBuffer.length === 64)
        startsWith02Or03 = '04' + startsWith02Or03;
    let decompressed = uint8ArrayToHex(secp256k1.publicKeyConvert(hexToUnit8Array(startsWith02Or03), false));
    // remove trailing 04
    decompressed = decompressed.substring(2);
    return decompressed;
}
