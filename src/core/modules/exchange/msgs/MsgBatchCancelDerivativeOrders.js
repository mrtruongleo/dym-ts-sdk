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
class MsgBatchCancelDerivativeOrders extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgBatchCancelDerivativeOrders(params);
    }
    toProto() {
        const { params } = this;
        const orderDataList = params.orders.map((order) => {
            const orderData = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.OrderData.create();
            orderData.marketId = order.marketId;
            orderData.subaccountId = order.subaccountId;
            if (order.cid) {
                orderData.cid = order.cid;
            }
            if (order.orderHash) {
                orderData.orderHash = order.orderHash;
            }
            // TODO: Send order.orderMask instead when chain handles order mask properly.
            orderData.orderMask = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderMask.ANY;
            return orderData;
        });
        const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgBatchCancelDerivativeOrders.create();
        message.sender = params.injectiveAddress;
        message.data = orderDataList.map((o) => o);
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgBatchCancelDerivativeOrders.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgBatchCancelDerivativeOrders" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "exchange/MsgBatchCancelDerivativeOrders",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgBatchCancelDerivativeOrders" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgBatchCancelDerivativeOrders",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgBatchCancelDerivativeOrders.encode(this.toProto()).finish();
    }
}
exports.default = MsgBatchCancelDerivativeOrders;
