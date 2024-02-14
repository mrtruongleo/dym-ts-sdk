"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
/**
 * @category Messages
 */
class MsgReclaimLockedFunds extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgReclaimLockedFunds(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgReclaimLockedFunds.create();
        message.sender = params.sender;
        message.lockedAccountPubKey = Buffer.from(params.lockedAccountPubKey, "base64");
        message.signature = params.signature;
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgReclaimLockedFunds.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgReclaimLockedFunds" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "exchange/MsgReclaimLockedFunds",
            value: {
                sender: message.sender,
                locked_account_pub_key: message.locked_account_pub_key,
                signature: message.signature,
            },
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgReclaimLockedFunds" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgReclaimLockedFunds",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgReclaimLockedFunds.encode(this.toProto()).finish();
    }
}
exports.default = MsgReclaimLockedFunds;
