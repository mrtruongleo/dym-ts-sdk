"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
/**
 * @category Messages
 */
class MsgVote extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgVote(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.CosmosGovV1Tx.MsgVote.create();
        message.option = params.vote;
        message.proposalId = params.proposalId.toString();
        message.metadata = params.metadata;
        message.voter = params.voter;
        message.metadata = params.proposalId.toString();
        return message;
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.gov.v1.MsgVote" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "cosmos-sdk/v1/MsgVote",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmos.gov.v1.MsgVote" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.gov.v1.MsgVote",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.CosmosGovV1Tx.MsgVote.encode(this.toProto()).finish();
    }
}
exports.default = MsgVote;
