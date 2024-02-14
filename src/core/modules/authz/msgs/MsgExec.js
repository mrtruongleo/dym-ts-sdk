"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const MsgBase_1 = require("../../MsgBase");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
/**
 * @category Messages
 */
class MsgExec extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgExec(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.CosmosAuthzV1Beta1Tx.MsgExec.create();
        if (params.grantee) {
            message.grantee = params.grantee;
        }
        const msgs = Array.isArray(params.msgs) ? params.msgs : [params.msgs];
        const actualMsgs = msgs.map((msg) => {
            const msgValue = core_proto_ts_1.GoogleProtobufAny.Any.create();
            msgValue.typeUrl = msg.toDirectSign().type;
            msgValue.value = msg.toBinary();
            return msgValue;
        });
        message.msgs = actualMsgs;
        return core_proto_ts_1.CosmosAuthzV1Beta1Tx.MsgExec.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.authz.v1beta1.MsgExec" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign(Object.assign({}, (0, snakecase_keys_1.default)(proto)), { msgs: proto.msgs });
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
        return core_proto_ts_1.CosmosAuthzV1Beta1Tx.MsgExec.encode(this.toProto()).finish();
    }
}
exports.default = MsgExec;
