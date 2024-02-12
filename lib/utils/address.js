"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCw20ContractAddress = exports.getChecksumAddress = exports.getAddressFromInjectiveAddress = exports.getSubaccountId = exports.getDefaultSubaccountId = exports.getInjectiveAddressFromSubaccountId = exports.getEthereumAddress = exports.getInjectiveAddress = void 0;
const bech32_1 = require("bech32");
const ethereumjs_util_1 = require("ethereumjs-util");
const keccak256_1 = __importDefault(require("keccak256"));
const __1 = require("..");
const check_1 = require("./check");
/**
 * Get injective address from Ethereum hex address
 *
 * @param ethAddress string
 * @returns string
 */
const getInjectiveAddress = (ethAddress) => {
    const addressBuffer = ethereumjs_util_1.Address.fromString(ethAddress.toString()).toBuffer();
    return bech32_1.bech32.encode(__1.AddressPrefix, bech32_1.bech32.toWords(addressBuffer));
};
exports.getInjectiveAddress = getInjectiveAddress;
/**
 * Get ethereum address from injective bech32 address
 *
 * @param injectiveAddress string
 * @returns string
 */
const getEthereumAddress = (injectiveAddress) => {
    if (injectiveAddress.startsWith("0x")) {
        return injectiveAddress;
    }
    return `0x${Buffer.from(bech32_1.bech32.fromWords(bech32_1.bech32.decode(injectiveAddress).words)).toString("hex")}`;
};
exports.getEthereumAddress = getEthereumAddress;
/**
 * Get ethereum address from injective bech32 address
 *
 * @param injectiveAddress string
 * @returns string
 */
const getInjectiveAddressFromSubaccountId = (subaccountId) => {
    const ethAddress = subaccountId.slice(0, 42);
    return (0, exports.getInjectiveAddress)(ethAddress);
};
exports.getInjectiveAddressFromSubaccountId = getInjectiveAddressFromSubaccountId;
/**
 * Get default subaccount id from injective bech32 address
 *
 * @param injectiveAddress string
 * @returns string
 */
const getDefaultSubaccountId = (injectiveAddress) => {
    return `0x${Buffer.from(bech32_1.bech32.fromWords(bech32_1.bech32.decode(injectiveAddress).words)).toString("hex")}${"0".repeat(24)}`;
};
exports.getDefaultSubaccountId = getDefaultSubaccountId;
/**
 * Get subaccount id from injective bech32 address and an index (defaults to 0)
 * @param injectiveAddress string
 * @param nonce number
 * @returns string
 */
const getSubaccountId = (injectiveAddress, nonce = 0) => {
    return `0x${Buffer.from(bech32_1.bech32.fromWords(bech32_1.bech32.decode(injectiveAddress).words)).toString("hex")}${"0".repeat(23)}${nonce}`;
};
exports.getSubaccountId = getSubaccountId;
/** @deprecated - use getEthereumAddress */
const getAddressFromInjectiveAddress = (address) => {
    if (address.startsWith("0x")) {
        return address;
    }
    return `0x${Buffer.from(bech32_1.bech32.fromWords(bech32_1.bech32.decode(address).words)).toString("hex")}`;
};
exports.getAddressFromInjectiveAddress = getAddressFromInjectiveAddress;
const getChecksumAddress = (ethAddress) => {
    const lowercasedAddress = ethAddress.toLowerCase().replace("0x", "");
    const addressHash = (0, keccak256_1.default)(lowercasedAddress)
        .toString("hex")
        .replace("0x", "");
    let checksumAddress = "0x";
    for (let i = 0; i < lowercasedAddress.length; i++) {
        if (parseInt(addressHash[i], 16) > 7) {
            checksumAddress += lowercasedAddress[i].toUpperCase();
        }
        else {
            checksumAddress += lowercasedAddress[i];
        }
    }
    return checksumAddress;
};
exports.getChecksumAddress = getChecksumAddress;
const isCw20ContractAddress = (address) => address.length === 42 && (0, check_1.startWithPrefix)(address);
exports.isCw20ContractAddress = isCw20ContractAddress;
