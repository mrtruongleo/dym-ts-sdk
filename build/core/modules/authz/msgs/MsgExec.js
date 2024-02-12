import snakecaseKeys from "snakecase-keys";
import { MsgBase } from "../../MsgBase";
import { CosmosAuthzV1Beta1Tx, GoogleProtobufAny, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgExec extends MsgBase {
    static fromJSON(params) {
        return new MsgExec(params);
    }
    toProto() {
        const { params } = this;
        const message = CosmosAuthzV1Beta1Tx.MsgExec.create();
        if (params.grantee) {
            message.grantee = params.grantee;
        }
        const msgs = Array.isArray(params.msgs) ? params.msgs : [params.msgs];
        const actualMsgs = msgs.map((msg) => {
            const msgValue = GoogleProtobufAny.Any.create();
            msgValue.typeUrl = msg.toDirectSign().type;
            msgValue.value = msg.toBinary();
            return msgValue;
        });
        message.msgs = actualMsgs;
        return CosmosAuthzV1Beta1Tx.MsgExec.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmos.authz.v1beta1.MsgExec",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
            msgs: proto.msgs,
        };
        return {
            type: "cosmos-sdk/MsgExec",
            value: message,
        };
    }
    toWeb3() {
        const { params } = this;
        const msgs = Array.isArray(params.msgs) ? params.msgs : [params.msgs];
        return {
            "@type": "/cosmos.authz.v1beta1.MsgExec",
            grantee: params.grantee,
            msgs: msgs.map((msg) => msg.toWeb3()),
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.authz.v1beta1.MsgExec",
            message: proto,
        };
    }
    toBinary() {
        return CosmosAuthzV1Beta1Tx.MsgExec.encode(this.toProto()).finish();
    }
}
