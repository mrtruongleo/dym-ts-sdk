"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const MsgBase_1 = require("../../MsgBase");
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
/**
 * @category Messages
 */
class MsgExecuteContractCompat extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgExecuteContractCompat(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.InjectiveWasmxV1Beta1Tx.MsgExecuteContractCompat.create();
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
        return core_proto_ts_1.InjectiveWasmxV1Beta1Tx.MsgExecuteContractCompat.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.wasmx.v1.MsgExecuteContractCompat" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign(Object.assign({}, (0, snakecase_keys_1.default)(proto)), { msg: JSON.stringify(this.getMsgObject()) });
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
        return core_proto_ts_1.InjectiveWasmxV1Beta1Tx.MsgExecuteContractCompat.encode(this.toProto()).finish();
    }
    getMsgObject() {
        const { params } = this;
        if ((params.exec || params.msg) && params.execArgs) {
            throw new exceptions_1.GeneralException(new Error("Please provide only one exec|msg argument"));
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
        throw new exceptions_1.GeneralException(new Error("Please provide at least one exec argument"));
    }
}
exports.default = MsgExecuteContractCompat;
