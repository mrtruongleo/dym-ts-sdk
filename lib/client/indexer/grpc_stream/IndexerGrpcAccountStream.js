import { IndexerAccountStreamTransformer } from '../transformers';
import { getGrpcIndexerWebImpl } from '../../base/BaseIndexerGrpcWebConsumer';
import { InjectiveAccountRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Grpc Stream
 */
export class IndexerGrpcAccountStream {
    constructor(endpoint) {
        this.client = new InjectiveAccountRpc.InjectiveAccountsRPCClientImpl(getGrpcIndexerWebImpl(endpoint));
    }
    streamSubaccountBalance({ subaccountId, callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveAccountRpc.StreamSubaccountBalanceRequest.create();
        request.subaccountId = subaccountId;
        const subscription = this.client
            .StreamSubaccountBalance(request)
            .subscribe({
            next(response) {
                callback(IndexerAccountStreamTransformer.balanceStreamCallback(response));
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
