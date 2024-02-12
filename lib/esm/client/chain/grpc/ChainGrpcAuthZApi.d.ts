import { CosmosAuthzV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { PaginationOption } from '../../../types/pagination';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcAuthZApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: CosmosAuthzV1Beta1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchGrants({ pagination, granter, grantee, msgTypeUrl, }: {
        pagination?: PaginationOption;
        granter: string;
        grantee: string;
        msgTypeUrl?: string;
    }): Promise<{
        pagination: import("../../../types/pagination").Pagination;
        grants: {
            authorization: string;
            expiration: Date | undefined;
        }[];
    }>;
    fetchGranterGrants(granter: string, pagination?: PaginationOption): Promise<{
        pagination: import("../../../types/pagination").Pagination;
        grants: {
            granter: string;
            grantee: string;
            authorization: string;
            expiration: Date | undefined;
        }[];
    }>;
    fetchGranteeGrants(grantee: string, pagination?: PaginationOption): Promise<{
        pagination: import("../../../types/pagination").Pagination;
        grants: {
            granter: string;
            grantee: string;
            authorization: string;
            expiration: Date | undefined;
        }[];
    }>;
}
