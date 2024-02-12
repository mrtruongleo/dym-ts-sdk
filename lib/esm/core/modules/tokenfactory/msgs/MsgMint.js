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
class MsgMint extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgMint(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgMint.create();
        message.sender = params.sender;
        message.amount = params.amount;
        return core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgMint.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.tokenfactory.v1beta1.MsgMint",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "injective/tokenfactory/mint",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.tokenfactory.v1beta1.MsgMint",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.tokenfactory.v1beta1.MsgMint",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgMint.encode(this.toProto()).finish();
    }
}
exports.default = MsgMint;
//# sourceMappingURL=MsgMint.js.map