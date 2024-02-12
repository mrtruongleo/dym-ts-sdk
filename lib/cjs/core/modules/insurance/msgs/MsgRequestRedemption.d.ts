import { MsgBase } from "../../MsgBase";
import { CosmosBaseV1Beta1Coin, InjectiveInsuranceV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgRequestRedemption {
    interface Params {
        marketId: string;
        amount: {
            denom: string;
            amount: string;
        };
        injectiveAddress: string;
    }
    type Proto = InjectiveInsuranceV1Beta1Tx.MsgRequestRedemption;
}
/**
 * @category Messages
 */
export default class MsgRequestRedemption extends MsgBase<MsgRequestRedemption.Params, MsgRequestRedemption.Proto> {
    static fromJSON(params: MsgRequestRedemption.Params): MsgRequestRedemption;
    toProto(): InjectiveInsuranceV1Beta1Tx.MsgRequestRedemption;
    toData(): {
        sender: string;
        marketId: string;
        amount: CosmosBaseV1Beta1Coin.Coin | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveInsuranceV1Beta1Tx.MsgRequestRedemption;
    };
    toBinary(): Uint8Array;
}
