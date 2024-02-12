import { CosmosAuthV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { PaginationOption } from '../../../types/pagination';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcAuthApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: CosmosAuthV1Beta1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchModuleParams(): Promise<import("../types").AuthModuleParams>;
    fetchAccount(address: string): Promise<import("../types").Account>;
    fetchAccounts(pagination?: PaginationOption): Promise<{
        pagination: import("../../../types/pagination").Pagination;
        accounts: import("../types").Account[];
    }>;
}
