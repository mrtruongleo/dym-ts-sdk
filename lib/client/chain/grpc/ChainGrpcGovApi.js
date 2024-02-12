var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { CosmosGovV1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { paginationRequestFromPagination } from '../../../utils/pagination';
import { ChainGrpcGovTransformer } from '../transformers/ChainGrpcGovTransformer';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcGovApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Gov;
        this.client = new CosmosGovV1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const paramTypes = ['voting', 'deposit', 'tallying'];
            const requests = paramTypes.map((type) => {
                const request = CosmosGovV1Query.QueryParamsRequest.create();
                request.paramsType = type;
                return request;
            });
            try {
                const responses = yield Promise.all(requests.map((request) => this.client.Params(request)));
                const [votingParams, depositParams, tallyParams] = responses;
                return ChainGrpcGovTransformer.moduleParamsResponseToModuleParamsByType({
                    votingParams: votingParams.params,
                    tallyParams: tallyParams.params,
                    depositParams: depositParams.params,
                });
            }
            catch (e) {
                if (e instanceof CosmosGovV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Params',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Params',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchProposals({ status, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosGovV1Query.QueryProposalsRequest.create();
            request.proposalStatus = status;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Proposals(request));
                return ChainGrpcGovTransformer.proposalsResponseToProposals(response);
            }
            catch (e) {
                if (e instanceof CosmosGovV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Proposals',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Proposals',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchProposal(proposalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosGovV1Query.QueryProposalRequest.create();
            request.proposalId = proposalId.toString();
            try {
                const response = yield this.retry(() => this.client.Proposal(request));
                return ChainGrpcGovTransformer.proposalResponseToProposal(response);
            }
            catch (e) {
                if (e instanceof CosmosGovV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Proposal',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Proposal',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchProposalDeposits({ proposalId, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosGovV1Query.QueryDepositsRequest.create();
            request.proposalId = proposalId.toString();
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Deposits(request));
                return ChainGrpcGovTransformer.depositsResponseToDeposits(response);
            }
            catch (e) {
                if (e instanceof CosmosGovV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Deposits',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Deposits',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchProposalVotes({ proposalId, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosGovV1Query.QueryVotesRequest.create();
            request.proposalId = proposalId.toString();
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Votes(request));
                return ChainGrpcGovTransformer.votesResponseToVotes(response);
            }
            catch (e) {
                if (e instanceof CosmosGovV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Votes',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Votes',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchProposalTally(proposalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosGovV1Query.QueryTallyResultRequest.create();
            request.proposalId = proposalId.toString();
            try {
                const response = yield this.retry(() => this.client.TallyResult(request));
                return ChainGrpcGovTransformer.tallyResultResponseToTallyResult(response);
            }
            catch (e) {
                if (e instanceof CosmosGovV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'TallyResult',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'TallyResult',
                    contextModule: this.module,
                });
            }
        });
    }
}
