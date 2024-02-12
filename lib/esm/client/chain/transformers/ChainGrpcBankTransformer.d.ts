import { GrpcCoin, Pagination } from '../../../types';
import { Coin } from '@injectivelabs/ts-types';
import { BankModuleParams, Metadata, TotalSupply } from '../types';
import { CosmosBankV1Beta1Query } from '@injectivelabs/core-proto-ts';
import { CosmosBankV1Beta1Bank } from '@injectivelabs/core-proto-ts';
/**
 * @category Chain Grpc Transformer
 */
export declare class ChainGrpcBankTransformer {
    static grpcCoinToCoin(coin: GrpcCoin): Coin;
    static metadataToMetadata(metadata: CosmosBankV1Beta1Bank.Metadata): Metadata;
    static grpcCoinsToCoins(coins: GrpcCoin[]): Coin[];
    static moduleParamsResponseToModuleParams(response: CosmosBankV1Beta1Query.QueryParamsResponse): BankModuleParams;
    static totalSupplyResponseToTotalSupply(response: CosmosBankV1Beta1Query.QueryTotalSupplyResponse): {
        supply: TotalSupply;
        pagination: Pagination;
    };
    static denomsMetadataResponseToDenomsMetadata(response: CosmosBankV1Beta1Query.QueryDenomsMetadataResponse): {
        metadatas: Metadata[];
        pagination: Pagination;
    };
    static balanceResponseToBalance(response: CosmosBankV1Beta1Query.QueryBalanceResponse): Coin;
    static balancesResponseToBalances(response: CosmosBankV1Beta1Query.QueryAllBalancesResponse): {
        balances: Coin[];
        pagination: Pagination;
    };
}
