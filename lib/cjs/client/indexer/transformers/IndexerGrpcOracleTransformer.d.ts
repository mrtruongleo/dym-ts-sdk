import { GrpcOracle, Oracle } from '../types/oracle';
import { InjectiveOracleRpc } from '@injectivelabs/indexer-proto-ts';
export declare class IndexerGrpcOracleTransformer {
    static oraclesResponseToOracles(response: InjectiveOracleRpc.OracleListResponse): Oracle[];
    static grpcOracleToOracle(grpcOracle: GrpcOracle): Oracle;
}
