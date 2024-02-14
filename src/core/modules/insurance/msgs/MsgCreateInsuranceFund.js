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
class MsgCreateInsuranceFund extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgCreateInsuranceFund(params);
    }
    toProto() {
        const { params } = this;
        const amountCoin = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        amountCoin.amount = params.deposit.amount;
        amountCoin.denom = params.deposit.denom;
        const message = core_proto_ts_1.InjectiveInsuranceV1Beta1Tx.MsgCreateInsuranceFund.create();
        message.ticker = params.fund.ticker;
        message.quoteDenom = params.fund.quoteDenom;
        message.oracleBase = params.fund.oracleBase;
        message.oracleQuote = params.fund.oracleQuote;
        message.oracleType = params.fund.oracleType;
        message.sender = params.injectiveAddress;
        message.initialDeposit = amountCoin;
        message.expiry = (params.fund.expiry ? params.fund.expiry : -1).toString();
        return core_proto_ts_1.InjectiveInsuranceV1Beta1Tx.MsgCreateInsuranceFund.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.insurance.v1beta1.MsgCreateInsuranceFund" }, proto);
    }
    toAmino() {
        const proto = this.toProto();
        const message = Object.assign({}, (0, snakecase_keys_1.default)(proto));
        return {
            type: "insurance/MsgCreateInsuranceFund",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.insurance.v1beta1.MsgCreateInsuranceFund" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.insurance.v1beta1.MsgCreateInsuranceFund",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveInsuranceV1Beta1Tx.MsgCreateInsuranceFund.encode(this.toProto()).finish();
    }
}
exports.default = MsgCreateInsuranceFund;
