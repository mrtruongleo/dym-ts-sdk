"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const tx_1 = require("../../tx");
/**
 * @category Messages
 */
class MsgCreateValidator extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgCreateValidator(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.CosmosStakingV1Beta1Tx.MsgCreateValidator.create();
        message.delegatorAddress = params.delegatorAddress;
        message.validatorAddress = params.validatorAddress;
        if (params.commission) {
            const commissionRate = core_proto_ts_1.CosmosStakingV1Beta1Staking.CommissionRates.create();
            commissionRate.maxChangeRate = commissionRate.maxChangeRate;
            commissionRate.rate = commissionRate.rate;
            commissionRate.maxRate = commissionRate.maxRate;
        }
        if (params.minSelfDelegation) {
            message.minSelfDelegation = params.minSelfDelegation;
        }
        if (params.description) {
            const description = core_proto_ts_1.CosmosStakingV1Beta1Staking.Description.create();
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
        if (params.pubKey) {
            const pubKeyAny = (0, tx_1.createAny)(Buffer.from(params.pubKey.value, "base64"), params.pubKey.type);
            message.pubkey = pubKeyAny;
        }
        if (params.value) {
            const value = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
            value.denom = params.value.denom;
            value.amount = params.value.amount;
            message.value = value;
        }
        return core_proto_ts_1.CosmosStakingV1Beta1Tx.MsgCreateValidator.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmos.staking.v1beta1.MsgCreateValidator",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "cosmos-sdk/MsgCreateValidator",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/cosmos.staking.v1beta1.MsgCreateValidator",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.staking.v1beta1.MsgCreateValidator",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.CosmosStakingV1Beta1Tx.MsgCreateValidator.encode(this.toProto()).finish();
    }
}
exports.default = MsgCreateValidator;
//# sourceMappingURL=MsgCreateValidator.js.map