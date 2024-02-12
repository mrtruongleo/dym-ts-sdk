import { CosmosGovV1Tx } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
/**
 * @category Messages
 */
export default class MsgVote extends MsgBase {
    static fromJSON(params) {
        return new MsgVote(params);
    }
    toProto() {
        const { params } = this;
        const message = CosmosGovV1Tx.MsgVote.create();
        message.option = params.vote;
        message.proposalId = params.proposalId.toString();
        message.metadata = params.metadata;
        message.voter = params.voter;
        message.metadata = params.proposalId.toString();
        return message;
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmos.gov.v1.MsgVote",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "cosmos-sdk/v1/MsgVote",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/cosmos.gov.v1.MsgVote",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.gov.v1.MsgVote",
            message: proto,
        };
    }
    toBinary() {
        return CosmosGovV1Tx.MsgVote.encode(this.toProto()).finish();
    }
}
