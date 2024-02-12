import snakecaseKeys from "snakecase-keys";
import { GoogleProtobufAny, CosmosGovV1Beta1Tx, CosmosBaseV1Beta1Coin, InjectiveExchangeV1Beta1Proposal, } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
import { amountToCosmosSdkDecAmount } from "../../../../utils/numbers";
const createSpotMarketParamUpdate = (params) => {
    const content = InjectiveExchangeV1Beta1Proposal.SpotMarketParamUpdateProposal.create();
    content.title = params.market.title;
    content.description = params.market.description;
    content.makerFeeRate = params.market.makerFeeRate;
    content.takerFeeRate = params.market.takerFeeRate;
    content.relayerFeeShareRate = params.market.relayerFeeShareRate;
    content.marketId = params.market.marketId;
    content.status = params.market.status;
    content.minPriceTickSize = params.market.minPriceTickSize;
    content.minQuantityTickSize = params.market.minQuantityTickSize;
    return InjectiveExchangeV1Beta1Proposal.SpotMarketParamUpdateProposal.fromPartial(content);
};
/**
 * @category Messages
 */
export default class MsgSubmitProposalSpotMarketParamUpdate extends MsgBase {
    static fromJSON(params) {
        return new MsgSubmitProposalSpotMarketParamUpdate(params);
    }
    toProto() {
        const { params } = this;
        const depositParams = CosmosBaseV1Beta1Coin.Coin.create();
        depositParams.denom = params.deposit.denom;
        depositParams.amount = params.deposit.amount;
        const content = createSpotMarketParamUpdate({
            ...params,
            market: {
                ...params.market,
                relayerFeeShareRate: amountToCosmosSdkDecAmount(params.market.relayerFeeShareRate).toFixed(),
                makerFeeRate: amountToCosmosSdkDecAmount(params.market.makerFeeRate).toFixed(),
                takerFeeRate: amountToCosmosSdkDecAmount(params.market.takerFeeRate).toFixed(),
                minQuantityTickSize: amountToCosmosSdkDecAmount(params.market.minQuantityTickSize).toFixed(),
            },
        });
        const contentAny = GoogleProtobufAny.Any.create();
        contentAny.value =
            InjectiveExchangeV1Beta1Proposal.SpotMarketParamUpdateProposal.encode(content).finish();
        contentAny.typeUrl =
            "/injective.exchange.v1beta1.SpotMarketParamUpdateProposal";
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
        const messageWithProposalType = snakecaseKeys({
            proposer: params.proposer,
            initialDeposit: [
                {
                    denom: params.deposit.denom,
                    amount: params.deposit.amount,
                },
            ],
            content: {
                type_url: "exchange/SpotMarketParamUpdateProposal",
                value: this.getContent(),
            },
        });
        return {
            type: "cosmos-sdk/MsgSubmitProposal",
            value: 
            //messageWithProposalType as unknown as SnakeCaseKeys<MsgSubmitProposalSpotMarketParamUpdate.Object>,
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
                "@type": "/injective.exchange.v1beta1.SpotMarketParamUpdateProposal",
                ...this.getContent(),
            },
        };
        return {
            "@type": "/cosmos.gov.v1beta1.MsgSubmitProposal",
            ...messageWithProposalType,
            //...(messageWithProposalType as unknown as SnakeCaseKeys<MsgSubmitProposalSpotMarketParamUpdate.Object>),
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
        return createSpotMarketParamUpdate(params);
    }
}
