import { MsgBase } from "../../MsgBase";
import { CosmosBaseV1Beta1Coin, InjectivePeggyV1Beta1Msgs } from "@injectivelabs/core-proto-ts";
export declare namespace MsgSendToEth {
    interface Params {
        amount: {
            denom: string;
            amount: string;
        };
        bridgeFee?: {
            denom: string;
            amount: string;
        };
        address: string;
        injectiveAddress: string;
    }
    type Proto = InjectivePeggyV1Beta1Msgs.MsgSendToEth;
}
/**
 * @category Messages
 */
export default class MsgSendToEth extends MsgBase<MsgSendToEth.Params, MsgSendToEth.Proto> {
    static fromJSON(params: MsgSendToEth.Params): MsgSendToEth;
    toProto(): InjectivePeggyV1Beta1Msgs.MsgSendToEth;
    toData(): {
        sender: string;
        ethDest: string;
        amount: CosmosBaseV1Beta1Coin.Coin | undefined;
        bridgeFee: CosmosBaseV1Beta1Coin.Coin | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectivePeggyV1Beta1Msgs.MsgSendToEth;
    };
    toBinary(): Uint8Array;
}
