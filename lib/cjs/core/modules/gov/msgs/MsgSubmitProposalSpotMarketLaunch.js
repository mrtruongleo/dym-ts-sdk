"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const MsgBase_1 = require("../../MsgBase");
const numbers_1 = require("../../../../utils/numbers");
const createSpotMarketLaunchContent = (params) => {
    const content = core_proto_ts_1.InjectiveExchangeV1Beta1Proposal.SpotMarketLaunchProposal.create();
    content.title = params.market.title;
    content.description = params.market.description;
    content.quoteDenom = params.market.quoteDenom;
    content.ticker = params.market.ticker;
    content.baseDenom = params.market.baseDenom;
    content.minPriceTickSize = params.market.minPriceTickSize;
    content.minQuantityTickSize = params.market.minQuantityTickSize;
    content.makerFeeRate = params.market.makerFeeRate;
    content.takerFeeRate = params.market.makerFeeRate;
    return core_proto_ts_1.InjectiveExchangeV1Beta1Proposal.SpotMarketLaunchProposal.fromPartial(content);
};
/**
 * @category Messages
 */
class MsgSubmitProposalSpotMarketLaunch extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgSubmitProposalSpotMarketLaunch(params);
    }
    toProto() {
        const { params } = this;
        const depositParams = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        depositParams.denom = params.deposit.denom;
        depositParams.amount = params.deposit.amount;
        const content = createSpotMarketLaunchContent({
            ...params,
            market: {
                ...params.market,
                minPriceTickSize: (0, numbers_1.amountToCosmosSdkDecAmount)(params.market.minPriceTickSize).toFixed(),
                minQuantityTickSize: (0, numbers_1.amountToCosmosSdkDecAmount)(params.market.minQuantityTickSize).toFixed(),
                makerFeeRate: (0, numbers_1.amountToCosmosSdkDecAmount)(params.market.makerFeeRate).toFixed(),
                takerFeeRate: (0, numbers_1.amountToCosmosSdkDecAmount)(params.market.makerFeeRate).toFixed(),
            },
        });
        const proposalType = "/injective.exchange.v1beta1.SpotMarketLaunchProposal";
        const contentAny = core_proto_ts_1.GoogleProtobufAny.Any.create();
        contentAny.value =
            core_proto_ts_1.InjectiveExchangeV1Beta1Proposal.SpotMarketLaunchProposal.encode(content).finish();
        contentAny.typeUrl = proposalType;
        const message = core_proto_ts_1.CosmosGovV1Beta1Tx.MsgSubmitProposal.create();
        message.content = contentAny;
        message.proposer = params.proposer;
        message.initialDeposit = [depositParams];
        return core_proto_ts_1.CosmosGovV1Beta1Tx.MsgSubmitProposal.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/cosmos.gov.v1beta1.MsgSubmitProposal",
            ...proto,
        };
    }
    toAmino() {
        const { params } = this;
        const content = this.getContent();
        const message = {
            content,
            proposer: params.proposer,
        };
        const messageWithProposalType = (0, snakecase_keys_1.default)({
            proposer: params.proposer,
            initialDeposit: [
                {
                    denom: params.deposit.denom,
                    amount: params.deposit.amount,
                },
            ],
            content: {
                value: message.content,
                type_url: "exchange/SpotMarketLaunchProposal",
            },
        });
        return {
            type: "cosmos-sdk/MsgSubmitProposal",
            value: 
            //messageWithProposalType as unknown as SnakeCaseKeys<MsgSubmitProposalSpotMarketLaunch.Object>,
            messageWithProposalType,
        };
    }
    toWeb3() {
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
                "@type": "/injective.exchange.v1beta1.SpotMarketLaunchProposal",
                ...this.getContent(),
            },
        };
        return {
            "@type": "/cosmos.gov.v1beta1.MsgSubmitProposal",
            ...messageWithProposalType,
            //...(messageWithProposalType as unknown as SnakeCaseKeys<MsgSubmitProposalSpotMarketLaunch.Object>),
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.CosmosGovV1Beta1Tx.MsgSubmitProposal.encode(this.toProto()).finish();
    }
    getContent() {
        const { params } = this;
        return createSpotMarketLaunchContent(params);
    }
}
exports.default = MsgSubmitProposalSpotMarketLaunch;
//# sourceMappingURL=MsgSubmitProposalSpotMarketLaunch.js.map