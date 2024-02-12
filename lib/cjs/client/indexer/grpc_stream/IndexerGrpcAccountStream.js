"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcAccountStream = void 0;
const transformers_1 = require("../transformers");
const BaseIndexerGrpcWebConsumer_1 = require("../../base/BaseIndexerGrpcWebConsumer");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
/**
 * @category Indexer Grpc Stream
 */
class IndexerGrpcAccountStream {
    client;
    constructor(endpoint) {
        this.client = new indexer_proto_ts_1.InjectiveAccountRpc.InjectiveAccountsRPCClientImpl((0, BaseIndexerGrpcWebConsumer_1.getGrpcIndexerWebImpl)(endpoint));
    }
    streamSubaccountBalance({ subaccountId, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveAccountRpc.StreamSubaccountBalanceRequest.create();
        request.subaccountId = subaccountId;
        const subscription = this.client
            .StreamSubaccountBalance(request)
            .subscribe({
            next(response) {
                callback(transformers_1.IndexerAccountStreamTransformer.balanceStreamCallback(response));
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
exports.IndexerGrpcAccountStream = IndexerGrpcAccountStream;
//# sourceMappingURL=IndexerGrpcAccountStream.js.map