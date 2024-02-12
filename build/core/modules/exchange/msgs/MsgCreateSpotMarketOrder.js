import { MsgBase } from "../../MsgBase";
import { amountToCosmosSdkDecAmount } from "../../../../utils/numbers";
import snakecaseKeys from "snakecase-keys";
import { InjectiveExchangeV1Beta1Exchange, InjectiveExchangeV1Beta1Tx, } from "@injectivelabs/core-proto-ts";
const createMarketOrder = (params) => {
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
    const message = InjectiveExchangeV1Beta1Tx.MsgCreateSpotMarketOrder.create();
    message.sender = params.injectiveAddress;
    message.order = spotOrder;
    return InjectiveExchangeV1Beta1Tx.MsgCreateSpotMarketOrder.fromPartial(message);
};
/**
 * @category Messages
 */
export default class MsgCreateSpotMarketOrder extends MsgBase {
    static fromJSON(params) {
        return new MsgCreateSpotMarketOrder(params);
    }
    toProto() {
        const { params: initialParams } = this;
        const params = {
            ...initialParams,
            price: amountToCosmosSdkDecAmount(initialParams.price).toFixed(),
            triggerPrice: amountToCosmosSdkDecAmount(initialParams.triggerPrice || 0).toFixed(),
            quantity: amountToCosmosSdkDecAmount(initialParams.quantity).toFixed(),
        };
        return createMarketOrder(params);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.exchange.v1beta1.MsgCreateSpotMarketOrder",
            ...proto,
        };
    }
    toAmino() {
        const { params } = this;
        const proto = createMarketOrder(params);
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "exchange/MsgCreateSpotMarketOrder",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.exchange.v1beta1.MsgCreateSpotMarketOrder",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgCreateSpotMarketOrder",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveExchangeV1Beta1Tx.MsgCreateSpotMarketOrder.encode(this.toProto()).finish();
    }
}
