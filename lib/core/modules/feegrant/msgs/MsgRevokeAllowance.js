import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmosFeegrantV1Beta1Tx } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgRevokeAllowance extends MsgBase {
    static fromJSON(params) {
        return new MsgRevokeAllowance(params);
    }
    toProto() {
        const { params } = this;
        const message = CosmosFeegrantV1Beta1Tx.MsgRevokeAllowance.create();
        message.grantee = params.grantee;
        message.granter = params.granter;
        return CosmosFeegrantV1Beta1Tx.MsgRevokeAllowance.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.feegrant.v1beta1.MsgRevokeAllowance" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "cosmos-sdk/MsgRevokeAllowance",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmos.feegrant.v1beta1.MsgRevokeAllowance" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.feegrant.v1beta1.MsgRevokeAllowance",
            message: proto,
        };
    }
    toBinary() {
        return CosmosFeegrantV1Beta1Tx.MsgRevokeAllowance.encode(this.toProto()).finish();
    }
}
