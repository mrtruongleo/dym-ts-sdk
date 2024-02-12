"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcAccountApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcAccountApi extends BaseIndexerGrpcConsumer_1.default {
    module = types_1.IndexerModule.Account;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new indexer_proto_ts_1.InjectiveAccountRpc.InjectiveAccountsRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    /**
     * @deprecated - use IndexerGrpcAccountPortfolioApi.fetchPortfolio instead
     */
    async fetchPortfolio(_address) {
        throw new exceptions_1.GeneralException(new Error('deprecated - use IndexerGrpcAccountPortfolioApi.fetchPortfolio'));
    }
    async fetchRewards({ address, epoch }) {
        const request = indexer_proto_ts_1.InjectiveAccountRpc.RewardsRequest.create();
        request.accountAddress = address;
        if (epoch) {
            request.epoch = epoch.toString();
        }
        try {
            const response = await this.retry(() => this.client.Rewards(request));
            return transformers_1.IndexerGrpcAccountTransformer.tradingRewardsResponseToTradingRewards(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveAccountRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Rewards',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Rewards',
                contextModule: this.module,
            });
        }
    }
    async fetchSubaccountsList(address) {
        const request = indexer_proto_ts_1.InjectiveAccountRpc.SubaccountsListRequest.create();
        request.accountAddress = address;
        try {
            const response = await this.retry(() => this.client.SubaccountsList(request));
            return response.subaccounts;
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveAccountRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SubaccountsList',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'SubaccountsList',
                contextModule: this.module,
            });
        }
    }
    async fetchSubaccountBalance(subaccountId, denom) {
        const request = indexer_proto_ts_1.InjectiveAccountRpc.SubaccountBalanceEndpointRequest.create();
        request.subaccountId = subaccountId;
        request.denom = denom;
        try {
            const response = await this.retry(() => this.client.SubaccountBalanceEndpoint(request));
            return transformers_1.IndexerGrpcAccountTransformer.balanceResponseToBalance(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveAccountRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SubaccountBalanceEndpoint',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'SubaccountBalanceEndpoint',
                contextModule: this.module,
            });
        }
    }
    async fetchSubaccountBalancesList(subaccountId) {
        const request = indexer_proto_ts_1.InjectiveAccountRpc.SubaccountBalancesListRequest.create();
        request.subaccountId = subaccountId;
        try {
            const response = await this.retry(() => this.client.SubaccountBalancesList(request));
            return transformers_1.IndexerGrpcAccountTransformer.balancesResponseToBalances(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveAccountRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SubaccountBalancesList',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'SubaccountBalancesList',
                contextModule: this.module,
            });
        }
    }
    async fetchSubaccountHistory({ subaccountId, denom, transferTypes = [], pagination, }) {
        const request = indexer_proto_ts_1.InjectiveAccountRpc.SubaccountHistoryRequest.create();
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
            return transformers_1.IndexerGrpcAccountTransformer.transferHistoryResponseToTransferHistory(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveAccountRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SubaccountHistory',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'SubaccountHistory',
                contextModule: this.module,
            });
        }
    }
    async fetchSubaccountOrderSummary({ subaccountId, marketId, orderDirection, }) {
        const request = indexer_proto_ts_1.InjectiveAccountRpc.SubaccountOrderSummaryRequest.create();
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
            if (e instanceof indexer_proto_ts_1.InjectiveAccountRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SubaccountOrderSummary',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'SubaccountOrderSummary',
                contextModule: this.module,
            });
        }
    }
    async fetchOrderStates(params) {
        const { spotOrderHashes = [], derivativeOrderHashes = [] } = params || {};
        const request = indexer_proto_ts_1.InjectiveAccountRpc.OrderStatesRequest.create();
        request.spotOrderHashes = spotOrderHashes;
        request.derivativeOrderHashes = derivativeOrderHashes;
        try {
            const response = await this.retry(() => this.client.OrderStates(request));
            return response;
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveAccountRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'OrderStates',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'OrderStates',
                contextModule: this.module,
            });
        }
    }
}
exports.IndexerGrpcAccountApi = IndexerGrpcAccountApi;
//# sourceMappingURL=IndexerGrpcAccountApi.js.map