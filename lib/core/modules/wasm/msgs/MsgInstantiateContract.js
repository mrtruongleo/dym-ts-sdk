import { fromUtf8 } from "../../../../utils/utf8";
import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmwasmWasmV1Tx, CosmosBaseV1Beta1Coin, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgInstantiateContract extends MsgBase {
    static fromJSON(params) {
        return new MsgInstantiateContract(params);
    }
    toProto() {
        const { params } = this;
        const message = CosmwasmWasmV1Tx.MsgInstantiateContract.create();
        message.msg = fromUtf8(JSON.stringify(params.msg));
        message.sender = params.sender;
        message.admin = params.admin;
        message.codeId = params.codeId.toString();
        message.label = params.label;
        if (params.amount) {
            const funds = CosmosBaseV1Beta1Coin.Coin.create();
            funds.amount = params.amount.amount;
            funds.denom = params.amount.denom;
            message.funds = [funds];
        }
        return CosmwasmWasmV1Tx.MsgInstantiateContract.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmwasm.wasm.v1.MsgInstantiateContract",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "wasm/MsgInstantiateContract",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/cosmwasm.wasm.v1.MsgInstantiateContract",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmwasm.wasm.v1.MsgInstantiateContract",
            message: proto,
        };
    }
    toBinary() {
        return CosmwasmWasmV1Tx.MsgInstantiateContract.encode(this.toProto()).finish();
    }
}
