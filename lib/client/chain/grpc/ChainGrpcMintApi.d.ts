import { CosmosMintV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcMintApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: CosmosMintV1Beta1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchModuleParams(): Promise<import("../types").MinModuleParams>;
    fetchInflation(): Promise<{
        inflation: string;
    }>;
    fetchAnnualProvisions(): Promise<{
        annualProvisions: string;
    }>;
}
