const prefixs = ["inj", "evmos", "dym"];
const chainIdPrefixs = ["injective", "dymension", "evmos"];
export const startWithPrefix = (address: string) => {
  return prefixs.some((substr) => address.startsWith(substr));
};
export const startWithChainIdPrefix = (chainId: string) => {
  return chainIdPrefixs.some((substr) => chainId.startsWith(substr));
};
