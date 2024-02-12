/// <reference types="node" />
import { PublicKey } from './PublicKey';
import { Address } from './Address';
/**
 * Class for wrapping SigningKey that is used for signature creation and public key derivation.
 *
 * @category Crypto Utility Classes
 */
export declare class PrivateKey {
    private wallet;
    private constructor();
    /**
     * Generate new private key with random mnemonic phrase
     * @returns { privateKey: PrivateKey, mnemonic: string }
     */
    static generate(): {
        privateKey: PrivateKey;
        mnemonic: string;
    };
    /**
     * Create a PrivateKey instance from a given mnemonic phrase and a HD derivation path.
     * If path is not given, default to Band's HD prefix 494 and all other indexes being zeroes.
     * @param {string} words the mnemonic phrase
     * @param {string|undefined} path the HD path that follows the BIP32 standard (optional)
     * @returns {PrivateKey} Initialized PrivateKey object
     */
    static fromMnemonic(words: string, path?: string | undefined): PrivateKey;
    /**
     * Create a PrivateKey instance from a given private key and a HD derivation path.
     * If path is not given, default to Band's HD prefix 494 and all other indexes being zeroes.
     * @param {string} privateKey  the private key
     * @returns {PrivateKey} Initialized PrivateKey object
     *
     * @deprecated - use fromHex instead
     */
    static fromPrivateKey(privateKey: string): PrivateKey;
    /**
     * Create a PrivateKey instance from a given private key and a HD derivation path.
     * If path is not given, default to Band's HD prefix 494 and all other indexes being zeroes.
     * @param {string} privateKey  the private key
     * @returns {PrivateKey} Initialized PrivateKey object
     */
    static fromHex(privateKey: string | Uint8Array): PrivateKey;
    /**
     * Return the private key in hex
     * @returns {string}
     **/
    toPrivateKeyHex(): string;
    /**
     * Return the PublicKey associated with this private key.
     * @returns {PublicKey} a Public key that can be used to verify the signatures made with this PrivateKey
     **/
    toPublicKey(): PublicKey;
    /**
     * Return a hex representation of signing key.
     * @returns {string}
     */
    toHex(): string;
    /**
     * Return the Address associated with this private key.
     * @returns {Address}
     **/
    toAddress(): Address;
    /**
     * Return the Bech32 address associated with this private key.
     * @returns {string}
     **/
    toBech32(): string;
    /**
     * Sign the given message using the wallet's _signingKey function.
     * @param {string} messageBytes: the message that will be hashed and signed, a Buffer made of bytes
     * @returns {Uint8Array} a signature of this private key over the given message
     */
    sign(messageBytes: Buffer): Promise<Uint8Array>;
    /**
     * Sign the given message using the edcsa sign_deterministic function.
     * @param {Buffer} messageBytes: the message that will be hashed and signed, a Buffer made of bytes
     * @returns {Uint8Array} a signature of this private key over the given message
     */
    signEcda(messageBytes: Buffer): Promise<Uint8Array>;
    /**
     * Sign the given message using the wallet's _signingKey function.
     * @param {string} messageHashedBytes: the message that will be signed, a Buffer made of bytes
     * @returns {Uint8Array} a signature of this private key over the given message
     */
    signHashed(messageHashedBytes: Buffer): Promise<Uint8Array>;
    /**
     * Sign the given message using the edcsa sign_deterministic function.
     * @param {Buffer} messageHashedBytes: the message that will be signed, a Buffer made of bytes
     * @returns {Uint8Array} a signature of this private key over the given message
     */
    signHashedEcda(messageHashedBytes: Buffer): Promise<Uint8Array>;
    /**
     * Sign the given typed data using the edcsa sign_deterministic function.
     * @param {Buffer} eip712Data: the typed data that will be hashed and signed, a Buffer made of bytes
     * @returns {Uint8Array} a signature of this private key over the given message
     */
    signTypedData(eip712Data: any): Promise<Uint8Array>;
    /**
     * Sign the given typed data using the edcsa sign_deterministic function.
     * @param {Buffer} eip712Data: the typed data that will be signed, a Buffer made of bytes
     * @returns {Uint8Array} a signature of this private key over the given message
     */
    signHashedTypedData(eip712Data: Buffer): Promise<Uint8Array>;
}
