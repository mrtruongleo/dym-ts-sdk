import { InjectiveInsuranceRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
/**
 * @category Indexer Grpc API
 */
export declare class IndexerGrpcInsuranceFundApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveInsuranceRpc.InjectiveInsuranceRPCClientImpl;
    constructor(endpoint: string);
    fetchRedemptions({ denom, address, status, }: {
        address: string;
        denom?: string;
        status?: string;
    }): Promise<import("../types").Redemption[]>;
    fetchInsuranceFunds(): Promise<import("../types").IndexerInsuranceFund[]>;
}
