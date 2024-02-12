import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmosBaseV1Beta1Coin, InjectiveInsuranceV1Beta1Tx, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgRequestRedemption extends MsgBase {
    static fromJSON(params) {
        return new MsgRequestRedemption(params);
    }
    toProto() {
        const { params } = this;
        const amountCoin = CosmosBaseV1Beta1Coin.Coin.create();
        amountCoin.amount = params.amount.amount;
        amountCoin.denom = params.amount.denom;
        const message = InjectiveInsuranceV1Beta1Tx.MsgRequestRedemption.create();
        message.amount = amountCoin;
        message.marketId = params.marketId;
        message.sender = params.injectiveAddress;
        return InjectiveInsuranceV1Beta1Tx.MsgRequestRedemption.fromJSON(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.insurance.v1beta1.MsgRequestRedemption" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "insurance/MsgRequestRedemption",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.insurance.v1beta1.MsgRequestRedemption" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.insurance.v1beta1.MsgRequestRedemption",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveInsuranceV1Beta1Tx.MsgRequestRedemption.encode(this.toProto()).finish();
    }
}
