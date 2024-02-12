"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const MsgBase_1 = require("../../MsgBase");
const numbers_1 = require("../../../../utils/numbers");
const createPerpetualMarketLaunch = (params) => {
    const content = core_proto_ts_1.InjectiveExchangeV1Beta1Proposal.PerpetualMarketLaunchProposal.create();
    content.title = params.market.title;
    content.description = params.market.description;
    content.quoteDenom = params.market.quoteDenom;
    content.ticker = params.market.ticker;
    content.initialMarginRatio = params.market.initialMarginRatio;
    content.maintenanceMarginRatio = params.market.maintenanceMarginRatio;
    content.makerFeeRate = params.market.makerFeeRate;
    content.takerFeeRate = params.market.takerFeeRate;
    content.oracleBase = params.market.oracleBase;
    content.oracleQuote = params.market.oracleQuote;
    content.oracleScaleFactor = params.market.oracleScaleFactor;
    content.oracleType = params.market.oracleType;
    content.minPriceTickSize = params.market.minPriceTickSize;
    content.minQuantityTickSize = params.market.minQuantityTickSize;
    return core_proto_ts_1.InjectiveExchangeV1Beta1Proposal.PerpetualMarketLaunchProposal.fromPartial(content);
};
/**
 * @category Messages
 */
class MsgSubmitProposalPerpetualMarketLaunch extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgSubmitProposalPerpetualMarketLaunch(params);
    }
    toProto() {
        const { params } = this;
        const depositParams = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        depositParams.denom = params.deposit.denom;
        depositParams.amount = params.deposit.amount;
        const content = createPerpetualMarketLaunch({
            ...params,
            market: {
                ...params.market,
                initialMarginRatio: (0, numbers_1.amountToCosmosSdkDecAmount)(params.market.initialMarginRatio).toFixed(),
                maintenanceMarginRatio: (0, numbers_1.amountToCosmosSdkDecAmount)(params.market.maintenanceMarginRatio).toFixed(),
                makerFeeRate: (0, numbers_1.amountToCosmosSdkDecAmount)(params.market.makerFeeRate).toFixed(),
                takerFeeRate: (0, numbers_1.amountToCosmosSdkDecAmount)(params.market.takerFeeRate).toFixed(),
                minQuantityTickSize: (0, numbers_1.amountToCosmosSdkDecAmount)(params.market.minQuantityTickSize).toFixed(),
            },
        });
        const contentAny = core_proto_ts_1.GoogleProtobufAny.Any.create();
        contentAny.value =
            core_proto_ts_1.InjectiveExchangeV1Beta1Proposal.PerpetualMarketLaunchProposal.encode(content).finish();
        contentAny.typeUrl =
            '/injective.exchange.v1beta1.PerpetualMarketLaunchProposal';
        const message = core_proto_ts_1.CosmosGovV1Beta1Tx.MsgSubmitProposal.create();
        message.content = contentAny;
        message.proposer = params.proposer;
        message.initialDeposit = [depositParams];
        return core_proto_ts_1.CosmosGovV1Beta1Tx.MsgSubmitProposal.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            '@type': '/cosmos.gov.v1beta1.MsgSubmitProposal',
            ...proto,
        };
    }
    toAmino() {
        const { params } = this;
        const messageWithProposalType = {
            proposer: params.proposer,
            initialDeposit: [
                {
                    denom: params.deposit.denom,
                    amount: params.deposit.amount,
                },
            ],
            content: {
                type_url: 'exchange/PerpetualMarketLaunchProposal',
                value: this.getContent(),
            },
        };
        return {
            type: 'cosmos-sdk/MsgSubmitProposal',
            value: messageWithProposalType,
        };
    }
    toWeb3() {
        const { params } = this;
        const messageWithProposalType = (0, snakecase_keys_1.default)({
            proposer: params.proposer,
            initialDeposit: [
                {
                    denom: params.deposit.denom,
                    amount: params.deposit.amount,
                },
            ],
            content: {
                '@type': '/injective.exchange.v1beta1.PerpetualMarketLaunchProposal',
                ...this.getContent(),
            },
        });
        return {
            '@type': '/cosmos.gov.v1beta1.MsgSubmitProposal',
            ...messageWithProposalType,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: '/cosmos.gov.v1beta1.MsgSubmitProposal',
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.CosmosGovV1Beta1Tx.MsgSubmitProposal.encode(this.toProto()).finish();
    }
    getContent() {
        const { params } = this;
        return createPerpetualMarketLaunch(params);
    }
}
exports.default = MsgSubmitProposalPerpetualMarketLaunch;
//# sourceMappingURL=MsgSubmitProposalPerpetualMarketLaunch.js.map