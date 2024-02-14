"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MsgBase_1 = require("../../MsgBase");
const numbers_1 = require("../../../../utils/numbers");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const createLimitOrder = (params) => {
    const orderInfo = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderInfo.create();
    orderInfo.subaccountId = params.subaccountId;
    orderInfo.feeRecipient = params.feeRecipient;
    orderInfo.price = params.price;
    orderInfo.quantity = params.quantity;
    if (params.cid) {
        orderInfo.cid = params.cid;
    }
    const spotOrder = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.SpotOrder.create();
    spotOrder.marketId = params.marketId;
    spotOrder.orderType = params.orderType;
    spotOrder.orderInfo = orderInfo;
    spotOrder.triggerPrice = params.triggerPrice || "0";
    const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCreateSpotLimitOrder.create();
    message.sender = params.injectiveAddress;
    message.order = spotOrder;
    return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCreateSpotLimitOrder.fromPartial(message);
};
/**
 * @category Messages
 */
class MsgCreateSpotLimitOrder extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgCreateSpotLimitOrder(params);
    }
    toProto() {
        const { params: initialParams } = this;
        const params = Object.assign(Object.assign({}, initialParams), { price: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.price).toFixed(), triggerPrice: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.triggerPrice || 0).toFixed(), quantity: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.quantity).toFixed() });
        return createLimitOrder(params);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgCreateSpotLimitOrder" }, proto);
    }
    toAmino() {
        const { params } = this;
        const proto = createLimitOrder(params);
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "exchange/MsgCreateSpotLimitOrder",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgCreateSpotLimitOrder" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgCreateSpotLimitOrder",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCreateSpotLimitOrder.encode(this.toProto()).finish();
    }
}
exports.default = MsgCreateSpotLimitOrder;
