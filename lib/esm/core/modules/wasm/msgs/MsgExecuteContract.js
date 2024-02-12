import { MsgBase } from "../../MsgBase";
import { GeneralException } from "@injectivelabs/exceptions";
import snakecaseKeys from "snakecase-keys";
import { fromUtf8 } from "../../../../utils/utf8";
import { CosmosBaseV1Beta1Coin, CosmwasmWasmV1Tx, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgExecuteContract extends MsgBase {
    static fromJSON(params) {
        return new MsgExecuteContract(params);
    }
    toProto() {
        const { params } = this;
        const message = CosmwasmWasmV1Tx.MsgExecuteContract.create();
        const msg = this.getMsgObject();
        message.msg = fromUtf8(JSON.stringify(msg));
        message.sender = params.sender;
        message.contract = params.contractAddress;
        if (params.funds) {
            const fundsToArray = Array.isArray(params.funds)
                ? params.funds
                : [params.funds];
            const funds = fundsToArray.map((coin) => {
                const funds = CosmosBaseV1Beta1Coin.Coin.create();
                funds.amount = coin.amount;
                funds.denom = coin.denom;
                return funds;
            });
            message.funds = funds;
        }
        return CosmwasmWasmV1Tx.MsgExecuteContract.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmwasm.wasm.v1.MsgExecuteContract",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
            msg: this.getMsgObject(),
        };
        return {
            type: "wasm/MsgExecuteContract",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/cosmwasm.wasm.v1.MsgExecuteContract",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmwasm.wasm.v1.MsgExecuteContract",
            message: proto,
        };
    }
    toBinary() {
        return CosmwasmWasmV1Tx.MsgExecuteContract.encode(this.toProto()).finish();
    }
    getMsgObject() {
        const { params } = this;
        if ((params.exec || params.msg) && params.execArgs) {
            throw new GeneralException(new Error("Please provide only one exec|msg argument"));
        }
        if (params.execArgs) {
            return params.execArgs.toExecData();
        }
        if (params.exec) {
            return {
                [params.exec.action]: params.exec.msg,
            };
        }
        if (params.msg) {
            return params.msg;
        }
        throw new GeneralException(new Error("Please provide at least one exec argument"));
    }
}
