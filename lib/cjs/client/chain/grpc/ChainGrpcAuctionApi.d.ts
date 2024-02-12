import { InjectiveAuctionV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcAuctionApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveAuctionV1Beta1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchModuleParams(): Promise<import("../types").AuctionModuleStateParams>;
    fetchModuleState(): Promise<import("../types").AuctionModuleState>;
    fetchCurrentBasket(): Promise<import("../types").CurrentBasket>;
}
