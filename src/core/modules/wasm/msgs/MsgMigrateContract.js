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
class MsgMigrateContract extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgMigrateContract(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.CosmwasmWasmV1Tx.MsgMigrateContract.create();
        message.codeId = params.codeId.toString();
        message.contract = params.contract;
        message.sender = params.sender;
        message.msg = (0, utf8_1.fromUtf8)(JSON.stringify(params.msg));
        return core_proto_ts_1.CosmwasmWasmV1Tx.MsgMigrateContract.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmwasm.wasm.v1.MsgMigrateContract" }, proto);
    }
    toAmino() {
        const { params } = this;
        const proto = this.toProto();
        const message = Object.assign(Object.assign({}, (0, snakecase_keys_1.default)(proto)), { msg: params.msg });
        return {
            type: "wasm/MsgMigrateContract",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmwasm.wasm.v1.MsgMigrateContract" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmwasm.wasm.v1.MsgMigrateContract",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.CosmwasmWasmV1Tx.MsgMigrateContract.encode(this.toProto()).finish();
    }
}
exports.default = MsgMigrateContract;
