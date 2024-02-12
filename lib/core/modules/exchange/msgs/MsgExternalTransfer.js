import { CosmosBaseV1Beta1Coin, InjectiveExchangeV1Beta1Tx, } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
/**
 * @category Messages
 */
export default class MsgExternalTransfer extends MsgBase {
    static fromJSON(params) {
        return new MsgExternalTransfer(params);
    }
    toProto() {
        const { params } = this;
        const amountCoin = CosmosBaseV1Beta1Coin.Coin.create();
        amountCoin.amount = params.amount.amount;
        amountCoin.denom = params.amount.denom;
        const message = InjectiveExchangeV1Beta1Tx.MsgExternalTransfer.create();
        message.sender = params.injectiveAddress;
        message.sourceSubaccountId = params.srcSubaccountId;
        message.destinationSubaccountId = params.dstSubaccountId;
        message.amount = amountCoin;
        return InjectiveExchangeV1Beta1Tx.MsgExternalTransfer.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgExternalTransfer" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "exchange/MsgExternalTransfer",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgExternalTransfer" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgExternalTransfer",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveExchangeV1Beta1Tx.MsgExternalTransfer.encode(this.toProto()).finish();
    }
}
