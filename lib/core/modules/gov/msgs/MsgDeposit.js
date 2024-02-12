import { CosmosBaseV1Beta1Coin, CosmosGovV1Tx, } from "@injectivelabs/core-proto-ts";
import snakeCaseKeys from "snakecase-keys";
import { MsgBase } from "../../MsgBase";
/**
 * @category Messages
 */
export default class MsgDeposit extends MsgBase {
    static fromJSON(params) {
        return new MsgDeposit(params);
    }
    toProto() {
        const { params } = this;
        const deposit = CosmosBaseV1Beta1Coin.Coin.create();
        deposit.amount = params.amount.amount;
        deposit.denom = params.amount.denom;
        const message = CosmosGovV1Tx.MsgDeposit.create();
        message.depositor = params.depositor;
        message.proposalId = params.proposalId.toString();
        message.amount = [deposit];
        return CosmosGovV1Tx.MsgDeposit.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmos.gov.v1beta1.MsgDeposit",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakeCaseKeys(proto),
        };
        return {
            type: "cosmos-sdk/MsgDeposit",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/cosmos.gov.v1beta1.MsgDeposit",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.gov.v1beta1.MsgDeposit",
            message: proto,
        };
    }
    toBinary() {
        return CosmosGovV1Tx.MsgDeposit.encode(this.toProto()).finish();
    }
}
