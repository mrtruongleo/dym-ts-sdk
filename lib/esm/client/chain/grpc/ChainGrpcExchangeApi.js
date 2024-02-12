import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveExchangeV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcExchangeTransformer } from '../transformers';
InjectiveExchangeV1Beta1Query;
/**
 * @category Chain Grpc API
 */
export class ChainGrpcExchangeApi extends BaseGrpcConsumer {
    module = ChainModule.Exchange;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveExchangeV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = InjectiveExchangeV1Beta1Query.QueryExchangeParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.QueryExchangeParams(request));
            return ChainGrpcExchangeTransformer.moduleParamsResponseToParams(response);
        }
        catch (e) {
            if (e instanceof InjectiveExchangeV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'QueryExchangeParams',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'QueryExchangeParams',
                contextModule: ChainModule.Exchange,
            });
        }
    }
    async fetchModuleState() {
        const request = InjectiveExchangeV1Beta1Query.QueryModuleStateRequest.create();
        try {
            const response = await this.retry(() => this.client.ExchangeModuleState(request));
            return response.state;
        }
        catch (e) {
            if (e instanceof InjectiveExchangeV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'ExchangeModuleState',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'ExchangeModuleState',
                contextModule: ChainModule.Exchange,
            });
        }
    }
    async fetchFeeDiscountSchedule() {
        const request = InjectiveExchangeV1Beta1Query.QueryFeeDiscountScheduleRequest.create();
        try {
            const response = await this.retry(() => this.client.FeeDiscountSchedule(request));
            return ChainGrpcExchangeTransformer.feeDiscountScheduleResponseToFeeDiscountSchedule(response);
        }
        catch (e) {
            if (e instanceof InjectiveExchangeV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'FeeDiscountSchedule',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'FeeDiscountSchedule',
                contextModule: ChainModule.Exchange,
            });
        }
    }
    async fetchFeeDiscountAccountInfo(injectiveAddress) {
        const request = InjectiveExchangeV1Beta1Query.QueryFeeDiscountAccountInfoRequest.create();
        request.account = injectiveAddress;
        try {
            const response = await this.retry(() => this.client.FeeDiscountAccountInfo(request));
            return ChainGrpcExchangeTransformer.feeDiscountAccountInfoResponseToFeeDiscountAccountInfo(response);
        }
        catch (e) {
            if (e instanceof InjectiveExchangeV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'FeeDiscountAccountInfo',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'FeeDiscountAccountInfo',
                contextModule: ChainModule.Exchange,
            });
        }
    }
    async fetchTradingRewardsCampaign() {
        const request = InjectiveExchangeV1Beta1Query.QueryTradeRewardCampaignRequest.create();
        try {
            const response = await this.retry(() => this.client.TradeRewardCampaign(request));
            return ChainGrpcExchangeTransformer.tradingRewardsCampaignResponseToTradingRewardsCampaign(response);
        }
        catch (e) {
            if (e instanceof InjectiveExchangeV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'TradeRewardCampaign',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'TradeRewardCampaign',
                contextModule: ChainModule.Exchange,
            });
        }
    }
    async fetchTradeRewardPoints(injectiveAddresses) {
        const request = InjectiveExchangeV1Beta1Query.QueryTradeRewardPointsRequest.create();
        request.accounts = injectiveAddresses;
        try {
            const response = await this.retry(() => this.client.TradeRewardPoints(request));
            return response.accountTradeRewardPoints;
        }
        catch (e) {
            if (e instanceof InjectiveExchangeV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'TradeRewardPoints',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'TradeRewardPoints',
                contextModule: ChainModule.Exchange,
            });
        }
    }
    async fetchPendingTradeRewardPoints(injectiveAddresses, timestamp) {
        const request = InjectiveExchangeV1Beta1Query.QueryTradeRewardPointsRequest.create();
        request.accounts = injectiveAddresses;
        if (timestamp) {
            request.pendingPoolTimestamp = timestamp.toString();
        }
        try {
            const response = await this.retry(() => this.client.PendingTradeRewardPoints(request));
            return response.accountTradeRewardPoints;
        }
        catch (e) {
            if (e instanceof InjectiveExchangeV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'PendingTradeRewardPoints',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'PendingTradeRewardPoints',
                contextModule: ChainModule.Exchange,
            });
        }
    }
    async fetchPositions() {
        const request = InjectiveExchangeV1Beta1Query.QueryPositionsRequest.create();
        try {
            const response = await this.retry(() => this.client.Positions(request));
            return ChainGrpcExchangeTransformer.positionsResponseToPositions(response);
        }
        catch (e) {
            if (e instanceof InjectiveExchangeV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Positions',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'Positions',
                contextModule: ChainModule.Exchange,
            });
        }
    }
    async fetchSubaccountTradeNonce(subaccountId) {
        const request = InjectiveExchangeV1Beta1Query.QuerySubaccountTradeNonceRequest.create();
        request.subaccountId = subaccountId;
        try {
            const response = await this.retry(() => this.client.SubaccountTradeNonce(request));
            return response;
        }
        catch (e) {
            if (e instanceof InjectiveExchangeV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SubaccountTradeNonce',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'SubaccountTradeNonce',
                contextModule: ChainModule.Exchange,
            });
        }
    }
    async fetchIsOptedOutOfRewards(account) {
        const request = InjectiveExchangeV1Beta1Query.QueryIsOptedOutOfRewardsRequest.create();
        request.account = account;
        try {
            const response = await this.retry(() => this.client.IsOptedOutOfRewards(request));
            return ChainGrpcExchangeTransformer.isOptedOutOfRewardsResponseToIsOptedOutOfRewards(response);
        }
        catch (e) {
            if (e instanceof InjectiveExchangeV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'IsOptedOutOfRewards',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'IsOptedOutOfRewards',
                contextModule: ChainModule.Exchange,
            });
        }
    }
}
