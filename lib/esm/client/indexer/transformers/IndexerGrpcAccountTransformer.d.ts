import { Coin } from '@injectivelabs/ts-types';
import { GrpcCoin } from '../../../types';
import { TradingReward, AccountPortfolio, SubaccountBalance, SubaccountDeposit, GrpcTradingReward, SubaccountTransfer, SubaccountPortfolio, GrpcAccountPortfolio, GrpcSubaccountBalance, GrpcSubaccountDeposit, GrpcSubaccountPortfolio, GrpcSubaccountBalanceTransfer } from '../types/account';
import { InjectiveAccountRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Grpc Transformer
 *
 */
export declare class IndexerGrpcAccountTransformer {
    /**
     *
     * @deprecated - use IndexerGrpcAccountPortfolioApi.accountPortfolioResponseToAccountPortfolio
     */
    static accountPortfolioResponseToAccountPortfolio(response: InjectiveAccountRpc.PortfolioResponse): AccountPortfolio;
    static grpcSubaccountPortfolioToSubaccountPortfolio(subaccountPortfolio: GrpcSubaccountPortfolio): SubaccountPortfolio;
    static grpcAccountPortfolioToAccountPortfolio(portfolio: GrpcAccountPortfolio): AccountPortfolio;
    static grpcAmountToAmount(amount: GrpcCoin): Coin;
    static grpcDepositToDeposit(deposit: GrpcSubaccountDeposit): SubaccountDeposit;
    static balancesResponseToBalances(response: InjectiveAccountRpc.SubaccountBalancesListResponse): SubaccountBalance[];
    static balanceResponseToBalance(response: InjectiveAccountRpc.SubaccountBalanceEndpointResponse): SubaccountBalance;
    static grpcBalanceToBalance(balance: GrpcSubaccountBalance): SubaccountBalance;
    static grpcBalancesToBalances(balances: GrpcSubaccountBalance[]): SubaccountBalance[];
    static grpcTransferHistoryEntryToTransferHistoryEntry(transfer: GrpcSubaccountBalanceTransfer): SubaccountTransfer;
    static tradingRewardsResponseToTradingRewards(response: InjectiveAccountRpc.RewardsResponse): TradingReward[];
    static grpcTradingRewardsToTradingRewards(rewards: GrpcTradingReward[]): TradingReward[];
    static grpcTradingRewardToTradingReward(reward: GrpcTradingReward): TradingReward;
    static transferHistoryResponseToTransferHistory(response: InjectiveAccountRpc.SubaccountHistoryResponse): {
        transfers: SubaccountTransfer[];
        pagination: import("../../../types").ExchangePagination;
    };
    static grpcTransferHistoryToTransferHistory(transfers: GrpcSubaccountBalanceTransfer[]): SubaccountTransfer[];
}
