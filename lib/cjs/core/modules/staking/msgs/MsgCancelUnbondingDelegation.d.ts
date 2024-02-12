import { MsgBase } from "../../MsgBase";
import { CosmosBaseV1Beta1Coin, CosmosStakingV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCancelUnbondingDelegation {
    interface Params {
        amount: {
            denom: string;
            amount: string;
        };
        validatorAddress: string;
        delegatorAddress: string;
        creationHeight: string;
    }
    type Proto = CosmosStakingV1Beta1Tx.MsgCancelUnbondingDelegation;
}
/**
 * @category Messages
 */
export default class MsgCancelUnbondingDelegation extends MsgBase<MsgCancelUnbondingDelegation.Params, MsgCancelUnbondingDelegation.Proto> {
    static fromJSON(params: MsgCancelUnbondingDelegation.Params): MsgCancelUnbondingDelegation;
    toProto(): CosmosStakingV1Beta1Tx.MsgCancelUnbondingDelegation;
    toData(): {
        delegatorAddress: string;
        validatorAddress: string;
        amount: CosmosBaseV1Beta1Coin.Coin | undefined;
        creationHeight: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: CosmosStakingV1Beta1Tx.MsgCancelUnbondingDelegation;
    };
    toBinary(): Uint8Array;
}
