import { InjectiveExchangeV1Beta1Exchange } from '@injectivelabs/core-proto-ts';
export var TradeExecutionType;
(function (TradeExecutionType) {
    TradeExecutionType["Market"] = "market";
    TradeExecutionType["LimitFill"] = "limitFill";
    TradeExecutionType["LimitMatchRestingOrder"] = "limitMatchRestingOrder";
    TradeExecutionType["LimitMatchNewOrder"] = "limitMatchNewOrder";
})(TradeExecutionType || (TradeExecutionType = {}));
export var TradeExecutionSide;
(function (TradeExecutionSide) {
    TradeExecutionSide["Maker"] = "maker";
    TradeExecutionSide["Taker"] = "taker";
})(TradeExecutionSide || (TradeExecutionSide = {}));
export var TradeDirection;
(function (TradeDirection) {
    TradeDirection["Buy"] = "buy";
    TradeDirection["Sell"] = "sell";
    TradeDirection["Long"] = "long";
    TradeDirection["Short"] = "short";
})(TradeDirection || (TradeDirection = {}));
export const OrderMaskMap = InjectiveExchangeV1Beta1Exchange.OrderMask;
