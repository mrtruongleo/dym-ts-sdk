import { GoogleProtobufAny, CosmosGovV1Beta1Tx, CosmosBaseV1Beta1Coin } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgSubmitTextProposal {
    interface Params {
        title: string;
        description: string;
        proposer: string;
        deposit: {
            amount: string;
            denom: string;
        };
    }
    type Proto = CosmosGovV1Beta1Tx.MsgSubmitProposal;
    type Object = Omit<CosmosGovV1Beta1Tx.MsgSubmitProposal, "content"> & {
        content: {
            type_url: string;
            value: any;
        };
    };
}
/**
 * @category Messages
 */
export default class MsgSubmitTextProposal extends MsgBase<MsgSubmitTextProposal.Params, MsgSubmitTextProposal.Proto, MsgSubmitTextProposal.Object> {
    static fromJSON(params: MsgSubmitTextProposal.Params): MsgSubmitTextProposal;
    toProto(): CosmosGovV1Beta1Tx.MsgSubmitProposal;
    toData(): {
        content: GoogleProtobufAny.Any | undefined;
        initialDeposit: CosmosBaseV1Beta1Coin.Coin[];
        proposer: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: CosmosGovV1Beta1Tx.MsgSubmitProposal;
    };
    toBinary(): Uint8Array;
    private getContent;
}
