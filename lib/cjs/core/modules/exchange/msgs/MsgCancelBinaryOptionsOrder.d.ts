import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Tx, InjectiveExchangeV1Beta1Exchange } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCancelBinaryOptionsOrder {
    interface Params {
        marketId: string;
        subaccountId: string;
        injectiveAddress: string;
        orderHash?: string;
        orderMask?: InjectiveExchangeV1Beta1Exchange.OrderMask;
        cid?: string;
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgCancelBinaryOptionsOrder;
}
/**
 * @category Messages
 */
export default class MsgCancelBinaryOptionsOrder extends MsgBase<MsgCancelBinaryOptionsOrder.Params, MsgCancelBinaryOptionsOrder.Proto> {
    static fromJSON(params: MsgCancelBinaryOptionsOrder.Params): MsgCancelBinaryOptionsOrder;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgCancelBinaryOptionsOrder;
    toData(): {
        sender: string;
        marketId: string;
        subaccountId: string;
        orderHash: string;
        orderMask: number;
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
        message: InjectiveExchangeV1Beta1Tx.MsgCancelBinaryOptionsOrder;
    };
    toBinary(): Uint8Array;
}
