"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../../utils/utf8");
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
/**
 * @category Messages
 */
class MsgStoreCode extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgStoreCode(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.CosmwasmWasmV1Tx.MsgStoreCode.create();
        message.sender = params.sender;
        message.wasmByteCode =
            typeof params.wasmBytes === "string"
                ? (0, utf8_1.fromUtf8)(params.wasmBytes)
                : params.wasmBytes;
        return core_proto_ts_1.CosmwasmWasmV1Tx.MsgStoreCode.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmwasm.wasm.v1.MsgStoreCode",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "wasm/MsgStoreCode",
            value: { ...message },
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/cosmwasm.wasm.v1.MsgStoreCode",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmwasm.wasm.v1.MsgStoreCode",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.CosmwasmWasmV1Tx.MsgStoreCode.encode(this.toProto()).finish();
    }
}
exports.default = MsgStoreCode;
//# sourceMappingURL=MsgStoreCode.js.map