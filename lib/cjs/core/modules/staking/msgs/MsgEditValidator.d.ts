import { MsgBase } from "../../MsgBase";
import { CosmosStakingV1Beta1Tx, CosmosStakingV1Beta1Staking } from "@injectivelabs/core-proto-ts";
export declare namespace MsgEditValidator {
    interface Params {
        description: {
            moniker: string;
            identity: string;
            website: string;
            securityContact?: string;
            details: string;
        };
        validatorAddress: string;
        commissionRate?: string;
        minSelfDelegation?: string;
    }
    type Proto = CosmosStakingV1Beta1Tx.MsgEditValidator;
}
/**
 * @category Messages
 */
export default class MsgEditValidator extends MsgBase<MsgEditValidator.Params, MsgEditValidator.Proto> {
    static fromJSON(params: MsgEditValidator.Params): MsgEditValidator;
    toProto(): CosmosStakingV1Beta1Tx.MsgEditValidator;
    toData(): {
        description: CosmosStakingV1Beta1Staking.Description | undefined;
        validatorAddress: string;
        commissionRate: string;
        minSelfDelegation: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: CosmosStakingV1Beta1Tx.MsgEditValidator;
    };
    toWeb3(): {
        description: CosmosStakingV1Beta1Staking.Description | undefined;
        validatorAddress: string;
        commissionRate: string;
        minSelfDelegation: string;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: CosmosStakingV1Beta1Tx.MsgEditValidator;
    };
    toBinary(): Uint8Array;
}
