import { InjectiveExchangeV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcExchangeApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveExchangeV1Beta1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchModuleParams(): Promise<import("../types").ExchangeModuleParams>;
    fetchModuleState(): Promise<import("@injectivelabs/core-proto-ts/cjs/injective/exchange/v1beta1/genesis").GenesisState>;
    fetchFeeDiscountSchedule(): Promise<import("../types").FeeDiscountSchedule>;
    fetchFeeDiscountAccountInfo(injectiveAddress: string): Promise<import("../types").FeeDiscountAccountInfo>;
    fetchTradingRewardsCampaign(): Promise<import("../types").TradeRewardCampaign>;
    fetchTradeRewardPoints(injectiveAddresses: string[]): Promise<string[]>;
    fetchPendingTradeRewardPoints(injectiveAddresses: string[], timestamp?: number): Promise<string[]>;
    fetchPositions(): Promise<import("../types").ChainDerivativePosition[]>;
    fetchSubaccountTradeNonce(subaccountId: string): Promise<InjectiveExchangeV1Beta1Query.QuerySubaccountTradeNonceResponse>;
    fetchIsOptedOutOfRewards(account: string): Promise<import("../types").IsOptedOutOfRewards>;
}
