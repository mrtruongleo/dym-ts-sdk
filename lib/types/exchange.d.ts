import { InjectiveExchangeV1Beta1Exchange } from '@injectivelabs/core-proto-ts';
export declare enum TradeExecutionType {
    Market = "market",
    LimitFill = "limitFill",
    LimitMatchRestingOrder = "limitMatchRestingOrder",
    LimitMatchNewOrder = "limitMatchNewOrder"
}
export declare enum TradeExecutionSide {
    Maker = "maker",
    Taker = "taker"
}
export declare enum TradeDirection {
    Buy = "buy",
    Sell = "sell",
    Long = "long",
    Short = "short"
}
export type OrderMask = InjectiveExchangeV1Beta1Exchange.OrderMask;
export declare const OrderMaskMap: typeof InjectiveExchangeV1Beta1Exchange.OrderMask;
