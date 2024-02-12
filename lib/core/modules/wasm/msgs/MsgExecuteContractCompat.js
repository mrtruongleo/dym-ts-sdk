import snakecaseKeys from "snakecase-keys";
import { MsgBase } from "../../MsgBase";
import { GeneralException } from "@injectivelabs/exceptions";
import { InjectiveWasmxV1Beta1Tx } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgExecuteContractCompat extends MsgBase {
    static fromJSON(params) {
        return new MsgExecuteContractCompat(params);
    }
    toProto() {
        const { params } = this;
        const message = InjectiveWasmxV1Beta1Tx.MsgExecuteContractCompat.create();
        const msg = this.getMsgObject();
        message.msg = JSON.stringify(msg);
        message.sender = params.sender;
        message.contract = params.contractAddress;
        if (params.funds) {
            const fundsToArray = Array.isArray(params.funds)
                ? params.funds
                : [params.funds];
            const funds = fundsToArray.map((coin) => {
                return `${coin.amount}${coin.denom}`;
            });
            message.funds = funds.join(",");
        }
        else {
            message.funds = "0";
        }
        return InjectiveWasmxV1Beta1Tx.MsgExecuteContractCompat.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.wasmx.v1.MsgExecuteContractCompat" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign(Object.assign({}, snakecaseKeys(proto)), { msg: JSON.stringify(this.getMsgObject()) });
        // @ts-ignore
        delete message.funds_list;
        return {
            type: "wasmx/MsgExecuteContractCompat",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.wasmx.v1.MsgExecuteContractCompat" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.wasmx.v1.MsgExecuteContractCompat",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveWasmxV1Beta1Tx.MsgExecuteContractCompat.encode(this.toProto()).finish();
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
