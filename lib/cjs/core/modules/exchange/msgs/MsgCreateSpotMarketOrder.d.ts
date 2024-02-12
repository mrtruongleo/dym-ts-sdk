import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Exchange, InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCreateSpotMarketOrder {
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
    type Proto = InjectiveExchangeV1Beta1Tx.MsgCreateSpotMarketOrder;
}
/**
 * @category Messages
 */
export default class MsgCreateSpotMarketOrder extends MsgBase<MsgCreateSpotMarketOrder.Params, MsgCreateSpotMarketOrder.Proto> {
    static fromJSON(params: MsgCreateSpotMarketOrder.Params): MsgCreateSpotMarketOrder;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgCreateSpotMarketOrder;
    toData(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.SpotOrder | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: InjectiveExchangeV1Beta1Tx.MsgCreateSpotMarketOrder;
    };
    toWeb3(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.SpotOrder | undefined;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgCreateSpotMarketOrder;
    };
    toBinary(): Uint8Array;
}
