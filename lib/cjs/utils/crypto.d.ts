/// <reference types="node" />
export declare const hashToHex: (data: string) => string;
export declare const sha256: (data: Uint8Array) => Uint8Array;
export declare const ripemd160: (data: Uint8Array) => Uint8Array;
export declare const privateKeyToPublicKey: (privateKey: Uint8Array) => Uint8Array;
export declare const privateKeyHashToPublicKey: (privateKeyHash: string) => Uint8Array;
export declare const privateKeyToPublicKeyBase64: (privateKey: Uint8Array) => string;
export declare const privateKeyHashToPublicKeyBase64: (privateKeyHash: string) => string;
export declare const domainHash: (message: any) => Buffer;
export declare const messageHash: (message: any) => Buffer;
export declare function uint8ArrayToHex(arr: Uint8Array): string;
export declare function hexToUnit8Array(str: string): Uint8Array;
export declare function decompressPubKey(startsWith02Or03: string): string;
