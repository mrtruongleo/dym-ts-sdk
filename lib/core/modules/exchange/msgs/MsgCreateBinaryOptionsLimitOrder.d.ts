import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Tx, InjectiveExchangeV1Beta1Exchange } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCreateBinaryOptionsLimitOrder {
    interface Params {
        marketId: string;
        subaccountId: string;
        injectiveAddress: string;
        orderType: InjectiveExchangeV1Beta1Exchange.OrderType;
        triggerPrice?: string;
        feeRecipient: string;
        price: string;
        margin: string;
        quantity: string;
        cid?: string;
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgCreateBinaryOptionsLimitOrder;
}
/**
 * @category Messages
 */
export default class MsgCreateBinaryOptionsLimitOrder extends MsgBase<MsgCreateBinaryOptionsLimitOrder.Params, MsgCreateBinaryOptionsLimitOrder.Proto> {
    static fromJSON(params: MsgCreateBinaryOptionsLimitOrder.Params): MsgCreateBinaryOptionsLimitOrder;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgCreateBinaryOptionsLimitOrder;
    toData(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.DerivativeOrder | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: InjectiveExchangeV1Beta1Tx.MsgCreateBinaryOptionsLimitOrder;
    };
    toWeb3(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.DerivativeOrder | undefined;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgCreateBinaryOptionsLimitOrder;
    };
    toBinary(): Uint8Array;
}
