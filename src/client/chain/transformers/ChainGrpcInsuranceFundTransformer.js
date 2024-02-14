"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcInsuranceFundTransformer = void 0;
/**
 * @category Chain Grpc Transformer
 */
class ChainGrpcInsuranceFundTransformer {
    static moduleParamsResponseToModuleParams(response) {
        var _a;
        const params = response.params;
        return {
            defaultRedemptionNoticePeriodDuration: parseInt(((_a = params.defaultRedemptionNoticePeriodDuration) === null || _a === void 0 ? void 0 : _a.seconds) || '0', 10),
        };
    }
    static grpcInsuranceFundToInsuranceFund(grpcFund) {
        var _a;
        return {
            depositDenom: grpcFund.depositDenom,
            insurancePoolTokenDenom: grpcFund.insurancePoolTokenDenom,
            redemptionNoticePeriodDuration: parseInt(((_a = grpcFund.redemptionNoticePeriodDuration) === null || _a === void 0 ? void 0 : _a.seconds) || '0', 10),
            balance: grpcFund.balance,
            totalShare: grpcFund.totalShare,
            marketId: grpcFund.marketId,
            marketTicker: grpcFund.marketTicker,
            oracleBase: grpcFund.oracleBase,
            oracleQuote: grpcFund.oracleQuote,
            oracleType: grpcFund.oracleType,
            expiry: parseInt(grpcFund.expiry, 10),
        };
    }
    static insuranceFundResponseToInsuranceFund(response) {
        return ChainGrpcInsuranceFundTransformer.grpcInsuranceFundToInsuranceFund(response.fund);
    }
    static insuranceFundsResponseToInsuranceFunds(response) {
        return response.funds.map((fund) => ChainGrpcInsuranceFundTransformer.grpcInsuranceFundToInsuranceFund(fund));
    }
    static redemptionsResponseToRedemptions(response) {
        return response.amount.map((amount) => {
            return {
                amount: amount.amount,
                denom: amount.denom,
            };
        });
    }
    static estimatedRedemptionsResponseToEstimatedRedemptions(response) {
        return response.amount.map((amount) => {
            return {
                amount: amount.amount,
                denom: amount.denom,
            };
        });
    }
}
exports.ChainGrpcInsuranceFundTransformer = ChainGrpcInsuranceFundTransformer;
