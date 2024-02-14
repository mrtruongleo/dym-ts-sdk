"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
class MsgCancelDerivativeOrder extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgCancelDerivativeOrder(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCancelDerivativeOrder.create();
        message.sender = params.injectiveAddress;
        message.marketId = params.marketId;
        message.subaccountId = params.subaccountId;
        if (params.orderHash) {
            message.orderHash = params.orderHash;
        }
        if (params.cid) {
            message.cid = params.cid;
        }
        // TODO: Send order.orderMask instead when chain handles order mask properly.
        message.orderMask = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderMask.ANY;
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCancelDerivativeOrder.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgCancelDerivativeOrder" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "exchange/MsgCancelDerivativeOrder",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgCancelDerivativeOrder" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgCancelDerivativeOrder",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCancelDerivativeOrder.encode(this.toProto()).finish();
    }
}
exports.default = MsgCancelDerivativeOrder;
