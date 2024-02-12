import { ContractAccountsBalanceWithPagination, ContractCodeHistoryEntry, ContractInfo, GrpcContractCodeHistoryEntry, grpcContractInfo, CodeInfoResponse, GrpcCodeInfoResponse, ContractStateWithPagination } from "../types/wasm";
import { CosmwasmWasmV1Query } from "@injectivelabs/core-proto-ts";
/**
 * @category Chain Grpc Transformer
 */
export declare class ChainGrpcWasmTransformer {
    static allContractStateResponseToContractAccountsBalanceWithPagination(response: CosmwasmWasmV1Query.QueryAllContractStateResponse): ContractAccountsBalanceWithPagination;
    static allContractStateResponseToContractState(response: CosmwasmWasmV1Query.QueryAllContractStateResponse): ContractStateWithPagination;
    static contactInfoResponseToContractInfo(contractInfo: grpcContractInfo): ContractInfo;
    static grpcContractCodeHistoryEntryToContractCodeHistoryEntry(entry: GrpcContractCodeHistoryEntry): ContractCodeHistoryEntry;
    static grpcCodeInfoResponseToCodeInfoResponse(info: GrpcCodeInfoResponse): CodeInfoResponse;
    static contactHistoryResponseToContractHistory(response: CosmwasmWasmV1Query.QueryContractHistoryResponse): {
        entriesList: ContractCodeHistoryEntry[];
        pagination: import("../../..").Pagination;
    };
    static contractCodesResponseToContractCodes(response: CosmwasmWasmV1Query.QueryCodesResponse): {
        codeInfosList: CodeInfoResponse[];
        pagination: import("../../..").Pagination;
    };
    static contractCodeResponseToContractCode(response: CosmwasmWasmV1Query.QueryCodeResponse): {
        codeInfo: CodeInfoResponse;
        data: Uint8Array;
    };
    static contractByCodeResponseToContractByCode(response: CosmwasmWasmV1Query.QueryContractsByCodeResponse): {
        contractsList: string[];
        pagination: import("../../..").Pagination;
    };
}
