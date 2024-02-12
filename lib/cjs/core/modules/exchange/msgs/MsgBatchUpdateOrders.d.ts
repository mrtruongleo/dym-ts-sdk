import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Tx, InjectiveExchangeV1Beta1Exchange } from "@injectivelabs/core-proto-ts";
export declare namespace MsgBatchUpdateOrders {
    interface Params {
        subaccountId: string;
        spotMarketIdsToCancelAll?: string[];
        derivativeMarketIdsToCancelAll?: string[];
        binaryOptionsMarketIdsToCancelAll?: string[];
        spotOrdersToCancel?: {
            marketId: string;
            subaccountId: string;
            orderHash?: string;
            cid?: string;
        }[];
        derivativeOrdersToCancel?: {
            marketId: string;
            subaccountId: string;
            orderHash?: string;
            cid?: string;
        }[];
        binaryOptionsOrdersToCancel?: {
            marketId: string;
            subaccountId: string;
            orderHash?: string;
            cid?: string;
        }[];
        spotOrdersToCreate?: {
            orderType: InjectiveExchangeV1Beta1Exchange.OrderType;
            triggerPrice?: string;
            marketId: string;
            feeRecipient: string;
            price: string;
            quantity: string;
            cid?: string;
        }[];
        derivativeOrdersToCreate?: {
            orderType: InjectiveExchangeV1Beta1Exchange.OrderType;
            triggerPrice?: string;
            feeRecipient: string;
            marketId: string;
            price: string;
            margin: string;
            quantity: string;
            cid?: string;
        }[];
        binaryOptionsOrdersToCreate?: {
            orderType: InjectiveExchangeV1Beta1Exchange.OrderType;
            triggerPrice?: string;
            feeRecipient: string;
            marketId: string;
            price: string;
            margin: string;
            quantity: string;
            cid?: string;
        }[];
        injectiveAddress: string;
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgBatchUpdateOrders;
}
/**
 * @category Messages
 */
export default class MsgBatchUpdateOrders extends MsgBase<MsgBatchUpdateOrders.Params, MsgBatchUpdateOrders.Proto> {
    static fromJSON(params: MsgBatchUpdateOrders.Params): MsgBatchUpdateOrders;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgBatchUpdateOrders;
    toData(): {
        sender: string;
        subaccountId: string;
        spotMarketIdsToCancelAll: string[];
        derivativeMarketIdsToCancelAll: string[];
        spotOrdersToCancel: InjectiveExchangeV1Beta1Tx.OrderData[];
        derivativeOrdersToCancel: InjectiveExchangeV1Beta1Tx.OrderData[];
        spotOrdersToCreate: InjectiveExchangeV1Beta1Exchange.SpotOrder[];
        derivativeOrdersToCreate: InjectiveExchangeV1Beta1Exchange.DerivativeOrder[];
        binaryOptionsOrdersToCancel: InjectiveExchangeV1Beta1Tx.OrderData[];
        binaryOptionsMarketIdsToCancelAll: string[];
        binaryOptionsOrdersToCreate: InjectiveExchangeV1Beta1Exchange.DerivativeOrder[];
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: InjectiveExchangeV1Beta1Tx.MsgBatchUpdateOrders;
    };
    toWeb3(): {
        sender: string;
        subaccountId: string;
        spotMarketIdsToCancelAll: string[];
        derivativeMarketIdsToCancelAll: string[];
        spotOrdersToCancel: InjectiveExchangeV1Beta1Tx.OrderData[];
        derivativeOrdersToCancel: InjectiveExchangeV1Beta1Tx.OrderData[];
        spotOrdersToCreate: InjectiveExchangeV1Beta1Exchange.SpotOrder[];
        derivativeOrdersToCreate: InjectiveExchangeV1Beta1Exchange.DerivativeOrder[];
        binaryOptionsOrdersToCancel: InjectiveExchangeV1Beta1Tx.OrderData[];
        binaryOptionsMarketIdsToCancelAll: string[];
        binaryOptionsOrdersToCreate: InjectiveExchangeV1Beta1Exchange.DerivativeOrder[];
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgBatchUpdateOrders;
    };
    toBinary(): Uint8Array;
}
