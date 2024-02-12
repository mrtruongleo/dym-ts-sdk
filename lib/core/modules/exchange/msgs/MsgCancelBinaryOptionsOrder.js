import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { InjectiveExchangeV1Beta1Tx, InjectiveExchangeV1Beta1Exchange, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgCancelBinaryOptionsOrder extends MsgBase {
    static fromJSON(params) {
        return new MsgCancelBinaryOptionsOrder(params);
    }
    toProto() {
        const { params } = this;
        const message = InjectiveExchangeV1Beta1Tx.MsgCancelBinaryOptionsOrder.create();
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
        return message;
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgCancelBinaryOptionsOrder" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "exchange/MsgCancelBinaryOptionsOrder",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgCancelBinaryOptionsOrder" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgCancelBinaryOptionsOrder",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveExchangeV1Beta1Tx.MsgCancelBinaryOptionsOrder.encode(this.toProto()).finish();
    }
}
