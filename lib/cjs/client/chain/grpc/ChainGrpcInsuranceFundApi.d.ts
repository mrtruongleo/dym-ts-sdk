import { InjectiveInsuranceV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcInsuranceFundApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveInsuranceV1Beta1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchModuleParams(): Promise<import("../types").InsuranceModuleParams>;
    fetchInsuranceFunds(): Promise<import("../types").InsuranceFund[]>;
    fetchInsuranceFund(marketId: string): Promise<import("../types").InsuranceFund>;
    fetchEstimatedRedemptions({ marketId, address, }: {
        marketId: string;
        address: string;
    }): Promise<{
        amount: string;
        denom: string;
    }[]>;
    fetchPendingRedemptions({ marketId, address, }: {
        marketId: string;
        address: string;
    }): Promise<{
        amount: string;
        denom: string;
    }[]>;
}
