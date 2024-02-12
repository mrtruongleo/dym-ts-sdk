import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { InjectiveExchangeV1Beta1Exchange, InjectiveExchangeV1Beta1Tx, } from "@injectivelabs/core-proto-ts";
export default class MsgCancelDerivativeOrder extends MsgBase {
    static fromJSON(params) {
        return new MsgCancelDerivativeOrder(params);
    }
    toProto() {
        const { params } = this;
        const message = InjectiveExchangeV1Beta1Tx.MsgCancelDerivativeOrder.create();
        message.sender = params.injectiveAddress;
        message.marketId = params.marketId;
        message.subaccountId = params.subaccountId;
        if (params.orderHash) {
            message.orderHash = params.orderHash;
        }
        if (params.cid) {
            message.cid = params.cid;
        }
        // TODO: Send order.orderMask instead when chain handles order mask properly.
        message.orderMask = InjectiveExchangeV1Beta1Exchange.OrderMask.ANY;
        return InjectiveExchangeV1Beta1Tx.MsgCancelDerivativeOrder.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.exchange.v1beta1.MsgCancelDerivativeOrder",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "exchange/MsgCancelDerivativeOrder",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.exchange.v1beta1.MsgCancelDerivativeOrder",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgCancelDerivativeOrder",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveExchangeV1Beta1Tx.MsgCancelDerivativeOrder.encode(this.toProto()).finish();
    }
}
