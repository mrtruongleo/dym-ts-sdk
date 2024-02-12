import { MsgBase } from "../../MsgBase";
import { CosmosBaseV1Beta1Coin, CosmosStakingV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgBeginRedelegate {
    interface Params {
        amount: {
            denom: string;
            amount: string;
        };
        srcValidatorAddress: string;
        dstValidatorAddress: string;
        injectiveAddress: string;
    }
    type Proto = CosmosStakingV1Beta1Tx.MsgBeginRedelegate;
}
/**
 * @category Messages
 */
export default class MsgBeginRedelegate extends MsgBase<MsgBeginRedelegate.Params, MsgBeginRedelegate.Proto> {
    static fromJSON(params: MsgBeginRedelegate.Params): MsgBeginRedelegate;
    toProto(): MsgBeginRedelegate.Proto;
    toData(): {
        delegatorAddress: string;
        validatorSrcAddress: string;
        validatorDstAddress: string;
        amount: CosmosBaseV1Beta1Coin.Coin | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: CosmosStakingV1Beta1Tx.MsgBeginRedelegate;
    };
    toBinary(): Uint8Array;
}
