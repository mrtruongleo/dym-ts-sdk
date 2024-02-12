"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcExplorerStream = void 0;
const transformers_1 = require("../transformers");
const BaseIndexerGrpcWebConsumer_1 = require("../../base/BaseIndexerGrpcWebConsumer");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
/**
 * @category Indexer Grpc Stream
 */
class IndexerGrpcExplorerStream {
    client;
    constructor(endpoint) {
        this.client = new indexer_proto_ts_1.InjectiveExplorerRpc.InjectiveExplorerRPCClientImpl((0, BaseIndexerGrpcWebConsumer_1.getGrpcIndexerWebImpl)(endpoint));
    }
    streamBlocks({ callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveExplorerRpc.StreamBlocksRequest.create();
        const subscription = this.client.StreamBlocks(request).subscribe({
            next(response) {
                callback(transformers_1.ExplorerStreamTransformer.blocksStreamCallback(response));
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
        const request = indexer_proto_ts_1.InjectiveExplorerRpc.StreamBlocksRequest.create();
        const subscription = this.client.StreamBlocks(request).subscribe({
            next(response) {
                callback(transformers_1.ExplorerStreamTransformer.blocksWithTxsStreamCallback(response));
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
        const request = indexer_proto_ts_1.InjectiveExplorerRpc.StreamTxsRequest.create();
        const subscription = this.client.StreamTxs(request).subscribe({
            next(response) {
                callback(transformers_1.ExplorerStreamTransformer.transactionsStreamCallback(response));
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
exports.IndexerGrpcExplorerStream = IndexerGrpcExplorerStream;
//# sourceMappingURL=IndexerGrpcExplorerStream.js.map