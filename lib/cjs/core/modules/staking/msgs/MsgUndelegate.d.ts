import { MsgBase } from "../../MsgBase";
import { CosmosBaseV1Beta1Coin, CosmosStakingV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgUndelegate {
    interface Params {
        amount: {
            denom: string;
            amount: string;
        };
        validatorAddress: string;
        injectiveAddress: string;
    }
    type Proto = CosmosStakingV1Beta1Tx.MsgUndelegate;
}
/**
 * @category Messages
 */
export default class MsgUndelegate extends MsgBase<MsgUndelegate.Params, MsgUndelegate.Proto> {
    static fromJSON(params: MsgUndelegate.Params): MsgUndelegate;
    toProto(): CosmosStakingV1Beta1Tx.MsgUndelegate;
    toData(): {
        delegatorAddress: string;
        validatorAddress: string;
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
        message: CosmosStakingV1Beta1Tx.MsgUndelegate;
    };
    toBinary(): Uint8Array;
}
