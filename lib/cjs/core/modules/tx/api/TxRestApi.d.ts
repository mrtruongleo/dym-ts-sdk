import { HttpClient } from '@injectivelabs/utils';
import { TxClientBroadcastOptions, TxConcreteApi } from '../types/tx';
import { TxResponse } from '../types/tx';
import { CosmosTxV1Beta1Tx } from '@injectivelabs/core-proto-ts';
/**
 * It is recommended to use TxGrpcClient instead of TxRestApi
 */
export declare class TxRestApi implements TxConcreteApi {
    httpClient: HttpClient;
    constructor(endpoint: string, options?: {
        timeout?: number;
    });
    fetchTx(txHash: string, params?: any): Promise<TxResponse>;
    fetchTxPoll(txHash: string, timeout?: number): Promise<TxResponse>;
    simulate(txRaw: CosmosTxV1Beta1Tx.TxRaw): Promise<{
        result: {
            data: string;
            log: string;
            eventsList: {
                type: string;
                attributes: {
                    key: string;
                    value: string;
                }[];
            }[];
        };
        gasInfo: {
            gasWanted: number;
            gasUsed: number;
        };
    }>;
    broadcast(tx: CosmosTxV1Beta1Tx.TxRaw, options?: TxClientBroadcastOptions): Promise<TxResponse>;
    /**
     * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
     * @param tx transaction to broadcast
     */
    broadcastBlock(tx: CosmosTxV1Beta1Tx.TxRaw): Promise<{
        txHash: string;
        rawLog: string;
        gasWanted: number;
        gasUsed: number;
        height: number;
        logs: import("../types/tx-rest-client").RestTxLog[];
        code: number;
        codespace: string;
        data: string;
        info: string;
        timestamp: string;
    }>;
    private broadcastTx;
    private getRaw;
    private postRaw;
}
