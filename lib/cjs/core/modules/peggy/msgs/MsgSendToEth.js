"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MsgBase_1 = require("../../MsgBase");
const utils_1 = require("@injectivelabs/utils");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
/**
 * @category Messages
 */
class MsgSendToEth extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgSendToEth(params);
    }
    toProto() {
        const { params } = this;
        const coinAmount = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        coinAmount.denom = params.amount.denom;
        coinAmount.amount = params.amount.amount;
        const bridgeFee = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        bridgeFee.denom = params.bridgeFee
            ? params.bridgeFee.denom
            : utils_1.DEFAULT_BRIDGE_FEE_DENOM;
        bridgeFee.amount = params.bridgeFee
            ? params.bridgeFee.amount
            : utils_1.DEFAULT_BRIDGE_FEE_AMOUNT;
        const message = core_proto_ts_1.InjectivePeggyV1Beta1Msgs.MsgSendToEth.create();
        message.amount = coinAmount;
        message.sender = params.injectiveAddress;
        message.ethDest = params.address;
        message.bridgeFee = bridgeFee;
        return core_proto_ts_1.InjectivePeggyV1Beta1Msgs.MsgSendToEth.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.peggy.v1.MsgSendToEth",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "peggy/MsgSendToEth",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.peggy.v1.MsgSendToEth",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.peggy.v1.MsgSendToEth",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectivePeggyV1Beta1Msgs.MsgSendToEth.encode(this.toProto()).finish();
    }
}
exports.default = MsgSendToEth;
//# sourceMappingURL=MsgSendToEth.js.map