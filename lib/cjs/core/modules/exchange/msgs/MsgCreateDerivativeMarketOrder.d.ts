import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Tx, InjectiveExchangeV1Beta1Exchange } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCreateDerivativeMarketOrder {
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
    type Proto = InjectiveExchangeV1Beta1Tx.MsgCreateDerivativeMarketOrder;
}
/**
 * @category Messages
 */
export default class MsgCreateDerivativeMarketOrder extends MsgBase<MsgCreateDerivativeMarketOrder.Params, MsgCreateDerivativeMarketOrder.Proto> {
    static fromJSON(params: MsgCreateDerivativeMarketOrder.Params): MsgCreateDerivativeMarketOrder;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgCreateDerivativeMarketOrder;
    toData(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.DerivativeOrder | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: InjectiveExchangeV1Beta1Tx.MsgCreateDerivativeMarketOrder;
    };
    toWeb3(): {
        sender: string;
        order: InjectiveExchangeV1Beta1Exchange.DerivativeOrder | undefined;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgCreateDerivativeMarketOrder;
    };
    toBinary(): Uint8Array;
}
