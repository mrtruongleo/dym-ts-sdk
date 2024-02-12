import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmosBaseV1Beta1Coin, CosmosStakingV1Beta1Tx, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgBeginRedelegate extends MsgBase {
    static fromJSON(params) {
        return new MsgBeginRedelegate(params);
    }
    toProto() {
        const { params } = this;
        const coinAmount = CosmosBaseV1Beta1Coin.Coin.create();
        coinAmount.denom = params.amount.denom;
        coinAmount.amount = params.amount.amount;
        const message = CosmosStakingV1Beta1Tx.MsgBeginRedelegate.create();
        message.amount = coinAmount;
        message.delegatorAddress = params.injectiveAddress;
        message.validatorSrcAddress = params.srcValidatorAddress;
        message.validatorDstAddress = params.dstValidatorAddress;
        return CosmosStakingV1Beta1Tx.MsgBeginRedelegate.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.staking.v1beta1.MsgBeginRedelegate" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "cosmos-sdk/MsgBeginRedelegate",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmos.staking.v1beta1.MsgBeginRedelegate" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
            message: proto,
        };
    }
    toBinary() {
        return CosmosStakingV1Beta1Tx.MsgBeginRedelegate.encode(this.toProto()).finish();
    }
}
