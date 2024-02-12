import { MsgBase } from "../../MsgBase";
import { CosmosDistributionV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgWithdrawDelegatorReward {
    interface Params {
        delegatorAddress: string;
        validatorAddress: string;
    }
    type Proto = CosmosDistributionV1Beta1Tx.MsgWithdrawDelegatorReward;
}
/**
 * @category Messages
 */
export default class MsgWithdrawDelegatorReward extends MsgBase<MsgWithdrawDelegatorReward.Params, MsgWithdrawDelegatorReward.Proto> {
    static fromJSON(params: MsgWithdrawDelegatorReward.Params): MsgWithdrawDelegatorReward;
    toProto(): CosmosDistributionV1Beta1Tx.MsgWithdrawDelegatorReward;
    toData(): {
        delegatorAddress: string;
        validatorAddress: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: CosmosDistributionV1Beta1Tx.MsgWithdrawDelegatorReward;
    };
    toBinary(): Uint8Array;
}
