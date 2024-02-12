import { InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
/**
 * @category Messages
 */
export default class MsgRewardsOptOut extends MsgBase {
    static fromJSON(params) {
        return new MsgRewardsOptOut(params);
    }
    toProto() {
        const { params } = this;
        const message = InjectiveExchangeV1Beta1Tx.MsgRewardsOptOut.create();
        message.sender = params.sender;
        return InjectiveExchangeV1Beta1Tx.MsgRewardsOptOut.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgRewardsOptOut" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "exchange/MsgRewardsOptOut",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgRewardsOptOut" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgRewardsOptOut",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveExchangeV1Beta1Tx.MsgRewardsOptOut.encode(this.toProto()).finish();
    }
}
