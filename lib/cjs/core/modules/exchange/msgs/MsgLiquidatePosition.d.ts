import { InjectiveExchangeV1Beta1Exchange, InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgLiquidatePosition {
    interface Params {
        subaccountId: string;
        injectiveAddress: string;
        marketId: string;
        /** optional order to provide for liquidation */
        order?: {
            marketId: string;
            subaccountId: string;
            orderType: InjectiveExchangeV1Beta1Exchange.OrderType;
            triggerPrice?: string;
            feeRecipient: string;
            price: string;
            margin: string;
            quantity: string;
            cid?: string;
        };
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgLiquidatePosition;
}
/**
 * @category Messages
 */
export default class MsgLiquidatePosition extends MsgBase<MsgLiquidatePosition.Params, MsgLiquidatePosition.Proto> {
    static fromJSON(params: MsgLiquidatePosition.Params): MsgLiquidatePosition;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgLiquidatePosition;
    toData(): {
        sender: string;
        subaccountId: string;
        marketId: string;
        order: InjectiveExchangeV1Beta1Exchange.DerivativeOrder | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgLiquidatePosition;
    };
    toBinary(): Uint8Array;
}
