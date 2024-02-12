import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Tx, InjectiveExchangeV1Beta1Exchange } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCreateDerivativeLimitOrder {
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
    type Proto = InjectiveExchangeV1Beta1Tx.MsgCreateDerivativeLimitOrder;
}
/**
 * @category Messages
 */
export default class MsgCreateDerivativeLimitOrder extends MsgBase<MsgCreateDerivativeLimitOrder.Params, MsgCreateDerivativeLimitOrder.Proto> {
    static fromJSON(params: MsgCreateDerivativeLimitOrder.Params): MsgCreateDerivativeLimitOrder;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgCreateDerivativeLimitOrder;
    toData(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.DerivativeOrder | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: InjectiveExchangeV1Beta1Tx.MsgCreateDerivativeLimitOrder;
    };
    toWeb3(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.DerivativeOrder | undefined;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgCreateDerivativeLimitOrder;
    };
    toBinary(): Uint8Array;
}
