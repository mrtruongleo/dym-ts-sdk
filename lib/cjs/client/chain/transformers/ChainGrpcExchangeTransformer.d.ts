import { InjectiveExchangeV1Beta1Query } from '@injectivelabs/core-proto-ts';
import { IsOptedOutOfRewards, FeeDiscountSchedule, FeeDiscountTierInfo, PointsMultiplier, TradingRewardCampaignInfo, GrpcTradingRewardCampaignInfo, GrpcPointsMultiplier, CampaignRewardPool, GrpcCampaignRewardPool, GrpcTradingRewardCampaignBoostInfo, TradingRewardCampaignBoostInfo, GrpcFeeDiscountTierInfo, TradeRewardCampaign, FeeDiscountAccountInfo, FeeDiscountTierTTL, GrpcFeeDiscountTierTTL, ExchangeModuleParams, GrpcChainPosition, ChainPosition, ChainDerivativePosition } from '../types/exchange';
/**
 * @category Chain Grpc Transformer
 */
export declare class ChainGrpcExchangeTransformer {
    static moduleParamsResponseToParams(response: InjectiveExchangeV1Beta1Query.QueryExchangeParamsResponse): ExchangeModuleParams;
    static feeDiscountScheduleResponseToFeeDiscountSchedule(response: InjectiveExchangeV1Beta1Query.QueryFeeDiscountScheduleResponse): FeeDiscountSchedule;
    static tradingRewardsCampaignResponseToTradingRewardsCampaign(response: InjectiveExchangeV1Beta1Query.QueryTradeRewardCampaignResponse): TradeRewardCampaign;
    static feeDiscountAccountInfoResponseToFeeDiscountAccountInfo(response: InjectiveExchangeV1Beta1Query.QueryFeeDiscountAccountInfoResponse): FeeDiscountAccountInfo;
    static grpcFeeDiscountTierInfoToFeeDiscountTierInfo(info?: GrpcFeeDiscountTierInfo): FeeDiscountTierInfo | undefined;
    static grpcFeeDiscountTierTTLToFeeDiscountTierTTL(info?: GrpcFeeDiscountTierTTL): FeeDiscountTierTTL | undefined;
    static grpcPointsMultiplierToPointsMultiplier(point: GrpcPointsMultiplier): PointsMultiplier;
    static grpcTradingRewardCampaignBoostInfoToTradingRewardCampaignBoostInfo(info?: GrpcTradingRewardCampaignBoostInfo): TradingRewardCampaignBoostInfo | undefined;
    static grpcTradingRewardCampaignInfoToTradingRewardCampaignInfo(info?: GrpcTradingRewardCampaignInfo): TradingRewardCampaignInfo | undefined;
    static grpcCampaignRewardPoolToCampaignRewardPool(pool: GrpcCampaignRewardPool): CampaignRewardPool;
    static grpcPositionToPosition(position: GrpcChainPosition): ChainPosition;
    static positionsResponseToPositions(response: InjectiveExchangeV1Beta1Query.QueryPositionsResponse): ChainDerivativePosition[];
    static isOptedOutOfRewardsResponseToIsOptedOutOfRewards(response: InjectiveExchangeV1Beta1Query.QueryIsOptedOutOfRewardsResponse): IsOptedOutOfRewards;
}
