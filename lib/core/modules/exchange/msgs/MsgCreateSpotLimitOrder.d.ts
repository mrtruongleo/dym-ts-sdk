import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Exchange, InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCreateSpotLimitOrder {
    interface Params {
        marketId: string;
        subaccountId: string;
        injectiveAddress: string;
        orderType: InjectiveExchangeV1Beta1Exchange.OrderType;
        triggerPrice?: string;
        feeRecipient: string;
        price: string;
        quantity: string;
        cid?: string;
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgCreateSpotLimitOrder;
}
/**
 * @category Messages
 */
export default class MsgCreateSpotLimitOrder extends MsgBase<MsgCreateSpotLimitOrder.Params, MsgCreateSpotLimitOrder.Proto> {
    static fromJSON(params: MsgCreateSpotLimitOrder.Params): MsgCreateSpotLimitOrder;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgCreateSpotLimitOrder;
    toData(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.SpotOrder | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: InjectiveExchangeV1Beta1Tx.MsgCreateSpotLimitOrder;
    };
    toWeb3(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.SpotOrder | undefined;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgCreateSpotLimitOrder;
    };
    toBinary(): Uint8Array;
}
