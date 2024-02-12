import { IndexerGrpcExplorerTransformer } from './IndexerGrpcExplorerTransformer';
import { StreamOperation } from '../../../types';
/**
 * @category Indexer Stream Transformer
 */
export class ExplorerStreamTransformer {
}
ExplorerStreamTransformer.blocksStreamCallback = (response) => ({
    block: IndexerGrpcExplorerTransformer.grpcBlockToBlock(response),
    operation: StreamOperation.Insert,
});
ExplorerStreamTransformer.blocksWithTxsStreamCallback = (response) => ({
    block: IndexerGrpcExplorerTransformer.grpcBlockToBlockWithTxs(response),
    operation: StreamOperation.Insert,
});
ExplorerStreamTransformer.transactionsStreamCallback = (response) => ({
    block: IndexerGrpcExplorerTransformer.streamTxResponseToTxs(response),
    operation: StreamOperation.Insert,
});
