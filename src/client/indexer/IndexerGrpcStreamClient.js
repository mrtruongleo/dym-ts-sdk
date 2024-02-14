"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcStreamClient = void 0;
const IndexerGrpcAccountStream_1 = require("./grpc_stream/IndexerGrpcAccountStream");
const IndexerGrpcAccountPortfolioStream_1 = require("./grpc_stream/IndexerGrpcAccountPortfolioStream");
const IndexerGrpcAuctionStream_1 = require("./grpc_stream/IndexerGrpcAuctionStream");
const IndexerGrpcDerivativesStream_1 = require("./grpc_stream/IndexerGrpcDerivativesStream");
const IndexerGrpcOracleStream_1 = require("./grpc_stream/IndexerGrpcOracleStream");
const IndexerGrpcSpotStream_1 = require("./grpc_stream/IndexerGrpcSpotStream");
const IndexerGrpcExplorerStream_1 = require("./grpc_stream/IndexerGrpcExplorerStream");
/**
 * @category Indexer Grpc API
 * @hidden
 */
class IndexerGrpcStreamClient {
    constructor(endpoint) {
        this.account = new IndexerGrpcAccountStream_1.IndexerGrpcAccountStream(endpoint);
        this.accountPortfolio = new IndexerGrpcAccountPortfolioStream_1.IndexerGrpcAccountPortfolioStream(endpoint);
        this.auction = new IndexerGrpcAuctionStream_1.IndexerGrpcAuctionStream(endpoint);
        this.derivatives = new IndexerGrpcDerivativesStream_1.IndexerGrpcDerivativesStream(endpoint);
        this.explorer = new IndexerGrpcExplorerStream_1.IndexerGrpcExplorerStream(endpoint);
        this.oracle = new IndexerGrpcOracleStream_1.IndexerGrpcOracleStream(endpoint);
        this.spot = new IndexerGrpcSpotStream_1.IndexerGrpcSpotStream(endpoint);
    }
}
exports.IndexerGrpcStreamClient = IndexerGrpcStreamClient;
