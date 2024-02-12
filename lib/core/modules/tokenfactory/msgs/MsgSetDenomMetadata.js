import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { InjectiveTokenFactoryV1Beta1Tx } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgSetDenomMetadata extends MsgBase {
    static fromJSON(params) {
        return new MsgSetDenomMetadata(params);
    }
    toProto() {
        const { params } = this;
        const message = InjectiveTokenFactoryV1Beta1Tx.MsgSetDenomMetadata.create();
        message.sender = params.sender;
        message.metadata = params.metadata;
        return InjectiveTokenFactoryV1Beta1Tx.MsgSetDenomMetadata.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.tokenfactory.v1beta1.MsgSetDenomMetadata",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "injective/tokenfactory/set-denom-metadata",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.tokenfactory.v1beta1.MsgSetDenomMetadata",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.tokenfactory.v1beta1.MsgSetDenomMetadata",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveTokenFactoryV1Beta1Tx.MsgSetDenomMetadata.encode(this.toProto()).finish();
    }
}
