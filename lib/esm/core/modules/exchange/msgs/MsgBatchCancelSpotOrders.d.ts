import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Tx, InjectiveExchangeV1Beta1Exchange } from "@injectivelabs/core-proto-ts";
export declare namespace MsgBatchCancelSpotOrders {
    interface Params {
        injectiveAddress: string;
        orders: {
            marketId: string;
            subaccountId: string;
            orderHash?: string;
            orderMask?: InjectiveExchangeV1Beta1Exchange.OrderMask;
            cid?: string;
        }[];
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgBatchCancelSpotOrders;
}
/**
 * @category Messages
 */
export default class MsgBatchCancelSpotOrders extends MsgBase<MsgBatchCancelSpotOrders.Params, MsgBatchCancelSpotOrders.Proto> {
    static fromJSON(params: MsgBatchCancelSpotOrders.Params): MsgBatchCancelSpotOrders;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgBatchCancelSpotOrders;
    toData(): {
        sender: string;
        data: InjectiveExchangeV1Beta1Tx.OrderData[];
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: InjectiveExchangeV1Beta1Tx.MsgBatchCancelSpotOrders;
    };
    toWeb3(): {
        sender: string;
        data: InjectiveExchangeV1Beta1Tx.OrderData[];
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgBatchCancelSpotOrders;
    };
    toBinary(): Uint8Array;
}
