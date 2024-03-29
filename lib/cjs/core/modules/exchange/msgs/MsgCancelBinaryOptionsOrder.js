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
class MsgCancelBinaryOptionsOrder extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgCancelBinaryOptionsOrder(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCancelBinaryOptionsOrder.create();
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
        return message;
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.exchange.v1beta1.MsgCancelBinaryOptionsOrder",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "exchange/MsgCancelBinaryOptionsOrder",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.exchange.v1beta1.MsgCancelBinaryOptionsOrder",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgCancelBinaryOptionsOrder",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCancelBinaryOptionsOrder.encode(this.toProto()).finish();
    }
}
exports.default = MsgCancelBinaryOptionsOrder;
//# sourceMappingURL=MsgCancelBinaryOptionsOrder.js.map