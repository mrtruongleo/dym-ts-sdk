import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Tx, InjectiveExchangeV1Beta1Exchange } from "@injectivelabs/core-proto-ts";
export declare namespace MsgBatchCancelDerivativeOrders {
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
    type Proto = InjectiveExchangeV1Beta1Tx.MsgBatchCancelDerivativeOrders;
}
/**
 * @category Messages
 */
export default class MsgBatchCancelDerivativeOrders extends MsgBase<MsgBatchCancelDerivativeOrders.Params, MsgBatchCancelDerivativeOrders.Proto> {
    static fromJSON(params: MsgBatchCancelDerivativeOrders.Params): MsgBatchCancelDerivativeOrders;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgBatchCancelDerivativeOrders;
    toData(): {
        sender: string;
        data: InjectiveExchangeV1Beta1Tx.OrderData[];
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: InjectiveExchangeV1Beta1Tx.MsgBatchCancelDerivativeOrders;
    };
    toWeb3(): {
        sender: string;
        data: InjectiveExchangeV1Beta1Tx.OrderData[];
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgBatchCancelDerivativeOrders;
    };
    toBinary(): Uint8Array;
}
