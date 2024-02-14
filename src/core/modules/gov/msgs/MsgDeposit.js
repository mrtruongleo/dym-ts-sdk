"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const MsgBase_1 = require("../../MsgBase");
/**
 * @category Messages
 */
class MsgDeposit extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgDeposit(params);
    }
    toProto() {
        const { params } = this;
        const deposit = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        deposit.amount = params.amount.amount;
        deposit.denom = params.amount.denom;
        const message = core_proto_ts_1.CosmosGovV1Tx.MsgDeposit.create();
        message.depositor = params.depositor;
        message.proposalId = params.proposalId.toString();
        message.amount = [deposit];
        return core_proto_ts_1.CosmosGovV1Tx.MsgDeposit.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.gov.v1beta1.MsgDeposit" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "cosmos-sdk/MsgDeposit",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmos.gov.v1beta1.MsgDeposit" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.gov.v1beta1.MsgDeposit",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.CosmosGovV1Tx.MsgDeposit.encode(this.toProto()).finish();
    }
}
exports.default = MsgDeposit;
