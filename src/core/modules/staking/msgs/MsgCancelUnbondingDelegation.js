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
class MsgCancelUnbondingDelegation extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgCancelUnbondingDelegation(params);
    }
    toProto() {
        const { params } = this;
        const coinAmount = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        coinAmount.denom = params.amount.denom;
        coinAmount.amount = params.amount.amount;
        const message = core_proto_ts_1.CosmosStakingV1Beta1Tx.MsgCancelUnbondingDelegation.create();
        message.amount = coinAmount;
        message.delegatorAddress = params.delegatorAddress;
        message.validatorAddress = params.validatorAddress;
        message.creationHeight = params.creationHeight;
        return core_proto_ts_1.CosmosStakingV1Beta1Tx.MsgCancelUnbondingDelegation.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "cosmos-sdk/MsgCancelUnbondingDelegation",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.CosmosStakingV1Beta1Tx.MsgCancelUnbondingDelegation.encode(this.toProto()).finish();
    }
}
exports.default = MsgCancelUnbondingDelegation;
