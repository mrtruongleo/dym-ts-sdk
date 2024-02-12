import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmosDistributionV1Beta1Tx } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgWithdrawValidatorCommission extends MsgBase {
    static fromJSON(params) {
        return new MsgWithdrawValidatorCommission(params);
    }
    toProto() {
        const { params } = this;
        const message = CosmosDistributionV1Beta1Tx.MsgWithdrawValidatorCommission.create();
        message.validatorAddress = params.validatorAddress;
        return message;
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "cosmos-sdk/MsgWithdrawDelegationReward",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
            message: proto,
        };
    }
    toBinary() {
        return CosmosDistributionV1Beta1Tx.MsgWithdrawValidatorCommission.encode(this.toProto()).finish();
    }
}
