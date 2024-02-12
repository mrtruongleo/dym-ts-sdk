import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCancelSpotOrder {
    interface Params {
        marketId: string;
        subaccountId: string;
        injectiveAddress: string;
        orderHash?: string;
        cid?: string;
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgCancelSpotOrder;
}
/**
 * @category Messages
 */
export default class MsgCancelSpotOrder extends MsgBase<MsgCancelSpotOrder.Params, MsgCancelSpotOrder.Proto> {
    static fromJSON(params: MsgCancelSpotOrder.Params): MsgCancelSpotOrder;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgCancelSpotOrder;
    toData(): {
        sender: string;
        marketId: string;
        subaccountId: string;
        orderHash: string;
        cid: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgCancelSpotOrder;
    };
    toBinary(): Uint8Array;
}
