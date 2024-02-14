"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
/**
 * @category Messages
 */
class MsgEditValidator extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgEditValidator(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.CosmosStakingV1Beta1Tx.MsgEditValidator.create();
        if (params.commissionRate) {
            message.commissionRate = params.commissionRate;
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
        return core_proto_ts_1.CosmosStakingV1Beta1Tx.MsgEditValidator.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.staking.v1beta1.MsgEditValidator" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "cosmos-sdk/MsgEditValidator",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmos.staking.v1beta1.MsgEditValidator" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.staking.v1beta1.MsgEditValidator",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.CosmosStakingV1Beta1Tx.MsgEditValidator.encode(this.toProto()).finish();
    }
}
exports.default = MsgEditValidator;
