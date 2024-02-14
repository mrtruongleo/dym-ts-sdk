"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const numbers_1 = require("../../../../utils/numbers");
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const createMessage = (params) => {
    const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgIncreasePositionMargin.create();
    message.sender = params.injectiveAddress;
    message.amount = params.amount;
    message.marketId = params.marketId;
    message.sourceSubaccountId = params.srcSubaccountId;
    message.destinationSubaccountId = params.dstSubaccountId;
    return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgIncreasePositionMargin.fromPartial(message);
};
/**
 * @category Messages
 */
class MsgIncreasePositionMargin extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgIncreasePositionMargin(params);
    }
    toProto() {
        const { params: initialParams } = this;
        const params = Object.assign(Object.assign({}, initialParams), { amount: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.amount).toFixed() });
        return createMessage(params);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgIncreasePositionMargin" }, proto);
    }
    toAmino() {
        const { params } = this;
        const proto = createMessage(params);
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "exchange/MsgIncreasePositionMargin",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgIncreasePositionMargin" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgIncreasePositionMargin",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgIncreasePositionMargin.encode(this.toProto()).finish();
    }
}
exports.default = MsgIncreasePositionMargin;
