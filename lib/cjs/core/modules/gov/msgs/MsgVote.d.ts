import { CosmosGovV1Tx, CosmosGovV1Gov } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgVote {
    interface Params {
        proposalId: number;
        metadata: string;
        vote: CosmosGovV1Gov.VoteOption;
        voter: string;
    }
    type Proto = CosmosGovV1Tx.MsgVote;
}
/**
 * @category Messages
 */
export default class MsgVote extends MsgBase<MsgVote.Params, MsgVote.Proto> {
    static fromJSON(params: MsgVote.Params): MsgVote;
    toProto(): CosmosGovV1Tx.MsgVote;
    toData(): {
        proposalId: string;
        voter: string;
        option: CosmosGovV1Gov.VoteOption;
        metadata: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: CosmosGovV1Tx.MsgVote;
    };
    toBinary(): Uint8Array;
}
