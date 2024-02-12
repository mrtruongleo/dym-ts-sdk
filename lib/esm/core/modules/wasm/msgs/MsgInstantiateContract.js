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
class MsgInstantiateContract extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgInstantiateContract(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.CosmwasmWasmV1Tx.MsgInstantiateContract.create();
        message.msg = (0, utf8_1.fromUtf8)(JSON.stringify(params.msg));
        message.sender = params.sender;
        message.admin = params.admin;
        message.codeId = params.codeId.toString();
        message.label = params.label;
        if (params.amount) {
            const funds = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
            funds.amount = params.amount.amount;
            funds.denom = params.amount.denom;
            message.funds = [funds];
        }
        return core_proto_ts_1.CosmwasmWasmV1Tx.MsgInstantiateContract.fromPartial(message);
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
            ...(0, snakecase_keys_1.default)(proto),
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
        return core_proto_ts_1.CosmwasmWasmV1Tx.MsgInstantiateContract.encode(this.toProto()).finish();
    }
}
exports.default = MsgInstantiateContract;
//# sourceMappingURL=MsgInstantiateContract.js.map