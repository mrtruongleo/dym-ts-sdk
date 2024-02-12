import { InjectiveAccountRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { PaginationOption } from '../../../types/pagination';
/**
 * @category Indexer Grpc API
 */
export declare class IndexerGrpcAccountApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveAccountRpc.InjectiveAccountsRPCClientImpl;
    constructor(endpoint: string);
    /**
     * @deprecated - use IndexerGrpcAccountPortfolioApi.fetchPortfolio instead
     */
    fetchPortfolio(_address: string): Promise<void>;
    fetchRewards({ address, epoch }: {
        address: string;
        epoch: number;
    }): Promise<import("../types").TradingReward[]>;
    fetchSubaccountsList(address: string): Promise<string[]>;
    fetchSubaccountBalance(subaccountId: string, denom: string): Promise<import("../types").SubaccountBalance>;
    fetchSubaccountBalancesList(subaccountId: string): Promise<import("../types").SubaccountBalance[]>;
    fetchSubaccountHistory({ subaccountId, denom, transferTypes, pagination, }: {
        subaccountId: string;
        denom?: string;
        transferTypes?: string[];
        pagination?: PaginationOption;
    }): Promise<{
        transfers: import("../types").SubaccountTransfer[];
        pagination: import("../../../types/pagination").ExchangePagination;
    }>;
    fetchSubaccountOrderSummary({ subaccountId, marketId, orderDirection, }: {
        subaccountId: string;
        marketId?: string;
        orderDirection?: string;
    }): Promise<InjectiveAccountRpc.SubaccountOrderSummaryResponse>;
    fetchOrderStates(params?: {
        spotOrderHashes?: string[];
        derivativeOrderHashes?: string[];
    }): Promise<InjectiveAccountRpc.OrderStatesResponse>;
}
