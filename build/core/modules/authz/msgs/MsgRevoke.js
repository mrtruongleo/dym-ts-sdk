import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmosAuthzV1Beta1Tx } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgRevoke extends MsgBase {
    static fromJSON(params) {
        return new MsgRevoke(params);
    }
    toProto() {
        const { params } = this;
        const message = CosmosAuthzV1Beta1Tx.MsgRevoke.create();
        message.grantee = params.grantee;
        message.granter = params.granter;
        message.msgTypeUrl = params.messageType;
        return CosmosAuthzV1Beta1Tx.MsgRevoke.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmos.authz.v1beta1.MsgRevoke",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "cosmos-sdk/MsgRevoke",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/cosmos.authz.v1beta1.MsgRevoke",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.authz.v1beta1.MsgRevoke",
            message: proto,
        };
    }
    toBinary() {
        return CosmosAuthzV1Beta1Tx.MsgRevoke.encode(this.toProto()).finish();
    }
}
