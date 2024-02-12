import { CosmosBankV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { PaginationOption } from '../../../types/pagination';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcBankApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: CosmosBankV1Beta1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchModuleParams(): Promise<import("../types").BankModuleParams>;
    fetchBalance({ accountAddress, denom, }: {
        accountAddress: string;
        denom: string;
    }): Promise<import("@injectivelabs/ts-types").Coin>;
    fetchBalances(address: string, pagination?: PaginationOption): Promise<{
        balances: import("@injectivelabs/ts-types").Coin[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchTotalSupply(pagination?: PaginationOption): Promise<{
        supply: import("../types").TotalSupply;
        pagination: import("../../../types/pagination").Pagination;
    }>;
    /** a way to ensure all total supply is fully fetched */
    fetchAllTotalSupply(pagination?: PaginationOption): Promise<{
        supply: import("../types").TotalSupply;
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchSupplyOf(denom: string): Promise<import("@injectivelabs/ts-types").Coin>;
    fetchDenomsMetadata(pagination?: PaginationOption): Promise<{
        metadatas: import("@injectivelabs/core-proto-ts/cjs/cosmos/bank/v1beta1/bank").Metadata[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchDenomMetadata(denom: string): Promise<import("@injectivelabs/core-proto-ts/cjs/cosmos/bank/v1beta1/bank").Metadata>;
}
