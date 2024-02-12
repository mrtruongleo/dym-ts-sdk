import { IndexerAccountPortfolioStreamTransformer } from '../transformers';
import { getGrpcIndexerWebImpl } from '../../base/BaseIndexerGrpcWebConsumer';
import { InjectivePortfolioRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Grpc Stream
 */
export class IndexerGrpcAccountPortfolioStream {
    client;
    constructor(endpoint) {
        this.client = new InjectivePortfolioRpc.InjectivePortfolioRPCClientImpl(getGrpcIndexerWebImpl(endpoint));
    }
    streamAccountPortfolio({ subaccountId, accountAddress, type, callback, onEndCallback, onStatusCallback, }) {
        const request = InjectivePortfolioRpc.StreamAccountPortfolioRequest.create();
        request.accountAddress = accountAddress;
        if (subaccountId) {
            request.subaccountId = subaccountId;
        }
        if (type) {
            request.type = type;
        }
        const subscription = this.client.StreamAccountPortfolio(request).subscribe({
            next(response) {
                callback(IndexerAccountPortfolioStreamTransformer.accountPortfolioStreamCallback(response));
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
