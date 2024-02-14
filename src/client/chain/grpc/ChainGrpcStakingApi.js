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
exports.ChainGrpcStakingApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
const pagination_1 = require("../../../utils/pagination");
/**
 * @category Chain Grpc API
 */
class ChainGrpcStakingApi extends BaseGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.ChainModule.Staking;
        this.client = new core_proto_ts_1.CosmosStakingV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Params(request));
                return transformers_1.ChainGrpcStakingTransformer.moduleParamsResponseToModuleParams(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
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
    fetchPool() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryPoolRequest.create();
            try {
                const response = yield this.retry(() => this.client.Pool(request));
                return transformers_1.ChainGrpcStakingTransformer.poolResponseToPool(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Pool',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Pool',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidators(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryValidatorsRequest.create();
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Validators(request));
                return transformers_1.ChainGrpcStakingTransformer.validatorsResponseToValidators(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Validators',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Validators',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidator(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryValidatorRequest.create();
            request.validatorAddr = address;
            try {
                const response = yield this.retry(() => this.client.Validator(request));
                return transformers_1.ChainGrpcStakingTransformer.validatorResponseToValidator(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Validator',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Validator',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidatorDelegations({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryValidatorDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorDelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorDelegations',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'ValidatorDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidatorDelegationsNoThrow({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryValidatorDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorDelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { delegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorDelegations',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'ValidatorDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidatorUnbondingDelegations({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryValidatorUnbondingDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorUnbondingDelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorUnbondingDelegations',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'ValidatorUnbondingDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidatorUnbondingDelegationsNoThrow({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryValidatorUnbondingDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorUnbondingDelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { unbondingDelegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorUnbondingDelegations',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'ValidatorUnbondingDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegation({ injectiveAddress, validatorAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryDelegationRequest.create();
            request.delegatorAddr = injectiveAddress;
            request.validatorAddr = validatorAddress;
            try {
                const response = yield this.retry(() => this.client.Delegation(request));
                return transformers_1.ChainGrpcStakingTransformer.delegationResponseToDelegation(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Delegation',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Delegation',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegations({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryDelegatorDelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.DelegatorDelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Delegations',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Delegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegationsNoThrow({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryDelegatorDelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.DelegatorDelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { delegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Delegation',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Delegation',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegators({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryValidatorDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorDelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorDelegations',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'ValidatorDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegatorsNoThrow({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryValidatorDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorDelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { delegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorDelegations',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'ValidatorDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchUnbondingDelegations({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryDelegatorUnbondingDelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.DelegatorUnbondingDelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegatorUnbondingDelegations',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'DelegatorUnbondingDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchUnbondingDelegationsNoThrow({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryDelegatorUnbondingDelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.DelegatorUnbondingDelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { unbondingDelegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegatorUnbondingDelegations',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'DelegatorUnbondingDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchReDelegations({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryRedelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Redelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.reDelegationsResponseToReDelegations(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Redelegations',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Redelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchReDelegationsNoThrow({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosStakingV1Beta1Query.QueryRedelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Redelegations(request));
                return transformers_1.ChainGrpcStakingTransformer.reDelegationsResponseToReDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { redelegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof core_proto_ts_1.CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Redelegations',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Redelegations',
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.ChainGrpcStakingApi = ChainGrpcStakingApi;
