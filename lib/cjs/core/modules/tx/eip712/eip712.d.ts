import { EthereumChainId } from '@injectivelabs/ts-types';
import { Msgs } from '../../msgs';
import { Eip712ConvertFeeArgs, Eip712ConvertTxArgs } from './types';
export declare const getEip712TypedData: ({ msgs, tx, fee, ethereumChainId, }: {
    msgs: Msgs | Msgs[];
    tx: Eip712ConvertTxArgs;
    fee?: Eip712ConvertFeeArgs | undefined;
    ethereumChainId: EthereumChainId;
}) => {
    message: {
        msgs: {
            type: string;
            value: Record<string, unknown>;
        }[];
        fee: {
            amount: {
                amount: string;
                denom: string;
            }[];
            gas: string;
            feePayer?: string | undefined;
        };
        account_number: string;
        chain_id: string;
        sequence: string;
        timeout_height: string;
        memo: string;
    };
    domain: {
        name: string;
        version: string;
        chainId: string;
        salt: string;
        verifyingContract: string;
    };
    primaryType: string;
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        Tx: {
            name: string;
            type: string;
        }[];
        Fee: {
            name: string;
            type: string;
        }[];
        Coin: {
            name: string;
            type: string;
        }[];
        Msg: {
            name: string;
            type: string;
        }[];
    };
};
export declare const getEip712TypedDataV2: ({ msgs, tx, fee, ethereumChainId, }: {
    msgs: Msgs | Msgs[];
    tx: Eip712ConvertTxArgs;
    fee?: Eip712ConvertFeeArgs | undefined;
    ethereumChainId: EthereumChainId;
}) => {
    message: {
        context: string;
        msgs: string;
    };
    domain: {
        name: string;
        version: string;
        chainId: string;
        verifyingContract: string;
        salt: string;
    };
    primaryType: string;
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        Tx: {
            name: string;
            type: string;
        }[];
    };
};
