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
class MsgCreateDenom extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgCreateDenom(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgCreateDenom.create();
        message.sender = params.sender;
        message.subdenom = params.subdenom;
        message.name = params.name || "";
        message.symbol = params.symbol || "";
        return core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgCreateDenom.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.tokenfactory.v1beta1.MsgCreateDenom",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "injective/tokenfactory/create-denom",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.tokenfactory.v1beta1.MsgCreateDenom",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.tokenfactory.v1beta1.MsgCreateDenom",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgCreateDenom.encode(this.toProto()).finish();
    }
}
exports.default = MsgCreateDenom;
//# sourceMappingURL=MsgCreateDenom.js.map