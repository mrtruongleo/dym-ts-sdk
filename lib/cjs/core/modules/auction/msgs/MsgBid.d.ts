import { MsgBase } from "../../MsgBase";
import { CosmosBaseV1Beta1Coin, InjectiveAuctionV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgBid {
    interface Params {
        round: number;
        injectiveAddress: string;
        amount: {
            amount: string;
            denom: string;
        };
    }
    type Proto = InjectiveAuctionV1Beta1Tx.MsgBid;
}
/**
 * @category Messages
 */
export default class MsgBid extends MsgBase<MsgBid.Params, MsgBid.Proto> {
    static fromJSON(params: MsgBid.Params): MsgBid;
    toProto(): InjectiveAuctionV1Beta1Tx.MsgBid;
    toData(): {
        sender: string;
        bidAmount: CosmosBaseV1Beta1Coin.Coin | undefined;
        round: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveAuctionV1Beta1Tx.MsgBid;
    };
    toWeb3(): any;
    toBinary(): Uint8Array;
}
