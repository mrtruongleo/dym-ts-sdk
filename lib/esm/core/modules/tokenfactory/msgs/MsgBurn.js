import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { InjectiveTokenFactoryV1Beta1Tx } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgBurn extends MsgBase {
    static fromJSON(params) {
        return new MsgBurn(params);
    }
    toProto() {
        const { params } = this;
        const message = InjectiveTokenFactoryV1Beta1Tx.MsgBurn.create();
        message.sender = params.sender;
        message.amount = params.amount;
        return InjectiveTokenFactoryV1Beta1Tx.MsgBurn.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.tokenfactory.v1beta1.MsgBurn",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "injective/tokenfactory/burn",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.tokenfactory.v1beta1.MsgBurn",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.tokenfactory.v1beta1.MsgBurn",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveTokenFactoryV1Beta1Tx.MsgBurn.encode(this.toProto()).finish();
    }
}
