import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmosBaseV1Beta1Coin, IbcApplicationsTransferV1Tx, IbcCoreClientV1Client, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgTransfer extends MsgBase {
    static fromJSON(params) {
        return new MsgTransfer(params);
    }
    toProto() {
        const { params } = this;
        const token = CosmosBaseV1Beta1Coin.Coin.create();
        token.denom = params.amount.denom;
        token.amount = params.amount.amount;
        const message = IbcApplicationsTransferV1Tx.MsgTransfer.create();
        message.receiver = params.receiver;
        message.sender = params.sender;
        message.sourceChannel = params.channelId;
        message.sourcePort = params.port;
        message.token = token;
        if (params.height) {
            const timeoutHeight = IbcCoreClientV1Client.Height.create();
            timeoutHeight.revisionHeight = params.height.revisionHeight.toString();
            timeoutHeight.revisionNumber = params.height.revisionNumber.toString();
            message.timeoutHeight = timeoutHeight;
        }
        if (params.timeout) {
            message.timeoutTimestamp = params.timeout.toString();
        }
        message.memo = params.memo || "";
        return IbcApplicationsTransferV1Tx.MsgTransfer.fromJSON(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/ibc.applications.transfer.v1.MsgTransfer",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "cosmos-sdk/MsgTransfer",
            value: {
                ...message,
                memo: message.memo || "",
            },
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/ibc.applications.transfer.v1.MsgTransfer",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/ibc.applications.transfer.v1.MsgTransfer",
            message: proto,
        };
    }
    toBinary() {
        return IbcApplicationsTransferV1Tx.MsgTransfer.encode(this.toProto()).finish();
    }
}
