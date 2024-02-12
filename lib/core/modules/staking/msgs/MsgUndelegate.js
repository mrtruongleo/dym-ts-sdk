import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmosBaseV1Beta1Coin, CosmosStakingV1Beta1Tx, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgUndelegate extends MsgBase {
    static fromJSON(params) {
        return new MsgUndelegate(params);
    }
    toProto() {
        const { params } = this;
        const coinAmount = CosmosBaseV1Beta1Coin.Coin.create();
        coinAmount.denom = params.amount.denom;
        coinAmount.amount = params.amount.amount;
        const message = CosmosStakingV1Beta1Tx.MsgUndelegate.create();
        message.amount = coinAmount;
        message.delegatorAddress = params.injectiveAddress;
        message.validatorAddress = params.validatorAddress;
        return CosmosStakingV1Beta1Tx.MsgUndelegate.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.staking.v1beta1.MsgUndelegate" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "cosmos-sdk/MsgUndelegate",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmos.staking.v1beta1.MsgUndelegate" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.staking.v1beta1.MsgUndelegate",
            message: proto,
        };
    }
    toBinary() {
        return CosmosStakingV1Beta1Tx.MsgUndelegate.encode(this.toProto()).finish();
    }
}