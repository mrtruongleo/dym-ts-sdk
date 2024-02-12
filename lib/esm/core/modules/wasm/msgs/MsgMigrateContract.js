import { fromUtf8 } from "../../../../utils/utf8";
import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmwasmWasmV1Tx } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgMigrateContract extends MsgBase {
    static fromJSON(params) {
        return new MsgMigrateContract(params);
    }
    toProto() {
        const { params } = this;
        const message = CosmwasmWasmV1Tx.MsgMigrateContract.create();
        message.codeId = params.codeId.toString();
        message.contract = params.contract;
        message.sender = params.sender;
        message.msg = fromUtf8(JSON.stringify(params.msg));
        return CosmwasmWasmV1Tx.MsgMigrateContract.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmwasm.wasm.v1.MsgMigrateContract",
            ...proto,
        };
    }
    toAmino() {
        const { params } = this;
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
            msg: params.msg,
        };
        return {
            type: "wasm/MsgMigrateContract",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/cosmwasm.wasm.v1.MsgMigrateContract",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmwasm.wasm.v1.MsgMigrateContract",
            message: proto,
        };
    }
    toBinary() {
        return CosmwasmWasmV1Tx.MsgMigrateContract.encode(this.toProto()).finish();
    }
}
