"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcAuctionStream = void 0;
const transformers_1 = require("../transformers");
const BaseIndexerGrpcWebConsumer_1 = require("../../base/BaseIndexerGrpcWebConsumer");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
/**
 * @category Indexer Grpc Stream
 */
class IndexerGrpcAuctionStream {
    client;
    constructor(endpoint) {
        this.client = new indexer_proto_ts_1.InjectiveAuctionRpc.InjectiveAuctionRPCClientImpl((0, BaseIndexerGrpcWebConsumer_1.getGrpcIndexerWebImpl)(endpoint));
    }
    streamBids({ callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveAuctionRpc.StreamBidsRequest.create();
        const subscription = this.client.StreamBids(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerAuctionStreamTransformer.bidsStreamCallback(response));
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
exports.IndexerGrpcAuctionStream = IndexerGrpcAuctionStream;
//# sourceMappingURL=IndexerGrpcAuctionStream.js.map