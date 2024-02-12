import { IndexerGrpcMetaApi } from './grpc/IndexerGrpcMetaApi';
import { IndexerGrpcAccountApi } from './grpc/IndexerGrpcAccountApi';
import { IndexerGrpcAccountPortfolioApi } from './grpc/IndexerGrpcPortfolioApi';
import { IndexerGrpcAuctionApi } from './grpc/IndexerGrpcAuctionApi';
import { IndexerGrpcExplorerApi } from './grpc/IndexerGrpcExplorerApi';
import { IndexerGrpcOracleApi } from './grpc/IndexerGrpcOracleApi';
import { IndexerGrpcInsuranceFundApi } from './grpc/IndexerGrpcInsuranceFundApi';
import { IndexerGrpcDerivativesApi } from './grpc/IndexerGrpcDerivativesApi';
import { IndexerGrpcSpotApi } from './grpc/IndexerGrpcSpotApi';
/**
 * @category Indexer Grpc API
 * @hidden
 */
export declare class IndexerGrpcClient {
    account: IndexerGrpcAccountApi;
    accountPortfolio: IndexerGrpcAccountPortfolioApi;
    auction: IndexerGrpcAuctionApi;
    explorer: IndexerGrpcExplorerApi;
    meta: IndexerGrpcMetaApi;
    oracle: IndexerGrpcOracleApi;
    insuranceFund: IndexerGrpcInsuranceFundApi;
    derivatives: IndexerGrpcDerivativesApi;
    spot: IndexerGrpcSpotApi;
    constructor(endpoint: string);
}
