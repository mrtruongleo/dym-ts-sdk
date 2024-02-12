import { IndexerGrpcAccountStream } from './grpc_stream/IndexerGrpcAccountStream';
import { IndexerGrpcAccountPortfolioStream } from './grpc_stream/IndexerGrpcAccountPortfolioStream';
import { IndexerGrpcAuctionStream } from './grpc_stream/IndexerGrpcAuctionStream';
import { IndexerGrpcDerivativesStream } from './grpc_stream/IndexerGrpcDerivativesStream';
import { IndexerGrpcOracleStream } from './grpc_stream/IndexerGrpcOracleStream';
import { IndexerGrpcSpotStream } from './grpc_stream/IndexerGrpcSpotStream';
import { IndexerGrpcExplorerStream } from './grpc_stream/IndexerGrpcExplorerStream';
/**
 * @category Indexer Grpc API
 * @hidden
 */
export declare class IndexerGrpcStreamClient {
    derivatives: IndexerGrpcDerivativesStream;
    spot: IndexerGrpcSpotStream;
    account: IndexerGrpcAccountStream;
    accountPortfolio: IndexerGrpcAccountPortfolioStream;
    auction: IndexerGrpcAuctionStream;
    oracle: IndexerGrpcOracleStream;
    explorer: IndexerGrpcExplorerStream;
    constructor(endpoint: string);
}
