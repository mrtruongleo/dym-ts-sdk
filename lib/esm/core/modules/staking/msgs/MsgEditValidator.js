import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmosStakingV1Beta1Tx, CosmosStakingV1Beta1Staking, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgEditValidator extends MsgBase {
    static fromJSON(params) {
        return new MsgEditValidator(params);
    }
    toProto() {
        const { params } = this;
        const message = CosmosStakingV1Beta1Tx.MsgEditValidator.create();
        if (params.commissionRate) {
            message.commissionRate = params.commissionRate;
        }
        if (params.minSelfDelegation) {
            message.minSelfDelegation = params.minSelfDelegation;
        }
        if (params.description) {
            const description = CosmosStakingV1Beta1Staking.Description.create();
            if (params.description.moniker) {
                description.moniker = params.description.moniker;
            }
            if (params.description.identity) {
                description.identity = params.description.identity;
            }
            if (params.description.website) {
                description.website = params.description.website;
            }
            if (params.description.securityContact) {
                description.securityContact = params.description.securityContact;
            }
            if (params.description.details) {
                description.details = params.description.details;
            }
            message.description = description;
        }
        message.validatorAddress = params.validatorAddress;
        return CosmosStakingV1Beta1Tx.MsgEditValidator.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmos.staking.v1beta1.MsgEditValidator",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "cosmos-sdk/MsgEditValidator",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/cosmos.staking.v1beta1.MsgEditValidator",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.staking.v1beta1.MsgEditValidator",
            message: proto,
        };
    }
    toBinary() {
        return CosmosStakingV1Beta1Tx.MsgEditValidator.encode(this.toProto()).finish();
    }
}
