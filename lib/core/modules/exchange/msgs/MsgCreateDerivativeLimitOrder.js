import { MsgBase } from "../../MsgBase";
import { amountToCosmosSdkDecAmount } from "../../../../utils/numbers";
import snakecaseKeys from "snakecase-keys";
import { InjectiveExchangeV1Beta1Tx, InjectiveExchangeV1Beta1Exchange, } from "@injectivelabs/core-proto-ts";
const createLimitOrder = (params) => {
    const orderInfo = InjectiveExchangeV1Beta1Exchange.OrderInfo.create();
    orderInfo.subaccountId = params.subaccountId;
    orderInfo.feeRecipient = params.feeRecipient;
    orderInfo.price = params.price;
    orderInfo.quantity = params.quantity;
    if (params.cid) {
        orderInfo.cid = params.cid;
    }
    const derivativeOrder = InjectiveExchangeV1Beta1Exchange.DerivativeOrder.create();
    derivativeOrder.marketId = params.marketId;
    derivativeOrder.orderType = params.orderType;
    derivativeOrder.orderInfo = orderInfo;
    derivativeOrder.margin = params.margin;
    derivativeOrder.triggerPrice = params.triggerPrice || "0";
    const message = InjectiveExchangeV1Beta1Tx.MsgCreateDerivativeLimitOrder.create();
    message.sender = params.injectiveAddress;
    message.order = derivativeOrder;
    return message;
};
/**
 * @category Messages
 */
export default class MsgCreateDerivativeLimitOrder extends MsgBase {
    static fromJSON(params) {
        return new MsgCreateDerivativeLimitOrder(params);
    }
    toProto() {
        const { params: initialParams } = this;
        const params = Object.assign(Object.assign({}, initialParams), { price: amountToCosmosSdkDecAmount(initialParams.price).toFixed(), margin: amountToCosmosSdkDecAmount(initialParams.margin).toFixed(), triggerPrice: amountToCosmosSdkDecAmount(initialParams.triggerPrice || 0).toFixed(), quantity: amountToCosmosSdkDecAmount(initialParams.quantity).toFixed() });
        return createLimitOrder(params);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder" }, proto);
    }
    toAmino() {
        const { params } = this;
        const proto = createLimitOrder(params);
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "exchange/MsgCreateDerivativeLimitOrder",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveExchangeV1Beta1Tx.MsgCreateDerivativeLimitOrder.encode(this.toProto()).finish();
    }
}
