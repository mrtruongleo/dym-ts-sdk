"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcAccountPortfolioStream = void 0;
const transformers_1 = require("../transformers");
const BaseIndexerGrpcWebConsumer_1 = require("../../base/BaseIndexerGrpcWebConsumer");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
/**
 * @category Indexer Grpc Stream
 */
class IndexerGrpcAccountPortfolioStream {
    constructor(endpoint) {
        this.client = new indexer_proto_ts_1.InjectivePortfolioRpc.InjectivePortfolioRPCClientImpl((0, BaseIndexerGrpcWebConsumer_1.getGrpcIndexerWebImpl)(endpoint));
    }
    streamAccountPortfolio({ subaccountId, accountAddress, type, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectivePortfolioRpc.StreamAccountPortfolioRequest.create();
        request.accountAddress = accountAddress;
        if (subaccountId) {
            request.subaccountId = subaccountId;
        }
        if (type) {
            request.type = type;
        }
        const subscription = this.client.StreamAccountPortfolio(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerAccountPortfolioStreamTransformer.accountPortfolioStreamCallback(response));
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
exports.IndexerGrpcAccountPortfolioStream = IndexerGrpcAccountPortfolioStream;
