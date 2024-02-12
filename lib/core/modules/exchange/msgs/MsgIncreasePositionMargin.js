import { InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { amountToCosmosSdkDecAmount } from "../../../../utils/numbers";
import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
const createMessage = (params) => {
    const message = InjectiveExchangeV1Beta1Tx.MsgIncreasePositionMargin.create();
    message.sender = params.injectiveAddress;
    message.amount = params.amount;
    message.marketId = params.marketId;
    message.sourceSubaccountId = params.srcSubaccountId;
    message.destinationSubaccountId = params.dstSubaccountId;
    return InjectiveExchangeV1Beta1Tx.MsgIncreasePositionMargin.fromPartial(message);
};
/**
 * @category Messages
 */
export default class MsgIncreasePositionMargin extends MsgBase {
    static fromJSON(params) {
        return new MsgIncreasePositionMargin(params);
    }
    toProto() {
        const { params: initialParams } = this;
        const params = Object.assign(Object.assign({}, initialParams), { amount: amountToCosmosSdkDecAmount(initialParams.amount).toFixed() });
        return createMessage(params);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgIncreasePositionMargin" }, proto);
    }
    toAmino() {
        const { params } = this;
        const proto = createMessage(params);
        const message = Object.assign({}, snakecaseKeys(proto));
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
        return InjectiveExchangeV1Beta1Tx.MsgIncreasePositionMargin.encode(this.toProto()).finish();
    }
}
