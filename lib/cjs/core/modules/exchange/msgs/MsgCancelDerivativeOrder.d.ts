import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Exchange, InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCancelDerivativeOrder {
    interface Params {
        marketId: string;
        subaccountId: string;
        injectiveAddress: string;
        orderHash?: string;
        orderMask?: InjectiveExchangeV1Beta1Exchange.OrderMask;
        cid?: string;
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgCancelDerivativeOrder;
}
export default class MsgCancelDerivativeOrder extends MsgBase<MsgCancelDerivativeOrder.Params, MsgCancelDerivativeOrder.Proto> {
    static fromJSON(params: MsgCancelDerivativeOrder.Params): MsgCancelDerivativeOrder;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgCancelDerivativeOrder;
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
        message: InjectiveExchangeV1Beta1Tx.MsgCancelDerivativeOrder;
    };
    toBinary(): Uint8Array;
}
