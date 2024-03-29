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
class MsgRevokeAllowance extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgRevokeAllowance(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.CosmosFeegrantV1Beta1Tx.MsgRevokeAllowance.create();
        message.grantee = params.grantee;
        message.granter = params.granter;
        return core_proto_ts_1.CosmosFeegrantV1Beta1Tx.MsgRevokeAllowance.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.feegrant.v1beta1.MsgRevokeAllowance" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
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
        return core_proto_ts_1.CosmosFeegrantV1Beta1Tx.MsgRevokeAllowance.encode(this.toProto()).finish();
    }
}
exports.default = MsgRevokeAllowance;
