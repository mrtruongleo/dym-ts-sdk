import { InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
/**
 * @category Messages
 */
export default class MsgReclaimLockedFunds extends MsgBase {
    static fromJSON(params) {
        return new MsgReclaimLockedFunds(params);
    }
    toProto() {
        const { params } = this;
        const message = InjectiveExchangeV1Beta1Tx.MsgReclaimLockedFunds.create();
        message.sender = params.sender;
        message.lockedAccountPubKey = Buffer.from(params.lockedAccountPubKey, "base64");
        message.signature = params.signature;
        return InjectiveExchangeV1Beta1Tx.MsgReclaimLockedFunds.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.exchange.v1beta1.MsgReclaimLockedFunds",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "exchange/MsgReclaimLockedFunds",
            value: {
                sender: message.sender,
                locked_account_pub_key: message.locked_account_pub_key,
                signature: message.signature,
            },
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.exchange.v1beta1.MsgReclaimLockedFunds",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgReclaimLockedFunds",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveExchangeV1Beta1Tx.MsgReclaimLockedFunds.encode(this.toProto()).finish();
    }
}
