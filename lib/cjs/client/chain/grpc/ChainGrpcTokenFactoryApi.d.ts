import { InjectiveTokenFactoryV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
/**
 * @category TokenFactory Grpc API
 */
export declare class ChainGrpcTokenFactoryApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveTokenFactoryV1Beta1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchDenomsFromCreator(creator: string): Promise<string[]>;
    fetchDenomAuthorityMetadata(creator: string, subDenom: string): Promise<import("..").AuthorityMetadata>;
    fetchModuleParams(): Promise<import("..").TokenFactoryModuleParams>;
    fetchModuleState(): Promise<import("..").TokenFactoryModuleState>;
}
