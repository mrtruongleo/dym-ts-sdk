import { StreamOperation } from '../../../types';
import { InjectiveExplorerRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Stream Transformer
 */
export declare class ExplorerStreamTransformer {
    static blocksStreamCallback: (response: InjectiveExplorerRpc.StreamBlocksResponse) => {
        block: import("..").Block;
        operation: StreamOperation;
    };
    static blocksWithTxsStreamCallback: (response: InjectiveExplorerRpc.StreamBlocksResponse) => {
        block: import("..").BlockWithTxs;
        operation: StreamOperation;
    };
    static transactionsStreamCallback: (response: InjectiveExplorerRpc.StreamTxsResponse) => {
        block: import("..").IndexerStreamTransaction;
        operation: StreamOperation;
    };
}
