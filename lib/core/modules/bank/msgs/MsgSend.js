import snakecaseKeys from "snakecase-keys";
import { MsgBase } from "../../MsgBase";
import { CosmosBankV1Beta1Tx, CosmosBaseV1Beta1Coin, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgSend extends MsgBase {
    static fromJSON(params) {
        return new MsgSend(params);
    }
    toProto() {
        const { params } = this;
        const amounts = Array.isArray(params.amount)
            ? params.amount
            : [params.amount];
        const amountsToSend = amounts.map((amount) => {
            const amountToSend = CosmosBaseV1Beta1Coin.Coin.create();
            amountToSend.amount = amount.amount;
            amountToSend.denom = amount.denom;
            return amountToSend;
        });
        const message = CosmosBankV1Beta1Tx.MsgSend.create();
        message.fromAddress = params.srcInjectiveAddress;
        message.toAddress = params.dstInjectiveAddress;
        message.amount = amountsToSend;
        return CosmosBankV1Beta1Tx.MsgSend.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.bank.v1beta1.MsgSend" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "cosmos-sdk/MsgSend",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmos.bank.v1beta1.MsgSend" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.bank.v1beta1.MsgSend",
            message: proto,
        };
    }
    toBinary() {
        return CosmosBankV1Beta1Tx.MsgSend.encode(this.toProto()).finish();
    }
}
