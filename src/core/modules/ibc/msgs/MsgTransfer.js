"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
/**
 * @category Messages
 */
class MsgTransfer extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgTransfer(params);
    }
    toProto() {
        const { params } = this;
        const token = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        token.denom = params.amount.denom;
        token.amount = params.amount.amount;
        const message = core_proto_ts_1.IbcApplicationsTransferV1Tx.MsgTransfer.create();
        message.receiver = params.receiver;
        message.sender = params.sender;
        message.sourceChannel = params.channelId;
        message.sourcePort = params.port;
        message.token = token;
        if (params.height) {
            const timeoutHeight = core_proto_ts_1.IbcCoreClientV1Client.Height.create();
            timeoutHeight.revisionHeight = params.height.revisionHeight.toString();
            timeoutHeight.revisionNumber = params.height.revisionNumber.toString();
            message.timeoutHeight = timeoutHeight;
        }
        if (params.timeout) {
            message.timeoutTimestamp = params.timeout.toString();
        }
        message.memo = params.memo || "";
        return core_proto_ts_1.IbcApplicationsTransferV1Tx.MsgTransfer.fromJSON(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/ibc.applications.transfer.v1.MsgTransfer" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "cosmos-sdk/MsgTransfer",
            value: Object.assign(Object.assign({}, message), { memo: message.memo || "" }),
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/ibc.applications.transfer.v1.MsgTransfer" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/ibc.applications.transfer.v1.MsgTransfer",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.IbcApplicationsTransferV1Tx.MsgTransfer.encode(this.toProto()).finish();
    }
}
exports.default = MsgTransfer;
