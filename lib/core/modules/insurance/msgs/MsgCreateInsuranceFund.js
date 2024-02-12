import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmosBaseV1Beta1Coin, InjectiveInsuranceV1Beta1Tx, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgCreateInsuranceFund extends MsgBase {
    static fromJSON(params) {
        return new MsgCreateInsuranceFund(params);
    }
    toProto() {
        const { params } = this;
        const amountCoin = CosmosBaseV1Beta1Coin.Coin.create();
        amountCoin.amount = params.deposit.amount;
        amountCoin.denom = params.deposit.denom;
        const message = InjectiveInsuranceV1Beta1Tx.MsgCreateInsuranceFund.create();
        message.ticker = params.fund.ticker;
        message.quoteDenom = params.fund.quoteDenom;
        message.oracleBase = params.fund.oracleBase;
        message.oracleQuote = params.fund.oracleQuote;
        message.oracleType = params.fund.oracleType;
        message.sender = params.injectiveAddress;
        message.initialDeposit = amountCoin;
        message.expiry = (params.fund.expiry ? params.fund.expiry : -1).toString();
        return InjectiveInsuranceV1Beta1Tx.MsgCreateInsuranceFund.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.insurance.v1beta1.MsgCreateInsuranceFund" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "insurance/MsgCreateInsuranceFund",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.insurance.v1beta1.MsgCreateInsuranceFund" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.insurance.v1beta1.MsgCreateInsuranceFund",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveInsuranceV1Beta1Tx.MsgCreateInsuranceFund.encode(this.toProto()).finish();
    }
}
