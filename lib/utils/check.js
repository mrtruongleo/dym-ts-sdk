"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWithChainIdPrefix = exports.startWithPrefix = void 0;
const prefixs = ["inj", "evmos", "dym"];
const chainIdPrefixs = ["injective", "dymension", "evmos"];
const startWithPrefix = (address) => {
    return prefixs.some((substr) => address.startsWith(substr));
};
exports.startWithPrefix = startWithPrefix;
const startWithChainIdPrefix = (chainId) => {
    return chainIdPrefixs.some((substr) => chainId.startsWith(substr));
};
exports.startWithChainIdPrefix = startWithChainIdPrefix;
