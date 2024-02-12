import { IndexerAuctionStreamTransformer } from '../transformers';
import { getGrpcIndexerWebImpl } from '../../base/BaseIndexerGrpcWebConsumer';
import { InjectiveAuctionRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Grpc Stream
 */
export class IndexerGrpcAuctionStream {
    constructor(endpoint) {
        this.client = new InjectiveAuctionRpc.InjectiveAuctionRPCClientImpl(getGrpcIndexerWebImpl(endpoint));
    }
    streamBids({ callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveAuctionRpc.StreamBidsRequest.create();
        const subscription = this.client.StreamBids(request).subscribe({
            next(response) {
                callback(IndexerAuctionStreamTransformer.bidsStreamCallback(response));
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
