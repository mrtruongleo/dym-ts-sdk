import { StreamStatusResponse } from '../types';
import { ExplorerStreamTransformer } from '../transformers';
import { Subscription } from 'rxjs';
import { InjectiveExplorerRpc } from '@injectivelabs/indexer-proto-ts';
export type BlocksStreamCallback = (response: ReturnType<typeof ExplorerStreamTransformer.blocksStreamCallback>) => void;
export type BlocksWithTxsStreamCallback = (response: ReturnType<typeof ExplorerStreamTransformer.blocksWithTxsStreamCallback>) => void;
export type TransactionsStreamCallback = (response: ReturnType<typeof ExplorerStreamTransformer.transactionsStreamCallback>) => void;
/**
 * @category Indexer Grpc Stream
 */
export declare class IndexerGrpcExplorerStream {
    protected client: InjectiveExplorerRpc.InjectiveExplorerRPCClientImpl;
    constructor(endpoint: string);
    streamBlocks({ callback, onEndCallback, onStatusCallback, }: {
        callback: BlocksStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamBlocksWithTxs({ callback, onEndCallback, onStatusCallback, }: {
        callback: BlocksWithTxsStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
    streamTransactions({ callback, onEndCallback, onStatusCallback, }: {
        callback: TransactionsStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
}
