export declare const BECH32_PUBKEY_ACC_PREFIX = "injpub";
export declare const BECH32_PUBKEY_VAL_PREFIX = "injvaloperpub";
export declare const BECH32_PUBKEY_CONS_PREFIX = "injvalconspub";
export declare const BECH32_ADDR_ACC_PREFIX = "dym";
export declare const BECH32_ADDR_VAL_PREFIX = "injvaloper";
export declare const BECH32_ADDR_CONS_PREFIX = "injvalcons";
export declare const DEFAULT_DERIVATION_PATH = "m/44'/60'/0'/0/0";
/** @deprecated - use the one in @injectivelabs/networks */
export declare const CW20_ADAPTER_CONTRACT_BY_NETWORK: {
    mainnet: string;
    mainnetLB: string;
    mainnetK8s: string;
    mainnetSentry: string;
    public: string;
    staging: string;
    internal: string;
    testnet: string;
    testnetK8s: string;
    testnetSentry: string;
    testnetOld: string;
    devnet: string;
    devnet1: string;
    devnet2: string;
    local: string;
};
/** @deprecated - use the one in @injectivelabs/networks */
export declare const CW20_SWAP_CONTRACT_BY_NETWORK: {
    mainnet: string;
    mainnetLB: string;
    mainnetK8s: string;
    mainnetSentry: string;
    public: string;
    staging: string;
    internal: string;
    testnet: string;
    testnetK8s: string;
    testnetSentry: string;
    testnetOld: string;
    devnet: string;
    devnet1: string;
    devnet2: string;
    local: string;
};
/** @deprecated - use the one in @injectivelabs/networks */
export declare const INCENTIVES_CONTRACT_BY_NETWORK: {
    mainnet: string;
    mainnetLB: string;
    mainnetK8s: string;
    mainnetSentry: string;
    public: string;
    staging: string;
    internal: string;
    testnet: string;
    testnetK8s: string;
    testnetSentry: string;
    testnetOld: string;
    devnet: string;
    devnet1: string;
    devnet2: string;
    local: string;
};
/** @deprecated - use the one in @injectivelabs/networks */
export declare const INJ_NAME_REGISTRY_CONTRACT_BY_NETWORK: {
    mainnet: string;
    mainnetLB: string;
    mainnetK8s: string;
    mainnetSentry: string;
    public: string;
    staging: string;
    internal: string;
    testnet: string;
    testnetK8s: string;
    testnetSentry: string;
    testnetOld: string;
    devnet: string;
    devnet1: string;
    devnet2: string;
    local: string;
};
/** @deprecated - use the one in @injectivelabs/networks */
export declare const INJ_NAME_REVERSE_RESOLVER_CONTRACT_BY_NETWORK: {
    mainnet: string;
    mainnetLB: string;
    mainnetK8s: string;
    mainnetSentry: string;
    public: string;
    staging: string;
    internal: string;
    testnet: string;
    testnetK8s: string;
    testnetSentry: string;
    testnetOld: string;
    devnet: string;
    devnet1: string;
    devnet2: string;
    local: string;
};
export declare const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export declare const INJ_DENOM = "dym";
export declare const INJECTIVE_DENOM = "dym";
export declare const DEFAULT_FEE_DENOM = "dym";
export declare const DEFAULT_GAS_LIMIT = 250000;
export declare const DEFAULT_IBC_GAS_LIMIT = 250000;
export declare const DEFAULT_GAS_PRICE = 20000000000;
export declare const DEFAULT_EXCHANGE_LIMIT = 200000;
export declare const DEFAULT_BRIDGE_FEE_DENOM = "dym";
export declare const DEFAULT_BRIDGE_FEE_PRICE = "20000000000";
export declare const DEFAULT_BRIDGE_FEE_AMOUNT = "200000000000000";
export declare const DEFAULT_BLOCK_TIMEOUT_HEIGHT = 90;
export declare const DEFAULT_BLOCK_TIME_IN_SECONDS = 2;
export declare const DEFAULT_TX_BLOCK_INCLUSION_TIMEOUT_IN_MS: number;
export declare const DEFAULT_TIMESTAMP_TIMEOUT_MS: number;
export declare const DEFAULT_STD_FEE: {
    amount: {
        amount: string;
        denom: string;
    }[];
    gas: string;
};
export declare const DEFAULT_STD_FEE_BY_DENOM: (denom?: string) => {
    amount: {
        denom: string;
        amount: string;
    }[];
    gas: string;
};
