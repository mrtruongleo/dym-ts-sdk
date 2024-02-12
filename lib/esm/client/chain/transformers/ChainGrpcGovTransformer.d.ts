import { Vote, Proposal, GrpcVote, TallyResult, GrpcProposal, ProposalDeposit, GrpcTallyResult, GovModuleStateParams, GrpcGovernanceTallyParams, GrpcGovernanceVotingParams, GrpcGovernanceDepositParams } from '../types/gov';
import { Pagination } from '../../../types';
import { CosmosGovV1Query } from '@injectivelabs/core-proto-ts';
/**
 * @category Chain Grpc Transformer
 */
export declare class ChainGrpcGovTransformer {
    static moduleParamsResponseToModuleParams(response: CosmosGovV1Query.QueryParamsResponse): GovModuleStateParams;
    static moduleParamsResponseToModuleParamsByType({ depositParams, votingParams, tallyParams, }: {
        depositParams: GrpcGovernanceDepositParams;
        votingParams: GrpcGovernanceVotingParams;
        tallyParams: GrpcGovernanceTallyParams;
    }): GovModuleStateParams;
    static proposalResponseToProposal(response: CosmosGovV1Query.QueryProposalResponse): Proposal;
    static proposalsResponseToProposals(response: CosmosGovV1Query.QueryProposalsResponse): {
        proposals: Proposal[];
        pagination: Pagination;
    };
    static depositsResponseToDeposits(response: CosmosGovV1Query.QueryDepositsResponse): {
        deposits: ProposalDeposit[];
        pagination: Pagination;
    };
    static grpcVoteToVote(vote: GrpcVote): Vote;
    static votesResponseToVotes(response: CosmosGovV1Query.QueryVotesResponse): {
        votes: Vote[];
        pagination: Pagination;
    };
    static tallyResultResponseToTallyResult(response: CosmosGovV1Query.QueryTallyResultResponse): TallyResult;
    static grpcTallyResultToTallyResult(result: GrpcTallyResult | undefined): TallyResult;
    static grpcProposalToProposal(proposal: GrpcProposal): Proposal;
}
