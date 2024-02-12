import { InjectivePeggyV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcPeggyApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectivePeggyV1Beta1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchModuleParams(): Promise<import("../types").PeggyModuleParams>;
}
