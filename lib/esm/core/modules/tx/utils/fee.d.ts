export declare const getStdFeeForToken: (token?: {
    denom: string;
    decimals: number;
}, gasPrice?: string, gasLimit?: string) => {
    amount: {
        denom: string;
        amount: string;
    }[];
    gas: string;
};
export declare const getStdFeeFromObject: (args?: {
    gas?: string | number;
    payer?: string;
    granter?: string;
    gasPrice?: string | number;
    feePayer?: string;
}) => {
    amount: {
        amount: string;
        denom: string;
    }[];
    gas: string;
} | {
    amount: {
        denom: string;
        amount: string;
    }[];
    gas: string;
    payer: string | undefined; /** for Web3Gateway fee delegation */
    granter: string | undefined;
    feePayer: string | undefined;
};
export declare const getDefaultStdFee: () => {
    amount: {
        amount: string;
        denom: string;
    }[];
    gas: string;
};
export declare const getStdFeeFromString: (gasPrice: string) => {
    amount: {
        amount: string;
        denom: string;
    }[];
    gas: string;
} | {
    amount: {
        denom: string;
        amount: string;
    }[];
    gas: string;
    payer: string | undefined; /** for Web3Gateway fee delegation */
    granter: string | undefined;
    feePayer: string | undefined;
};
export declare const getStdFee: (args?: string | {
    gas?: string | number;
    payer?: string;
    granter?: string;
    gasPrice?: string | number;
    feePayer?: string;
}) => {
    amount: {
        amount: string;
        denom: string;
    }[];
    gas: string;
};
