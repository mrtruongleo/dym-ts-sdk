import { MsgBase } from "../../MsgBase";
import { DEFAULT_BRIDGE_FEE_AMOUNT, DEFAULT_BRIDGE_FEE_DENOM, } from "@injectivelabs/utils";
import snakecaseKeys from "snakecase-keys";
import { CosmosBaseV1Beta1Coin, InjectivePeggyV1Beta1Msgs, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgSendToEth extends MsgBase {
    static fromJSON(params) {
        return new MsgSendToEth(params);
    }
    toProto() {
        const { params } = this;
        const coinAmount = CosmosBaseV1Beta1Coin.Coin.create();
        coinAmount.denom = params.amount.denom;
        coinAmount.amount = params.amount.amount;
        const bridgeFee = CosmosBaseV1Beta1Coin.Coin.create();
        bridgeFee.denom = params.bridgeFee
            ? params.bridgeFee.denom
            : DEFAULT_BRIDGE_FEE_DENOM;
        bridgeFee.amount = params.bridgeFee
            ? params.bridgeFee.amount
            : DEFAULT_BRIDGE_FEE_AMOUNT;
        const message = InjectivePeggyV1Beta1Msgs.MsgSendToEth.create();
        message.amount = coinAmount;
        message.sender = params.injectiveAddress;
        message.ethDest = params.address;
        message.bridgeFee = bridgeFee;
        return InjectivePeggyV1Beta1Msgs.MsgSendToEth.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.peggy.v1.MsgSendToEth",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "peggy/MsgSendToEth",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.peggy.v1.MsgSendToEth",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.peggy.v1.MsgSendToEth",
            message: proto,
        };
    }
    toBinary() {
        return InjectivePeggyV1Beta1Msgs.MsgSendToEth.encode(this.toProto()).finish();
    }
}
