import { uint8ArrayToString } from '../../../utils';
import { grpcPaginationToPagination } from '../../../utils/pagination';
import { cosmosSdkDecToBigNumber } from '../../../utils';
/**
 * @category Chain Grpc Transformer
 */
export class ChainGrpcGovTransformer {
    static moduleParamsResponseToModuleParams(response) {
        var _a, _b;
        const params = response.params;
        return {
            depositParams: {
                minDepositList: (params === null || params === void 0 ? void 0 : params.minDeposit) || [],
                maxDepositPeriod: parseInt(((_a = params === null || params === void 0 ? void 0 : params.maxDepositPeriod) === null || _a === void 0 ? void 0 : _a.seconds) || '0', 10),
            },
            votingParams: {
                votingPeriod: parseInt(((_b = params === null || params === void 0 ? void 0 : params.votingPeriod) === null || _b === void 0 ? void 0 : _b.seconds) || '0'),
            },
            tallyParams: {
                quorum: uint8ArrayToString((params === null || params === void 0 ? void 0 : params.quorum) || '0'),
                threshold: uint8ArrayToString((params === null || params === void 0 ? void 0 : params.threshold) || '0'),
                vetoThreshold: uint8ArrayToString((params === null || params === void 0 ? void 0 : params.vetoThreshold) || '0'),
            },
        };
    }
    static moduleParamsResponseToModuleParamsByType({ depositParams, votingParams, tallyParams, }) {
        var _a, _b;
        return {
            depositParams: {
                minDepositList: depositParams === null || depositParams === void 0 ? void 0 : depositParams.minDeposit,
                maxDepositPeriod: parseInt(((_a = depositParams === null || depositParams === void 0 ? void 0 : depositParams.maxDepositPeriod) === null || _a === void 0 ? void 0 : _a.seconds) || '0', 10),
            },
            votingParams: {
                votingPeriod: parseInt(((_b = votingParams.votingPeriod) === null || _b === void 0 ? void 0 : _b.seconds) || '0'),
            },
            tallyParams: {
                quorum: uint8ArrayToString(tallyParams.quorum),
                threshold: uint8ArrayToString(tallyParams.threshold),
                vetoThreshold: uint8ArrayToString(tallyParams.vetoThreshold),
            },
        };
    }
    static proposalResponseToProposal(response) {
        const proposal = response.proposal;
        return ChainGrpcGovTransformer.grpcProposalToProposal(proposal);
    }
    static proposalsResponseToProposals(response) {
        const proposals = response.proposals.map((p) => ChainGrpcGovTransformer.grpcProposalToProposal(p));
        const pagination = response.pagination;
        return {
            proposals: proposals,
            pagination: grpcPaginationToPagination(pagination),
        };
    }
    static depositsResponseToDeposits(response) {
        const pagination = response.pagination;
        const deposits = response.deposits.map((deposit) => {
            return {
                depositor: deposit.depositor,
                amounts: deposit.amount.map((coin) => ({
                    denom: coin.denom,
                    amount: cosmosSdkDecToBigNumber(coin.amount).toFixed(),
                })),
            };
        });
        return {
            deposits: deposits,
            pagination: grpcPaginationToPagination(pagination),
        };
    }
    static grpcVoteToVote(vote) {
        return {
            proposalId: parseInt(vote.proposalId, 10),
            voter: vote.voter,
            metadata: vote.metadata,
            options: vote.options,
        };
    }
    static votesResponseToVotes(response) {
        return {
            votes: response.votes.map(ChainGrpcGovTransformer.grpcVoteToVote),
            pagination: grpcPaginationToPagination(response.pagination),
        };
    }
    static tallyResultResponseToTallyResult(response) {
        const result = response.tally;
        return ChainGrpcGovTransformer.grpcTallyResultToTallyResult(result);
    }
    static grpcTallyResultToTallyResult(result) {
        return {
            yesCount: result ? result.yesCount : '0',
            abstainCount: result ? result.abstainCount : '0',
            noCount: result ? result.noCount : '0',
            noWithVetoCount: result ? result.noWithVetoCount : '0',
        };
    }
    static grpcProposalToProposal(proposal) {
        const finalTallyResult = proposal.finalTallyResult;
        const [message] = proposal.messages;
        return {
            proposalId: parseInt(proposal.id, 10),
            title: proposal.title,
            summary: proposal.summary,
            proposer: proposal.proposer,
            content: {
                type: message.typeUrl,
                value: message.value,
            },
            type: message.typeUrl,
            submitTime: proposal.submitTime
                ? Math.floor(proposal.submitTime.getTime() / 1000)
                : 0,
            status: proposal.status,
            finalTallyResult: ChainGrpcGovTransformer.grpcTallyResultToTallyResult(finalTallyResult),
            depositEndTime: proposal.depositEndTime
                ? Math.floor(proposal.depositEndTime.getTime() / 1000)
                : 0,
            totalDeposits: proposal.totalDeposit.map((coin) => ({
                denom: coin.denom,
                amount: cosmosSdkDecToBigNumber(coin.amount).toFixed(),
            })),
            votingStartTime: proposal.votingStartTime
                ? Math.floor(proposal.votingStartTime.getTime() / 1000)
                : 0,
            votingEndTime: proposal.votingEndTime
                ? Math.floor(proposal.votingEndTime.getTime() / 1000)
                : 0,
        };
    }
}
