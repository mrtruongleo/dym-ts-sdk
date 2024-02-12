import snakecaseKeys from "snakecase-keys";
import { MsgBase } from "../../MsgBase";
import { CosmosBankV1Beta1Tx, CosmosBankV1Beta1Bank, CosmosBaseV1Beta1Coin, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgMultiSend extends MsgBase {
    static fromJSON(params) {
        return new MsgMultiSend(params);
    }
    toProto() {
        const { params } = this;
        const inputs = params.inputs.map((i) => {
            const input = CosmosBankV1Beta1Bank.Input.create();
            input.address = i.address;
            input.coins = i.coins.map((c) => {
                const coin = CosmosBaseV1Beta1Coin.Coin.create();
                coin.amount = c.amount;
                coin.denom = c.denom;
                return coin;
            });
            return input;
        });
        const outputs = params.outputs.map((o) => {
            const output = CosmosBankV1Beta1Bank.Output.create();
            output.address = o.address;
            output.coins = o.coins.map((c) => {
                const coin = CosmosBaseV1Beta1Coin.Coin.create();
                coin.amount = c.amount;
                coin.denom = c.denom;
                return coin;
            });
            return output;
        });
        const message = CosmosBankV1Beta1Tx.MsgMultiSend.create();
        message.inputs = inputs;
        message.outputs = outputs;
        return message;
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.bank.v1beta1.MsgMultiSend" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "cosmos-sdk/MsgMultiSend",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmos.bank.v1beta1.MsgMultiSend" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.bank.v1beta1.MsgMultiSend",
            message: proto,
        };
    }
    toBinary() {
        return CosmosBankV1Beta1Tx.MsgMultiSend.encode(this.toProto()).finish();
    }
}
