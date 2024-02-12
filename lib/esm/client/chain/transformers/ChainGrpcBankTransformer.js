import { grpcPaginationToPagination } from '../../../utils/pagination';
/**
 * @category Chain Grpc Transformer
 */
export class ChainGrpcBankTransformer {
    static grpcCoinToCoin(coin) {
        return {
            denom: coin.denom,
            amount: coin.amount,
        };
    }
    static metadataToMetadata(metadata) {
        return metadata;
    }
    static grpcCoinsToCoins(coins) {
        return coins.map(ChainGrpcBankTransformer.grpcCoinToCoin);
    }
    static moduleParamsResponseToModuleParams(response) {
        const params = response.params;
        return {
            sendEnabledList: params.sendEnabled,
            defaultSendEnabled: params.defaultSendEnabled,
        };
    }
    static totalSupplyResponseToTotalSupply(response) {
        const balances = response.supply;
        const pagination = response.pagination;
        return {
            supply: balances.map(ChainGrpcBankTransformer.grpcCoinToCoin),
            pagination: grpcPaginationToPagination(pagination),
        };
    }
    static denomsMetadataResponseToDenomsMetadata(response) {
        const metadatas = response.metadatas;
        const pagination = response.pagination;
        return {
            metadatas: metadatas.map(ChainGrpcBankTransformer.metadataToMetadata),
            pagination: grpcPaginationToPagination(pagination),
        };
    }
    static balanceResponseToBalance(response) {
        return ChainGrpcBankTransformer.grpcCoinToCoin(response.balance);
    }
    static balancesResponseToBalances(response) {
        const balances = response.balances;
        const pagination = response.pagination;
        return {
            balances: ChainGrpcBankTransformer.grpcCoinsToCoins(balances),
            pagination: grpcPaginationToPagination(pagination),
        };
    }
}
