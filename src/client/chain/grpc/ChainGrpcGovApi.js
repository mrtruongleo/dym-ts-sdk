"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcGovApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const pagination_1 = require("../../../utils/pagination");
const ChainGrpcGovTransformer_1 = require("../transformers/ChainGrpcGovTransformer");
/**
 * @category Chain Grpc API
 */
class ChainGrpcGovApi extends BaseGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.ChainModule.Gov;
        this.client = new core_proto_ts_1.CosmosGovV1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const paramTypes = ['voting', 'deposit', 'tallying'];
            const requests = paramTypes.map((type) => {
                const request = core_proto_ts_1.CosmosGovV1Query.QueryParamsRequest.create();
                request.paramsType = type;
                return request;
            });
            try {
                const responses = yield Promise.all(requests.map((request) => this.client.Params(request)));
                const [votingParams, depositParams, tallyParams] = responses;
                return ChainGrpcGovTransformer_1.ChainGrpcGovTransformer.moduleParamsResponseToModuleParamsByType({
                    votingParams: votingParams.params,
                    tallyParams: tallyParams.params,
                    depositParams: depositParams.params,
                });
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosGovV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Params',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Params',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchProposals({ status, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosGovV1Query.QueryProposalsRequest.create();
            request.proposalStatus = status;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Proposals(request));
                return ChainGrpcGovTransformer_1.ChainGrpcGovTransformer.proposalsResponseToProposals(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosGovV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Proposals',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Proposals',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchProposal(proposalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosGovV1Query.QueryProposalRequest.create();
            request.proposalId = proposalId.toString();
            try {
                const response = yield this.retry(() => this.client.Proposal(request));
                return ChainGrpcGovTransformer_1.ChainGrpcGovTransformer.proposalResponseToProposal(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosGovV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Proposal',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Proposal',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchProposalDeposits({ proposalId, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosGovV1Query.QueryDepositsRequest.create();
            request.proposalId = proposalId.toString();
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Deposits(request));
                return ChainGrpcGovTransformer_1.ChainGrpcGovTransformer.depositsResponseToDeposits(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosGovV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Deposits',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Deposits',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchProposalVotes({ proposalId, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosGovV1Query.QueryVotesRequest.create();
            request.proposalId = proposalId.toString();
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Votes(request));
                return ChainGrpcGovTransformer_1.ChainGrpcGovTransformer.votesResponseToVotes(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosGovV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Votes',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Votes',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchProposalTally(proposalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosGovV1Query.QueryTallyResultRequest.create();
            request.proposalId = proposalId.toString();
            try {
                const response = yield this.retry(() => this.client.TallyResult(request));
                return ChainGrpcGovTransformer_1.ChainGrpcGovTransformer.tallyResultResponseToTallyResult(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosGovV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'TallyResult',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'TallyResult',
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.ChainGrpcGovApi = ChainGrpcGovApi;
