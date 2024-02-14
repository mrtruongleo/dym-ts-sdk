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
class MsgSetDenomMetadata extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgSetDenomMetadata(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgSetDenomMetadata.create();
        message.sender = params.sender;
        message.metadata = params.metadata;
        return core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgSetDenomMetadata.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.tokenfactory.v1beta1.MsgSetDenomMetadata" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "injective/tokenfactory/set-denom-metadata",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.tokenfactory.v1beta1.MsgSetDenomMetadata" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.tokenfactory.v1beta1.MsgSetDenomMetadata",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveTokenFactoryV1Beta1Tx.MsgSetDenomMetadata.encode(this.toProto()).finish();
    }
}
exports.default = MsgSetDenomMetadata;
