const prefixs = ["inj", "evmos", "dym"];
const chainIdPrefixs = ["injective", "dymension", "evmos"];
export const startWithPrefix = (address) => {
    return prefixs.some((substr) => address.startsWith(substr));
};
export const startWithChainIdPrefix = (chainId) => {
    return chainIdPrefixs.some((substr) => chainId.startsWith(substr));
};
