"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const MsgBase_1 = require("../../MsgBase");
/**
 * @category Messages
 */
class MsgSubmitTextProposal extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgSubmitTextProposal(params);
    }
    toProto() {
        const { params } = this;
        const depositParams = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        depositParams.denom = params.deposit.denom;
        depositParams.amount = params.deposit.amount;
        const content = this.getContent();
        const proposalType = "/cosmos.gov.v1beta1.TextProposal";
        const contentAny = core_proto_ts_1.GoogleProtobufAny.Any.create();
        contentAny.value =
            core_proto_ts_1.CosmosGovV1Beta1Gov.TextProposal.encode(content).finish();
        contentAny.typeUrl = proposalType;
        const message = core_proto_ts_1.CosmosGovV1Beta1Tx.MsgSubmitProposal.create();
        message.content = contentAny;
        message.proposer = params.proposer;
        message.initialDeposit = [depositParams];
        return core_proto_ts_1.CosmosGovV1Beta1Tx.MsgSubmitProposal.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/cosmos.gov.v1beta1.MsgSubmitProposal" }, proto);
    }
    toAmino() {
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
                type_url: "cosmos-sdk/TextProposal",
                value: this.getContent(),
            },
        });
        return {
            type: "cosmos-sdk/MsgSubmitProposal",
            value: messageWithProposalType,
            //messageWithProposalType as unknown as SnakeCaseKeys<MsgSubmitTextProposal.Object>,
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
            content: Object.assign({ "@type": "/cosmos.gov.v1beta1.TextProposal" }, this.getContent()),
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
        return core_proto_ts_1.CosmosGovV1Beta1Tx.MsgSubmitProposal.encode(this.toProto()).finish();
    }
    getContent() {
        const { params } = this;
        const content = core_proto_ts_1.CosmosGovV1Beta1Gov.TextProposal.create();
        content.title = params.title;
        content.description = params.description;
        return core_proto_ts_1.CosmosGovV1Beta1Gov.TextProposal.fromPartial(content);
    }
}
exports.default = MsgSubmitTextProposal;
