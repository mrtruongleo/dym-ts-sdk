"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcClient = void 0;
const IndexerGrpcMetaApi_1 = require("./grpc/IndexerGrpcMetaApi");
const IndexerGrpcAccountApi_1 = require("./grpc/IndexerGrpcAccountApi");
const IndexerGrpcPortfolioApi_1 = require("./grpc/IndexerGrpcPortfolioApi");
const IndexerGrpcAuctionApi_1 = require("./grpc/IndexerGrpcAuctionApi");
const IndexerGrpcExplorerApi_1 = require("./grpc/IndexerGrpcExplorerApi");
const IndexerGrpcOracleApi_1 = require("./grpc/IndexerGrpcOracleApi");
const IndexerGrpcInsuranceFundApi_1 = require("./grpc/IndexerGrpcInsuranceFundApi");
const IndexerGrpcDerivativesApi_1 = require("./grpc/IndexerGrpcDerivativesApi");
const IndexerGrpcSpotApi_1 = require("./grpc/IndexerGrpcSpotApi");
/**
 * @category Indexer Grpc API
 * @hidden
 */
class IndexerGrpcClient {
    account;
    accountPortfolio;
    auction;
    explorer;
    meta;
    oracle;
    insuranceFund;
    derivatives;
    spot;
    constructor(endpoint) {
        this.account = new IndexerGrpcAccountApi_1.IndexerGrpcAccountApi(endpoint);
        this.accountPortfolio = new IndexerGrpcPortfolioApi_1.IndexerGrpcAccountPortfolioApi(endpoint);
        this.auction = new IndexerGrpcAuctionApi_1.IndexerGrpcAuctionApi(endpoint);
        this.explorer = new IndexerGrpcExplorerApi_1.IndexerGrpcExplorerApi(endpoint);
        this.meta = new IndexerGrpcMetaApi_1.IndexerGrpcMetaApi(endpoint);
        this.oracle = new IndexerGrpcOracleApi_1.IndexerGrpcOracleApi(endpoint);
        this.insuranceFund = new IndexerGrpcInsuranceFundApi_1.IndexerGrpcInsuranceFundApi(endpoint);
        this.derivatives = new IndexerGrpcDerivativesApi_1.IndexerGrpcDerivativesApi(endpoint);
        this.spot = new IndexerGrpcSpotApi_1.IndexerGrpcSpotApi(endpoint);
    }
}
exports.IndexerGrpcClient = IndexerGrpcClient;
//# sourceMappingURL=IndexerGrpcClient.js.map