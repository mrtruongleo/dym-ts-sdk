import { GoogleProtobufAny, CosmosGovV1Beta1Tx, CosmosBaseV1Beta1Coin, InjectiveExchangeV1Beta1Exchange } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgSubmitProposalSpotMarketParamUpdate {
    interface Params {
        market: {
            title: string;
            description: string;
            marketId: string;
            makerFeeRate: string;
            takerFeeRate: string;
            relayerFeeShareRate: string;
            minPriceTickSize: string;
            minQuantityTickSize: string;
            status: InjectiveExchangeV1Beta1Exchange.MarketStatus;
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
export default class MsgSubmitProposalSpotMarketParamUpdate extends MsgBase<MsgSubmitProposalSpotMarketParamUpdate.Params, MsgSubmitProposalSpotMarketParamUpdate.Proto, MsgSubmitProposalSpotMarketParamUpdate.Object> {
    static fromJSON(params: MsgSubmitProposalSpotMarketParamUpdate.Params): MsgSubmitProposalSpotMarketParamUpdate;
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
