import { ExplorerStreamTransformer } from '../transformers';
import { getGrpcIndexerWebImpl } from '../../base/BaseIndexerGrpcWebConsumer';
import { InjectiveExplorerRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Grpc Stream
 */
export class IndexerGrpcExplorerStream {
    constructor(endpoint) {
        this.client = new InjectiveExplorerRpc.InjectiveExplorerRPCClientImpl(getGrpcIndexerWebImpl(endpoint));
    }
    streamBlocks({ callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveExplorerRpc.StreamBlocksRequest.create();
        const subscription = this.client.StreamBlocks(request).subscribe({
            next(response) {
                callback(ExplorerStreamTransformer.blocksStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamBlocksWithTxs({ callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveExplorerRpc.StreamBlocksRequest.create();
        const subscription = this.client.StreamBlocks(request).subscribe({
            next(response) {
                callback(ExplorerStreamTransformer.blocksWithTxsStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamTransactions({ callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveExplorerRpc.StreamTxsRequest.create();
        const subscription = this.client.StreamTxs(request).subscribe({
            next(response) {
                callback(ExplorerStreamTransformer.transactionsStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
}
