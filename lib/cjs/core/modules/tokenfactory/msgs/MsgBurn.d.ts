import { MsgBase } from "../../MsgBase";
import { InjectiveTokenFactoryV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgBurn {
    interface Params {
        sender: string;
        amount: {
            amount: string;
            denom: string;
        };
    }
    type Proto = InjectiveTokenFactoryV1Beta1Tx.MsgBurn;
}
/**
 * @category Messages
 */
export default class MsgBurn extends MsgBase<MsgBurn.Params, MsgBurn.Proto> {
    static fromJSON(params: MsgBurn.Params): MsgBurn;
    toProto(): InjectiveTokenFactoryV1Beta1Tx.MsgBurn;
    toData(): {
        sender: string;
        amount: import("@injectivelabs/core-proto-ts/cjs/cosmos/base/v1beta1/coin").Coin | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveTokenFactoryV1Beta1Tx.MsgBurn;
    };
    toBinary(): Uint8Array;
}
