import { TxConcreteApi, TxClientBroadcastOptions, TxClientBroadcastResponse } from '../types/tx';
import { TxResponse } from '../types/tx';
import { CosmosTxV1Beta1Service, CosmosTxV1Beta1Tx } from '@injectivelabs/core-proto-ts';
export declare class TxGrpcApi implements TxConcreteApi {
    txService: CosmosTxV1Beta1Service.ServiceClientImpl;
    endpoint: string;
    constructor(endpoint: string);
    fetchTx(hash: string): Promise<TxResponse>;
    fetchTxPoll(txHash: string, timeout?: number): Promise<TxResponse>;
    simulate(txRaw: CosmosTxV1Beta1Tx.TxRaw): Promise<{
        result: {
            data: string | Uint8Array;
            log: string;
            eventsList: import("@injectivelabs/core-proto-ts/cjs/tendermint/abci/types").Event[];
            events?: import("@injectivelabs/core-proto-ts/cjs/tendermint/abci/types").Event[] | undefined;
            msgResponses?: import("@injectivelabs/core-proto-ts/cjs/google/protobuf/any").Any[] | undefined;
        };
        gasInfo: {
            gasWanted: number;
            gasUsed: number;
        };
    }>;
    broadcast(txRaw: CosmosTxV1Beta1Tx.TxRaw, options?: TxClientBroadcastOptions): Promise<TxResponse>;
    broadcastBlock(txRaw: CosmosTxV1Beta1Tx.TxRaw, broadcastMode?: CosmosTxV1Beta1Service.BroadcastMode): Promise<TxClientBroadcastResponse>;
}
