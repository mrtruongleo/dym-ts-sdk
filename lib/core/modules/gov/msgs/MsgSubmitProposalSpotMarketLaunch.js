import snakecaseKeys from "snakecase-keys";
import { GoogleProtobufAny, CosmosGovV1Beta1Tx, CosmosBaseV1Beta1Coin, InjectiveExchangeV1Beta1Proposal, } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
import { amountToCosmosSdkDecAmount } from "../../../../utils/numbers";
const createSpotMarketLaunchContent = (params) => {
    const content = InjectiveExchangeV1Beta1Proposal.SpotMarketLaunchProposal.create();
    content.title = params.market.title;
    content.description = params.market.description;
    content.quoteDenom = params.market.quoteDenom;
    content.ticker = params.market.ticker;
    content.baseDenom = params.market.baseDenom;
    content.minPriceTickSize = params.market.minPriceTickSize;
    content.minQuantityTickSize = params.market.minQuantityTickSize;
    content.makerFeeRate = params.market.makerFeeRate;
    content.takerFeeRate = params.market.makerFeeRate;
    return InjectiveExchangeV1Beta1Proposal.SpotMarketLaunchProposal.fromPartial(content);
};
/**
 * @category Messages
 */
export default class MsgSubmitProposalSpotMarketLaunch extends MsgBase {
    static fromJSON(params) {
        return new MsgSubmitProposalSpotMarketLaunch(params);
    }
    toProto() {
        const { params } = this;
        const depositParams = CosmosBaseV1Beta1Coin.Coin.create();
        depositParams.denom = params.deposit.denom;
        depositParams.amount = params.deposit.amount;
        const content = createSpotMarketLaunchContent({
            ...params,
            market: {
                ...params.market,
                minPriceTickSize: amountToCosmosSdkDecAmount(params.market.minPriceTickSize).toFixed(),
                minQuantityTickSize: amountToCosmosSdkDecAmount(params.market.minQuantityTickSize).toFixed(),
                makerFeeRate: amountToCosmosSdkDecAmount(params.market.makerFeeRate).toFixed(),
                takerFeeRate: amountToCosmosSdkDecAmount(params.market.makerFeeRate).toFixed(),
            },
        });
        const proposalType = "/injective.exchange.v1beta1.SpotMarketLaunchProposal";
        const contentAny = GoogleProtobufAny.Any.create();
        contentAny.value =
            InjectiveExchangeV1Beta1Proposal.SpotMarketLaunchProposal.encode(content).finish();
        contentAny.typeUrl = proposalType;
        const message = CosmosGovV1Beta1Tx.MsgSubmitProposal.create();
        message.content = contentAny;
        message.proposer = params.proposer;
        message.initialDeposit = [depositParams];
        return CosmosGovV1Beta1Tx.MsgSubmitProposal.fromPartial(message);
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
        const messageWithProposalType = snakecaseKeys({
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
        return CosmosGovV1Beta1Tx.MsgSubmitProposal.encode(this.toProto()).finish();
    }
    getContent() {
        const { params } = this;
        return createSpotMarketLaunchContent(params);
    }
}
