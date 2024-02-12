import { IndexerGrpcExplorerTransformer } from './IndexerGrpcExplorerTransformer';
import { StreamOperation } from '../../../types';
/**
 * @category Indexer Stream Transformer
 */
export class ExplorerStreamTransformer {
    static blocksStreamCallback = (response) => ({
        block: IndexerGrpcExplorerTransformer.grpcBlockToBlock(response),
        operation: StreamOperation.Insert,
    });
    static blocksWithTxsStreamCallback = (response) => ({
        block: IndexerGrpcExplorerTransformer.grpcBlockToBlockWithTxs(response),
        operation: StreamOperation.Insert,
    });
    static transactionsStreamCallback = (response) => ({
        block: IndexerGrpcExplorerTransformer.streamTxResponseToTxs(response),
        operation: StreamOperation.Insert,
    });
}
