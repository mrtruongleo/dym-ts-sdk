import { MsgBase } from "../../MsgBase";
import { amountToCosmosSdkDecAmount } from "../../../../utils/numbers";
import snakecaseKeys from "snakecase-keys";
import { InjectiveExchangeV1Beta1Exchange, InjectiveExchangeV1Beta1Tx, } from "@injectivelabs/core-proto-ts";
const createLimitOrder = (params) => {
    const orderInfo = InjectiveExchangeV1Beta1Exchange.OrderInfo.create();
    orderInfo.subaccountId = params.subaccountId;
    orderInfo.feeRecipient = params.feeRecipient;
    orderInfo.price = params.price;
    orderInfo.quantity = params.quantity;
    if (params.cid) {
        orderInfo.cid = params.cid;
    }
    const spotOrder = InjectiveExchangeV1Beta1Exchange.SpotOrder.create();
    spotOrder.marketId = params.marketId;
    spotOrder.orderType = params.orderType;
    spotOrder.orderInfo = orderInfo;
    spotOrder.triggerPrice = params.triggerPrice || "0";
    const message = InjectiveExchangeV1Beta1Tx.MsgCreateSpotLimitOrder.create();
    message.sender = params.injectiveAddress;
    message.order = spotOrder;
    return InjectiveExchangeV1Beta1Tx.MsgCreateSpotLimitOrder.fromPartial(message);
};
/**
 * @category Messages
 */
export default class MsgCreateSpotLimitOrder extends MsgBase {
    static fromJSON(params) {
        return new MsgCreateSpotLimitOrder(params);
    }
    toProto() {
        const { params: initialParams } = this;
        const params = Object.assign(Object.assign({}, initialParams), { price: amountToCosmosSdkDecAmount(initialParams.price).toFixed(), triggerPrice: amountToCosmosSdkDecAmount(initialParams.triggerPrice || 0).toFixed(), quantity: amountToCosmosSdkDecAmount(initialParams.quantity).toFixed() });
        return createLimitOrder(params);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgCreateSpotLimitOrder" }, proto);
    }
    toAmino() {
        const { params } = this;
        const proto = createLimitOrder(params);
        const message = Object.assign({}, snakecaseKeys(proto));
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
        return InjectiveExchangeV1Beta1Tx.MsgCreateSpotLimitOrder.encode(this.toProto()).finish();
    }
}
