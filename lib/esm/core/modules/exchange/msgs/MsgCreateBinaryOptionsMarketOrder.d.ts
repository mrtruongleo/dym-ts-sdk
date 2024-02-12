import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Tx, InjectiveExchangeV1Beta1Exchange } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCreateBinaryOptionsMarketOrder {
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
    type Proto = InjectiveExchangeV1Beta1Tx.MsgCreateBinaryOptionsMarketOrder;
}
/**
 * @category Messages
 */
export default class MsgCreateBinaryOptionsMarketOrder extends MsgBase<MsgCreateBinaryOptionsMarketOrder.Params, MsgCreateBinaryOptionsMarketOrder.Proto> {
    static fromJSON(params: MsgCreateBinaryOptionsMarketOrder.Params): MsgCreateBinaryOptionsMarketOrder;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgCreateBinaryOptionsMarketOrder;
    toData(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.DerivativeOrder | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: InjectiveExchangeV1Beta1Tx.MsgCreateBinaryOptionsMarketOrder;
    };
    toWeb3(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.DerivativeOrder | undefined;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgCreateBinaryOptionsMarketOrder;
    };
    toBinary(): Uint8Array;
}
