import { MsgBase } from "../../MsgBase";
import { CosmosBaseV1Beta1Coin, CosmosStakingV1Beta1Tx, CosmosStakingV1Beta1Staking } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCreateValidator {
    interface Params {
        description: {
            moniker: string;
            identity: string;
            website: string;
            securityContact?: string;
            details: string;
        };
        value: {
            amount: string;
            denom: string;
        };
        pubKey: {
            type: string;
            value: string;
        };
        delegatorAddress: string;
        validatorAddress: string;
        commission: {
            maxChangeRate: string;
            rate: string;
            maxRate: string;
        };
        minSelfDelegation?: string;
    }
    type Proto = CosmosStakingV1Beta1Tx.MsgCreateValidator;
    type Object = Omit<CosmosStakingV1Beta1Tx.MsgCreateValidator, "pubKey"> & {
        pubKey: any;
    };
}
/**
 * @category Messages
 */
export default class MsgCreateValidator extends MsgBase<MsgCreateValidator.Params, MsgCreateValidator.Proto, MsgCreateValidator.Object> {
    static fromJSON(params: MsgCreateValidator.Params): MsgCreateValidator;
    toProto(): CosmosStakingV1Beta1Tx.MsgCreateValidator;
    toData(): {
        description: CosmosStakingV1Beta1Staking.Description | undefined;
        commission: CosmosStakingV1Beta1Staking.CommissionRates | undefined;
        minSelfDelegation: string;
        delegatorAddress: string;
        validatorAddress: string;
        pubkey: import("@injectivelabs/core-proto-ts/cjs/google/protobuf/any").Any | undefined;
        value: CosmosBaseV1Beta1Coin.Coin | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: MsgCreateValidator.Object;
    };
    toWeb3(): {
        value: CosmosBaseV1Beta1Coin.Coin | undefined;
        description: CosmosStakingV1Beta1Staking.Description | undefined;
        commission: CosmosStakingV1Beta1Staking.CommissionRates | undefined;
        minSelfDelegation: string;
        delegatorAddress: string;
        validatorAddress: string;
        pubkey: import("@injectivelabs/core-proto-ts/cjs/google/protobuf/any").Any | undefined;
        pubKey: any;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: CosmosStakingV1Beta1Tx.MsgCreateValidator;
    };
    toBinary(): Uint8Array;
}
