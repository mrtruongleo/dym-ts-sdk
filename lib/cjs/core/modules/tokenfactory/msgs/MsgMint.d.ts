import { MsgBase } from "../../MsgBase";
import { InjectiveTokenFactoryV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgMint {
    interface Params {
        sender: string;
        amount: {
            amount: string;
            denom: string;
        };
    }
    type Proto = InjectiveTokenFactoryV1Beta1Tx.MsgMint;
}
/**
 * @category Messages
 */
export default class MsgMint extends MsgBase<MsgMint.Params, MsgMint.Proto> {
    static fromJSON(params: MsgMint.Params): MsgMint;
    toProto(): InjectiveTokenFactoryV1Beta1Tx.MsgMint;
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
        message: InjectiveTokenFactoryV1Beta1Tx.MsgMint;
    };
    toBinary(): Uint8Array;
}
