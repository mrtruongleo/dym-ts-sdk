"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MsgBase_1 = require("../../MsgBase");
const numbers_1 = require("../../../../utils/numbers");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const createMarketOrder = (params) => {
    const orderInfo = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderInfo.create();
    orderInfo.subaccountId = params.subaccountId;
    orderInfo.feeRecipient = params.feeRecipient;
    orderInfo.price = params.price;
    orderInfo.quantity = params.quantity;
    if (params.cid) {
        orderInfo.cid = params.cid;
    }
    const derivativeOrder = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.DerivativeOrder.create();
    derivativeOrder.marketId = params.marketId;
    derivativeOrder.orderType = params.orderType;
    derivativeOrder.orderInfo = orderInfo;
    derivativeOrder.margin = params.margin;
    derivativeOrder.triggerPrice = params.triggerPrice || "0";
    const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCreateBinaryOptionsMarketOrder.create();
    message.sender = params.injectiveAddress;
    message.order = derivativeOrder;
    return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCreateBinaryOptionsMarketOrder.fromPartial(message);
};
/**
 * @category Messages
 */
class MsgCreateBinaryOptionsMarketOrder extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgCreateBinaryOptionsMarketOrder(params);
    }
    toProto() {
        const { params: initialParams } = this;
        const params = Object.assign(Object.assign({}, initialParams), { price: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.price).toFixed(), margin: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.margin).toFixed(), triggerPrice: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.triggerPrice || 0).toFixed(), quantity: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.quantity).toFixed() });
        return createMarketOrder(params);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgCreateBinaryOptionsMarketOrder" }, proto);
    }
    toAmino() {
        const { params } = this;
        const proto = createMarketOrder(params);
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "exchange/MsgCreateBinaryOptionsMarketOrder",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgCreateBinaryOptionsMarketOrder" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgCreateBinaryOptionsMarketOrder",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCreateBinaryOptionsMarketOrder.encode(this.toProto()).finish();
    }
}
exports.default = MsgCreateBinaryOptionsMarketOrder;
