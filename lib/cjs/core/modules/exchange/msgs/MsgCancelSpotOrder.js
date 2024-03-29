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
class MsgCancelSpotOrder extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgCancelSpotOrder(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCancelSpotOrder.create();
        message.sender = params.injectiveAddress;
        message.marketId = params.marketId;
        message.subaccountId = params.subaccountId;
        if (params.orderHash) {
            message.orderHash = params.orderHash;
        }
        if (params.cid) {
            message.cid = params.cid;
        }
        // TODO: message.setOrderMask does not exist yet, enable this once it does.
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCancelSpotOrder.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.exchange.v1beta1.MsgCancelSpotOrder",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "exchange/MsgCancelSpotOrder",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.exchange.v1beta1.MsgCancelSpotOrder",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgCancelSpotOrder",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgCancelSpotOrder.encode(this.toProto()).finish();
    }
}
exports.default = MsgCancelSpotOrder;
//# sourceMappingURL=MsgCancelSpotOrder.js.map