import { InjectiveOracleRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
/**
 * @category Indexer Grpc API
 */
export declare class IndexerGrpcOracleApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveOracleRpc.InjectiveOracleRPCClientImpl;
    constructor(endpoint: string);
    fetchOracleList(): Promise<import("../types").Oracle[]>;
    fetchOraclePrice({ baseSymbol, quoteSymbol, oracleScaleFactor, oracleType, }: {
        baseSymbol: string;
        quoteSymbol: string;
        oracleType: string;
        oracleScaleFactor?: number;
    }): Promise<InjectiveOracleRpc.PriceResponse>;
    fetchOraclePriceNoThrow({ baseSymbol, quoteSymbol, oracleScaleFactor, oracleType, }: {
        baseSymbol: string;
        quoteSymbol: string;
        oracleType: string;
        oracleScaleFactor?: number;
    }): Promise<InjectiveOracleRpc.PriceResponse>;
}
