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
class MsgBurn extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgBurn(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgBurn.create();
        message.sender = params.sender;
        message.amount = params.amount;
        return core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgBurn.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.tokenfactory.v1beta1.MsgBurn",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "injective/tokenfactory/burn",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.tokenfactory.v1beta1.MsgBurn",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.tokenfactory.v1beta1.MsgBurn",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgBurn.encode(this.toProto()).finish();
    }
}
exports.default = MsgBurn;
//# sourceMappingURL=MsgBurn.js.map