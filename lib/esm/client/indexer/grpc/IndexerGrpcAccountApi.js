import { GeneralException, UnspecifiedErrorCode, GrpcUnaryRequestException, } from '@injectivelabs/exceptions';
import { InjectiveAccountRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
import { IndexerGrpcAccountTransformer } from '../transformers';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcAccountApi extends BaseGrpcConsumer {
    module = IndexerModule.Account;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveAccountRpc.InjectiveAccountsRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    /**
     * @deprecated - use IndexerGrpcAccountPortfolioApi.fetchPortfolio instead
     */
    async fetchPortfolio(_address) {
        throw new GeneralException(new Error('deprecated - use IndexerGrpcAccountPortfolioApi.fetchPortfolio'));
    }
    async fetchRewards({ address, epoch }) {
        const request = InjectiveAccountRpc.RewardsRequest.create();
        request.accountAddress = address;
        if (epoch) {
            request.epoch = epoch.toString();
        }
        try {
            const response = await this.retry(() => this.client.Rewards(request));
            return IndexerGrpcAccountTransformer.tradingRewardsResponseToTradingRewards(response);
        }
        catch (e) {
            if (e instanceof InjectiveAccountRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Rewards',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'Rewards',
                contextModule: this.module,
            });
        }
    }
    async fetchSubaccountsList(address) {
        const request = InjectiveAccountRpc.SubaccountsListRequest.create();
        request.accountAddress = address;
        try {
            const response = await this.retry(() => this.client.SubaccountsList(request));
            return response.subaccounts;
        }
        catch (e) {
            if (e instanceof InjectiveAccountRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SubaccountsList',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'SubaccountsList',
                contextModule: this.module,
            });
        }
    }
    async fetchSubaccountBalance(subaccountId, denom) {
        const request = InjectiveAccountRpc.SubaccountBalanceEndpointRequest.create();
        request.subaccountId = subaccountId;
        request.denom = denom;
        try {
            const response = await this.retry(() => this.client.SubaccountBalanceEndpoint(request));
            return IndexerGrpcAccountTransformer.balanceResponseToBalance(response);
        }
        catch (e) {
            if (e instanceof InjectiveAccountRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SubaccountBalanceEndpoint',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'SubaccountBalanceEndpoint',
                contextModule: this.module,
            });
        }
    }
    async fetchSubaccountBalancesList(subaccountId) {
        const request = InjectiveAccountRpc.SubaccountBalancesListRequest.create();
        request.subaccountId = subaccountId;
        try {
            const response = await this.retry(() => this.client.SubaccountBalancesList(request));
            return IndexerGrpcAccountTransformer.balancesResponseToBalances(response);
        }
        catch (e) {
            if (e instanceof InjectiveAccountRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SubaccountBalancesList',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'SubaccountBalancesList',
                contextModule: this.module,
            });
        }
    }
    async fetchSubaccountHistory({ subaccountId, denom, transferTypes = [], pagination, }) {
        const request = InjectiveAccountRpc.SubaccountHistoryRequest.create();
        request.subaccountId = subaccountId;
        if (denom) {
            request.denom = denom;
        }
        if (transferTypes.length > 0) {
            request.transferTypes = transferTypes;
        }
        if (pagination) {
            if (pagination.skip !== undefined) {
                request.skip = pagination.skip.toString();
            }
            if (pagination.limit !== undefined) {
                request.limit = pagination.limit;
            }
            if (pagination.endTime !== undefined) {
                request.endTime = pagination.endTime.toString();
            }
        }
        try {
            const response = await this.retry(() => this.client.SubaccountHistory(request));
            return IndexerGrpcAccountTransformer.transferHistoryResponseToTransferHistory(response);
        }
        catch (e) {
            if (e instanceof InjectiveAccountRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SubaccountHistory',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'SubaccountHistory',
                contextModule: this.module,
            });
        }
    }
    async fetchSubaccountOrderSummary({ subaccountId, marketId, orderDirection, }) {
        const request = InjectiveAccountRpc.SubaccountOrderSummaryRequest.create();
        request.subaccountId = subaccountId;
        if (marketId) {
            request.marketId = marketId;
        }
        if (orderDirection) {
            request.orderDirection = orderDirection;
        }
        try {
            const response = await this.retry(() => this.client.SubaccountOrderSummary(request));
            return response;
        }
        catch (e) {
            if (e instanceof InjectiveAccountRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SubaccountOrderSummary',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'SubaccountOrderSummary',
                contextModule: this.module,
            });
        }
    }
    async fetchOrderStates(params) {
        const { spotOrderHashes = [], derivativeOrderHashes = [] } = params || {};
        const request = InjectiveAccountRpc.OrderStatesRequest.create();
        request.spotOrderHashes = spotOrderHashes;
        request.derivativeOrderHashes = derivativeOrderHashes;
        try {
            const response = await this.retry(() => this.client.OrderStates(request));
            return response;
        }
        catch (e) {
            if (e instanceof InjectiveAccountRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'OrderStates',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'OrderStates',
                contextModule: this.module,
            });
        }
    }
}
