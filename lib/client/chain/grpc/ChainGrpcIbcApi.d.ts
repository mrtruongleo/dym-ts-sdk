import { IbcApplicationsTransferV1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { PaginationOption } from '../../../types/pagination';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcIbcApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: IbcApplicationsTransferV1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchDenomTrace(hash: string): Promise<import("@injectivelabs/core-proto-ts/cjs/ibc/applications/transfer/v1/transfer").DenomTrace>;
    fetchDenomsTrace(pagination?: PaginationOption): Promise<import("@injectivelabs/core-proto-ts/cjs/ibc/applications/transfer/v1/transfer").DenomTrace[]>;
}
