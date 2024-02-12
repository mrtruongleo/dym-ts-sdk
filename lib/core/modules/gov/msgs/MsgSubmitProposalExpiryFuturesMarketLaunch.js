import snakecaseKeys from "snakecase-keys";
import { GoogleProtobufAny, CosmosGovV1Beta1Tx, CosmosBaseV1Beta1Coin, InjectiveExchangeV1Beta1Proposal, } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
import { amountToCosmosSdkDecAmount } from "../../../../utils/numbers";
const createProposalExpiryFuturesMarketLaunch = (params) => {
    const content = InjectiveExchangeV1Beta1Proposal.ExpiryFuturesMarketLaunchProposal.create();
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
    content.expiry = params.market.expiry.toString();
    content.minPriceTickSize = params.market.minPriceTickSize;
    content.minQuantityTickSize = params.market.minQuantityTickSize;
    return InjectiveExchangeV1Beta1Proposal.ExpiryFuturesMarketLaunchProposal.fromPartial(content);
};
/**
 * @category Messages
 */
export default class MsgSubmitProposalExpiryFuturesMarketLaunch extends MsgBase {
    static fromJSON(params) {
        return new MsgSubmitProposalExpiryFuturesMarketLaunch(params);
    }
    toProto() {
        const { params } = this;
        const depositParams = CosmosBaseV1Beta1Coin.Coin.create();
        depositParams.denom = params.deposit.denom;
        depositParams.amount = params.deposit.amount;
        const content = createProposalExpiryFuturesMarketLaunch(Object.assign(Object.assign({}, params), { market: Object.assign(Object.assign({}, params.market), { initialMarginRatio: amountToCosmosSdkDecAmount(params.market.initialMarginRatio).toFixed(), maintenanceMarginRatio: amountToCosmosSdkDecAmount(params.market.maintenanceMarginRatio).toFixed(), makerFeeRate: amountToCosmosSdkDecAmount(params.market.makerFeeRate).toFixed(), takerFeeRate: amountToCosmosSdkDecAmount(params.market.takerFeeRate).toFixed(), minQuantityTickSize: amountToCosmosSdkDecAmount(params.market.minQuantityTickSize).toFixed() }) }));
        const contentAny = GoogleProtobufAny.Any.create();
        contentAny.value =
            InjectiveExchangeV1Beta1Proposal.ExpiryFuturesMarketLaunchProposal.encode(content).finish();
        contentAny.typeUrl =
            "/injective.exchange.v1beta1.ExpiryFuturesMarketLaunchProposal";
        const message = CosmosGovV1Beta1Tx.MsgSubmitProposal.create();
        message.content = contentAny;
        message.proposer = params.proposer;
        message.initialDeposit = [depositParams];
        return CosmosGovV1Beta1Tx.MsgSubmitProposal.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.gov.v1beta1.MsgSubmitProposal" }, proto);
    }
    //ts-ignore
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
                type_url: "exchange/ExpiryFuturesMarketLaunchProposal",
                value: this.getContent(),
            },
        });
        return {
            type: "cosmos-sdk/MsgSubmitProposal",
            value: messageWithProposalType,
            //messageWithProposalType as unknown as SnakeCaseKeys<MsgSubmitProposalExpiryFuturesMarketLaunch.Object>,
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
            content: Object.assign({ "@type": "/injective.exchange.v1beta1.ExpiryFuturesMarketLaunchProposal" }, this.getContent()),
        };
        return Object.assign({ "@type": "/cosmos.gov.v1beta1.MsgSubmitProposal" }, messageWithProposalType);
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
        return createProposalExpiryFuturesMarketLaunch(params);
    }
}
