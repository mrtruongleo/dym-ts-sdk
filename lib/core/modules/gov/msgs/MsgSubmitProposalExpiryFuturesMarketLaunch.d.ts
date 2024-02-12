import { GoogleProtobufAny, CosmosGovV1Beta1Tx, CosmosBaseV1Beta1Coin, InjectiveOracleV1Beta1Oracle } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgSubmitProposalExpiryFuturesMarketLaunch {
    interface Params {
        market: {
            title: string;
            description: string;
            ticker: string;
            quoteDenom: string;
            oracleBase: string;
            oracleQuote: string;
            expiry: number;
            oracleScaleFactor: number;
            oracleType: InjectiveOracleV1Beta1Oracle.OracleType;
            initialMarginRatio: string;
            maintenanceMarginRatio: string;
            makerFeeRate: string;
            takerFeeRate: string;
            minPriceTickSize: string;
            minQuantityTickSize: string;
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
export default class MsgSubmitProposalExpiryFuturesMarketLaunch extends MsgBase<MsgSubmitProposalExpiryFuturesMarketLaunch.Params, MsgSubmitProposalExpiryFuturesMarketLaunch.Proto, MsgSubmitProposalExpiryFuturesMarketLaunch.Object> {
    static fromJSON(params: MsgSubmitProposalExpiryFuturesMarketLaunch.Params): MsgSubmitProposalExpiryFuturesMarketLaunch;
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
