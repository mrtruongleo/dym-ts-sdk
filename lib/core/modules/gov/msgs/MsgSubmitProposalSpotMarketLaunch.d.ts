import { GoogleProtobufAny, CosmosGovV1Beta1Tx, CosmosBaseV1Beta1Coin } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgSubmitProposalSpotMarketLaunch {
    interface Params {
        market: {
            title: string;
            description: string;
            ticker: string;
            baseDenom: string;
            quoteDenom: string;
            minPriceTickSize: string;
            minQuantityTickSize: string;
            makerFeeRate: string;
            takerFeeRate: string;
        };
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
export default class MsgSubmitProposalSpotMarketLaunch extends MsgBase<MsgSubmitProposalSpotMarketLaunch.Params, MsgSubmitProposalSpotMarketLaunch.Proto, MsgSubmitProposalSpotMarketLaunch.Object> {
    static fromJSON(params: MsgSubmitProposalSpotMarketLaunch.Params): MsgSubmitProposalSpotMarketLaunch;
    toProto(): MsgSubmitProposalSpotMarketLaunch.Proto;
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
