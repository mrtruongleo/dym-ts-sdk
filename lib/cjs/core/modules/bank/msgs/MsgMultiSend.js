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
class MsgMultiSend extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgMultiSend(params);
    }
    toProto() {
        const { params } = this;
        const inputs = params.inputs.map((i) => {
            const input = core_proto_ts_1.CosmosBankV1Beta1Bank.Input.create();
            input.address = i.address;
            input.coins = i.coins.map((c) => {
                const coin = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
                coin.amount = c.amount;
                coin.denom = c.denom;
                return coin;
            });
            return input;
        });
        const outputs = params.outputs.map((o) => {
            const output = core_proto_ts_1.CosmosBankV1Beta1Bank.Output.create();
            output.address = o.address;
            output.coins = o.coins.map((c) => {
                const coin = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
                coin.amount = c.amount;
                coin.denom = c.denom;
                return coin;
            });
            return output;
        });
        const message = core_proto_ts_1.CosmosBankV1Beta1Tx.MsgMultiSend.create();
        message.inputs = inputs;
        message.outputs = outputs;
        return message;
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmos.bank.v1beta1.MsgMultiSend",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "cosmos-sdk/MsgMultiSend",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/cosmos.bank.v1beta1.MsgMultiSend",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.bank.v1beta1.MsgMultiSend",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.CosmosBankV1Beta1Tx.MsgMultiSend.encode(this.toProto()).finish();
    }
}
exports.default = MsgMultiSend;
//# sourceMappingURL=MsgMultiSend.js.map