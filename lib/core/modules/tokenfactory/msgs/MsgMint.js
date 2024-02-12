import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { InjectiveTokenFactoryV1Beta1Tx } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgMint extends MsgBase {
    static fromJSON(params) {
        return new MsgMint(params);
    }
    toProto() {
        const { params } = this;
        const message = InjectiveTokenFactoryV1Beta1Tx.MsgMint.create();
        message.sender = params.sender;
        message.amount = params.amount;
        return InjectiveTokenFactoryV1Beta1Tx.MsgMint.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.tokenfactory.v1beta1.MsgMint" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "injective/tokenfactory/mint",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.tokenfactory.v1beta1.MsgMint" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.tokenfactory.v1beta1.MsgMint",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveTokenFactoryV1Beta1Tx.MsgMint.encode(this.toProto()).finish();
    }
}
