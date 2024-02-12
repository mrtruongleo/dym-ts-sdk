import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmosBaseV1Beta1Coin, InjectiveInsuranceV1Beta1Tx, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgUnderwrite extends MsgBase {
    static fromJSON(params) {
        return new MsgUnderwrite(params);
    }
    toProto() {
        const { params } = this;
        const amountCoin = CosmosBaseV1Beta1Coin.Coin.create();
        amountCoin.amount = params.amount.amount;
        amountCoin.denom = params.amount.denom;
        const message = InjectiveInsuranceV1Beta1Tx.MsgUnderwrite.create();
        message.deposit = amountCoin;
        message.marketId = params.marketId;
        message.sender = params.injectiveAddress;
        return message;
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.insurance.v1beta1.MsgUnderwrite" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "insurance/MsgUnderwrite",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.insurance.v1beta1.MsgUnderwrite" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.insurance.v1beta1.MsgUnderwrite",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveInsuranceV1Beta1Tx.MsgUnderwrite.encode(this.toProto()).finish();
    }
}
