import { CosmwasmWasmV1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { PaginationOption } from '../../../types/pagination';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcWasmApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: CosmwasmWasmV1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchContractAccountsBalance({ contractAddress, pagination, }: {
        contractAddress: string;
        pagination?: PaginationOption;
    }): Promise<import("../types").ContractAccountsBalanceWithPagination>;
    fetchContractState({ contractAddress, pagination, }: {
        contractAddress: string;
        pagination?: PaginationOption;
    }): Promise<import("../types").ContractStateWithPagination>;
    fetchContractInfo(contractAddress: string): Promise<import("../types").ContractInfo | undefined>;
    fetchContractHistory(contractAddress: string): Promise<{
        entriesList: import("../types").ContractCodeHistoryEntry[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchSmartContractState(contractAddress: string, query?: string | Record<string, any>): Promise<CosmwasmWasmV1Query.QuerySmartContractStateResponse>;
    fetchRawContractState(contractAddress: string, query?: string): Promise<CosmwasmWasmV1Query.QueryRawContractStateResponse>;
    fetchContractCodes(pagination?: PaginationOption): Promise<{
        codeInfosList: import("../types").CodeInfoResponse[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchContractCode(codeId: number): Promise<{
        codeInfo: import("../types").CodeInfoResponse;
        data: Uint8Array;
    }>;
    fetchContractCodeContracts(codeId: number, pagination?: PaginationOption): Promise<{
        contractsList: string[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
}
