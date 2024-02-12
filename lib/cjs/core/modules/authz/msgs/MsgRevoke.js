"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
/**
 * @category Messages
 */
class MsgRevoke extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgRevoke(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.CosmosAuthzV1Beta1Tx.MsgRevoke.create();
        message.grantee = params.grantee;
        message.granter = params.granter;
        message.msgTypeUrl = params.messageType;
        return core_proto_ts_1.CosmosAuthzV1Beta1Tx.MsgRevoke.fromPartial(message);
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
            ...(0, snakecase_keys_1.default)(proto),
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
        return core_proto_ts_1.CosmosAuthzV1Beta1Tx.MsgRevoke.encode(this.toProto()).finish();
    }
}
exports.default = MsgRevoke;
//# sourceMappingURL=MsgRevoke.js.map