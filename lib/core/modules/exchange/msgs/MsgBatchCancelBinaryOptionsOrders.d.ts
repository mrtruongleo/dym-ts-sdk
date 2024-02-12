import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Tx, InjectiveExchangeV1Beta1Exchange } from "@injectivelabs/core-proto-ts";
export declare namespace MsgBatchCancelBinaryOptionsOrders {
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
    type Proto = InjectiveExchangeV1Beta1Tx.MsgBatchCancelBinaryOptionsOrders;
}
/**
 * @category Messages
 */
export default class MsgBatchCancelBinaryOptionsOrders extends MsgBase<MsgBatchCancelBinaryOptionsOrders.Params, MsgBatchCancelBinaryOptionsOrders.Proto> {
    static fromJSON(params: MsgBatchCancelBinaryOptionsOrders.Params): MsgBatchCancelBinaryOptionsOrders;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgBatchCancelBinaryOptionsOrders;
    toData(): {
        sender: string;
        data: InjectiveExchangeV1Beta1Tx.OrderData[];
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: InjectiveExchangeV1Beta1Tx.MsgBatchCancelBinaryOptionsOrders;
    };
    toWeb3(): {
        sender: string;
        data: InjectiveExchangeV1Beta1Tx.OrderData[];
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgBatchCancelBinaryOptionsOrders;
    };
    toBinary(): Uint8Array;
}
