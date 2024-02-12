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
class MsgLiquidatePosition extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgLiquidatePosition(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgLiquidatePosition.create();
        message.sender = params.injectiveAddress;
        message.subaccountId = params.subaccountId;
        message.marketId = params.marketId;
        if (params.order) {
            const orderInfo = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderInfo.create();
            orderInfo.subaccountId = params.order.subaccountId;
            orderInfo.feeRecipient = params.order.feeRecipient;
            orderInfo.price = params.order.price;
            orderInfo.quantity = params.order.quantity;
            if (params.order.cid) {
                orderInfo.cid = params.order.cid;
            }
            const order = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.DerivativeOrder.create();
            order.marketId = params.order.marketId;
            order.margin = params.order.margin;
            order.triggerPrice = params.order.triggerPrice || "0";
        }
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgLiquidatePosition.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.exchange.v1beta1.MsgLiquidatePosition",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "exchange/MsgLiquidatePosition",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.exchange.v1beta1.MsgLiquidatePosition",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgLiquidatePosition",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgLiquidatePosition.encode(this.toProto()).finish();
    }
}
exports.default = MsgLiquidatePosition;
//# sourceMappingURL=MsgLiquidatePosition.js.map