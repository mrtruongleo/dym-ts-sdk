import { CosmosGovV1Gov, CosmosGovV1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { PaginationOption } from '../../../types/pagination';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcGovApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: CosmosGovV1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchModuleParams(): Promise<import("../types").GovModuleStateParams>;
    fetchProposals({ status, pagination, }: {
        status: CosmosGovV1Gov.ProposalStatus;
        pagination?: PaginationOption;
    }): Promise<{
        proposals: import("../types").Proposal[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchProposal(proposalId: number): Promise<import("../types").Proposal>;
    fetchProposalDeposits({ proposalId, pagination, }: {
        proposalId: number;
        pagination?: PaginationOption;
    }): Promise<{
        deposits: import("../types").ProposalDeposit[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchProposalVotes({ proposalId, pagination, }: {
        proposalId: number;
        pagination?: PaginationOption;
    }): Promise<{
        votes: import("../types").Vote[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchProposalTally(proposalId: number): Promise<import("../types").TallyResult>;
}
