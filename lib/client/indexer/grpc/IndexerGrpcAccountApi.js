var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GeneralException, UnspecifiedErrorCode, GrpcUnaryRequestException, } from '@injectivelabs/exceptions';
import { InjectiveAccountRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
import { IndexerGrpcAccountTransformer } from '../transformers';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcAccountApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = IndexerModule.Account;
        this.client = new InjectiveAccountRpc.InjectiveAccountsRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    /**
     * @deprecated - use IndexerGrpcAccountPortfolioApi.fetchPortfolio instead
     */
    fetchPortfolio(_address) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new GeneralException(new Error('deprecated - use IndexerGrpcAccountPortfolioApi.fetchPortfolio'));
        });
    }
    fetchRewards({ address, epoch }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveAccountRpc.RewardsRequest.create();
            request.accountAddress = address;
            if (epoch) {
                request.epoch = epoch.toString();
            }
            try {
                const response = yield this.retry(() => this.client.Rewards(request));
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
        });
    }
    fetchSubaccountsList(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveAccountRpc.SubaccountsListRequest.create();
            request.accountAddress = address;
            try {
                const response = yield this.retry(() => this.client.SubaccountsList(request));
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
        });
    }
    fetchSubaccountBalance(subaccountId, denom) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveAccountRpc.SubaccountBalanceEndpointRequest.create();
            request.subaccountId = subaccountId;
            request.denom = denom;
            try {
                const response = yield this.retry(() => this.client.SubaccountBalanceEndpoint(request));
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
        });
    }
    fetchSubaccountBalancesList(subaccountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveAccountRpc.SubaccountBalancesListRequest.create();
            request.subaccountId = subaccountId;
            try {
                const response = yield this.retry(() => this.client.SubaccountBalancesList(request));
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
        });
    }
    fetchSubaccountHistory({ subaccountId, denom, transferTypes = [], pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const response = yield this.retry(() => this.client.SubaccountHistory(request));
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
        });
    }
    fetchSubaccountOrderSummary({ subaccountId, marketId, orderDirection, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveAccountRpc.SubaccountOrderSummaryRequest.create();
            request.subaccountId = subaccountId;
            if (marketId) {
                request.marketId = marketId;
            }
            if (orderDirection) {
                request.orderDirection = orderDirection;
            }
            try {
                const response = yield this.retry(() => this.client.SubaccountOrderSummary(request));
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
        });
    }
    fetchOrderStates(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { spotOrderHashes = [], derivativeOrderHashes = [] } = params || {};
            const request = InjectiveAccountRpc.OrderStatesRequest.create();
            request.spotOrderHashes = spotOrderHashes;
            request.derivativeOrderHashes = derivativeOrderHashes;
            try {
                const response = yield this.retry(() => this.client.OrderStates(request));
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
        });
    }
}
