import { fromUtf8 } from "../../../../utils/utf8";
import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmwasmWasmV1Tx } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgStoreCode extends MsgBase {
    static fromJSON(params) {
        return new MsgStoreCode(params);
    }
    toProto() {
        const { params } = this;
        const message = CosmwasmWasmV1Tx.MsgStoreCode.create();
        message.sender = params.sender;
        message.wasmByteCode =
            typeof params.wasmBytes === "string"
                ? fromUtf8(params.wasmBytes)
                : params.wasmBytes;
        return CosmwasmWasmV1Tx.MsgStoreCode.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmwasm.wasm.v1.MsgStoreCode" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "wasm/MsgStoreCode",
            value: Object.assign({}, message),
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmwasm.wasm.v1.MsgStoreCode" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmwasm.wasm.v1.MsgStoreCode",
            message: proto,
        };
    }
    toBinary() {
        return CosmwasmWasmV1Tx.MsgStoreCode.encode(this.toProto()).finish();
    }
}
