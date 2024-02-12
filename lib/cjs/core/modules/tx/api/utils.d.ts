import { TxResponse } from '../types';
export declare const waitTxBroadcasted: (txHash: string, options: {
    endpoints: {
        grpc?: string;
        rest: string;
    };
    txTimeout?: number;
}) => Promise<TxResponse>;
