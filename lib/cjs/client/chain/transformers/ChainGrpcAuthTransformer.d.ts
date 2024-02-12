import { Account, AuthModuleParams } from '../types/auth';
import { GoogleProtobufAny, CosmosAuthV1Beta1Query } from '@injectivelabs/core-proto-ts';
/**
 * @category Chain Grpc Transformer
 */
export declare class ChainGrpcAuthTransformer {
    static moduleParamsResponseToModuleParams(response: CosmosAuthV1Beta1Query.QueryParamsResponse): AuthModuleParams;
    static grpcAccountToAccount(ethAccount: GoogleProtobufAny.Any): Account;
    static accountResponseToAccount(response: CosmosAuthV1Beta1Query.QueryAccountResponse): Account;
    static accountsResponseToAccounts(response: CosmosAuthV1Beta1Query.QueryAccountsResponse): {
        pagination: import("../../..").Pagination;
        accounts: Account[];
    };
}
