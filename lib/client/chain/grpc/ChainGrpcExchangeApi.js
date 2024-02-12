var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Exchange;
        this.client = new InjectiveExchangeV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveExchangeV1Beta1Query.QueryExchangeParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.QueryExchangeParams(request));
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
        });
    }
    fetchModuleState() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveExchangeV1Beta1Query.QueryModuleStateRequest.create();
            try {
                const response = yield this.retry(() => this.client.ExchangeModuleState(request));
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
        });
    }
    fetchFeeDiscountSchedule() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveExchangeV1Beta1Query.QueryFeeDiscountScheduleRequest.create();
            try {
                const response = yield this.retry(() => this.client.FeeDiscountSchedule(request));
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
        });
    }
    fetchFeeDiscountAccountInfo(injectiveAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveExchangeV1Beta1Query.QueryFeeDiscountAccountInfoRequest.create();
            request.account = injectiveAddress;
            try {
                const response = yield this.retry(() => this.client.FeeDiscountAccountInfo(request));
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
        });
    }
    fetchTradingRewardsCampaign() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveExchangeV1Beta1Query.QueryTradeRewardCampaignRequest.create();
            try {
                const response = yield this.retry(() => this.client.TradeRewardCampaign(request));
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
        });
    }
    fetchTradeRewardPoints(injectiveAddresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveExchangeV1Beta1Query.QueryTradeRewardPointsRequest.create();
            request.accounts = injectiveAddresses;
            try {
                const response = yield this.retry(() => this.client.TradeRewardPoints(request));
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
        });
    }
    fetchPendingTradeRewardPoints(injectiveAddresses, timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveExchangeV1Beta1Query.QueryTradeRewardPointsRequest.create();
            request.accounts = injectiveAddresses;
            if (timestamp) {
                request.pendingPoolTimestamp = timestamp.toString();
            }
            try {
                const response = yield this.retry(() => this.client.PendingTradeRewardPoints(request));
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
        });
    }
    fetchPositions() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveExchangeV1Beta1Query.QueryPositionsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Positions(request));
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
        });
    }
    fetchSubaccountTradeNonce(subaccountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveExchangeV1Beta1Query.QuerySubaccountTradeNonceRequest.create();
            request.subaccountId = subaccountId;
            try {
                const response = yield this.retry(() => this.client.SubaccountTradeNonce(request));
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
        });
    }
    fetchIsOptedOutOfRewards(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveExchangeV1Beta1Query.QueryIsOptedOutOfRewardsRequest.create();
            request.account = account;
            try {
                const response = yield this.retry(() => this.client.IsOptedOutOfRewards(request));
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
        });
    }
}
