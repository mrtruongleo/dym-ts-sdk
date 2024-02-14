"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcExchangeApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
core_proto_ts_1.InjectiveExchangeV1Beta1Query;
/**
 * @category Chain Grpc API
 */
class ChainGrpcExchangeApi extends BaseGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.ChainModule.Exchange;
        this.client = new core_proto_ts_1.InjectiveExchangeV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveExchangeV1Beta1Query.QueryExchangeParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.QueryExchangeParams(request));
                return transformers_1.ChainGrpcExchangeTransformer.moduleParamsResponseToParams(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveExchangeV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'QueryExchangeParams',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'QueryExchangeParams',
                    contextModule: types_1.ChainModule.Exchange,
                });
            }
        });
    }
    fetchModuleState() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveExchangeV1Beta1Query.QueryModuleStateRequest.create();
            try {
                const response = yield this.retry(() => this.client.ExchangeModuleState(request));
                return response.state;
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveExchangeV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ExchangeModuleState',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'ExchangeModuleState',
                    contextModule: types_1.ChainModule.Exchange,
                });
            }
        });
    }
    fetchFeeDiscountSchedule() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveExchangeV1Beta1Query.QueryFeeDiscountScheduleRequest.create();
            try {
                const response = yield this.retry(() => this.client.FeeDiscountSchedule(request));
                return transformers_1.ChainGrpcExchangeTransformer.feeDiscountScheduleResponseToFeeDiscountSchedule(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveExchangeV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'FeeDiscountSchedule',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'FeeDiscountSchedule',
                    contextModule: types_1.ChainModule.Exchange,
                });
            }
        });
    }
    fetchFeeDiscountAccountInfo(injectiveAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveExchangeV1Beta1Query.QueryFeeDiscountAccountInfoRequest.create();
            request.account = injectiveAddress;
            try {
                const response = yield this.retry(() => this.client.FeeDiscountAccountInfo(request));
                return transformers_1.ChainGrpcExchangeTransformer.feeDiscountAccountInfoResponseToFeeDiscountAccountInfo(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveExchangeV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'FeeDiscountAccountInfo',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'FeeDiscountAccountInfo',
                    contextModule: types_1.ChainModule.Exchange,
                });
            }
        });
    }
    fetchTradingRewardsCampaign() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveExchangeV1Beta1Query.QueryTradeRewardCampaignRequest.create();
            try {
                const response = yield this.retry(() => this.client.TradeRewardCampaign(request));
                return transformers_1.ChainGrpcExchangeTransformer.tradingRewardsCampaignResponseToTradingRewardsCampaign(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveExchangeV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'TradeRewardCampaign',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'TradeRewardCampaign',
                    contextModule: types_1.ChainModule.Exchange,
                });
            }
        });
    }
    fetchTradeRewardPoints(injectiveAddresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveExchangeV1Beta1Query.QueryTradeRewardPointsRequest.create();
            request.accounts = injectiveAddresses;
            try {
                const response = yield this.retry(() => this.client.TradeRewardPoints(request));
                return response.accountTradeRewardPoints;
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveExchangeV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'TradeRewardPoints',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'TradeRewardPoints',
                    contextModule: types_1.ChainModule.Exchange,
                });
            }
        });
    }
    fetchPendingTradeRewardPoints(injectiveAddresses, timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveExchangeV1Beta1Query.QueryTradeRewardPointsRequest.create();
            request.accounts = injectiveAddresses;
            if (timestamp) {
                request.pendingPoolTimestamp = timestamp.toString();
            }
            try {
                const response = yield this.retry(() => this.client.PendingTradeRewardPoints(request));
                return response.accountTradeRewardPoints;
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveExchangeV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'PendingTradeRewardPoints',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'PendingTradeRewardPoints',
                    contextModule: types_1.ChainModule.Exchange,
                });
            }
        });
    }
    fetchPositions() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveExchangeV1Beta1Query.QueryPositionsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Positions(request));
                return transformers_1.ChainGrpcExchangeTransformer.positionsResponseToPositions(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveExchangeV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Positions',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Positions',
                    contextModule: types_1.ChainModule.Exchange,
                });
            }
        });
    }
    fetchSubaccountTradeNonce(subaccountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveExchangeV1Beta1Query.QuerySubaccountTradeNonceRequest.create();
            request.subaccountId = subaccountId;
            try {
                const response = yield this.retry(() => this.client.SubaccountTradeNonce(request));
                return response;
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveExchangeV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'SubaccountTradeNonce',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'SubaccountTradeNonce',
                    contextModule: types_1.ChainModule.Exchange,
                });
            }
        });
    }
    fetchIsOptedOutOfRewards(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveExchangeV1Beta1Query.QueryIsOptedOutOfRewardsRequest.create();
            request.account = account;
            try {
                const response = yield this.retry(() => this.client.IsOptedOutOfRewards(request));
                return transformers_1.ChainGrpcExchangeTransformer.isOptedOutOfRewardsResponseToIsOptedOutOfRewards(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveExchangeV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'IsOptedOutOfRewards',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'IsOptedOutOfRewards',
                    contextModule: types_1.ChainModule.Exchange,
                });
            }
        });
    }
}
exports.ChainGrpcExchangeApi = ChainGrpcExchangeApi;
