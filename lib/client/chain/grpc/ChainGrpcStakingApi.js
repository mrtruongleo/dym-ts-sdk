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
import { CosmosStakingV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcStakingTransformer } from '../transformers';
import { paginationRequestFromPagination } from '../../../utils/pagination';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcStakingApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Staking;
        this.client = new CosmosStakingV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Params(request));
                return ChainGrpcStakingTransformer.moduleParamsResponseToModuleParams(response);
            }
            catch (e) {
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
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
    fetchPool() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryPoolRequest.create();
            try {
                const response = yield this.retry(() => this.client.Pool(request));
                return ChainGrpcStakingTransformer.poolResponseToPool(response);
            }
            catch (e) {
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Pool',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Pool',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidators(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryValidatorsRequest.create();
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Validators(request));
                return ChainGrpcStakingTransformer.validatorsResponseToValidators(response);
            }
            catch (e) {
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Validators',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Validators',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidator(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryValidatorRequest.create();
            request.validatorAddr = address;
            try {
                const response = yield this.retry(() => this.client.Validator(request));
                return ChainGrpcStakingTransformer.validatorResponseToValidator(response);
            }
            catch (e) {
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Validator',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Validator',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidatorDelegations({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryValidatorDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorDelegations(request));
                return ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorDelegations',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'ValidatorDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidatorDelegationsNoThrow({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryValidatorDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorDelegations(request));
                return ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { delegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorDelegations',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'ValidatorDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidatorUnbondingDelegations({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryValidatorUnbondingDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorUnbondingDelegations(request));
                return ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(response);
            }
            catch (e) {
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorUnbondingDelegations',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'ValidatorUnbondingDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchValidatorUnbondingDelegationsNoThrow({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryValidatorUnbondingDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorUnbondingDelegations(request));
                return ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { unbondingDelegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorUnbondingDelegations',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'ValidatorUnbondingDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegation({ injectiveAddress, validatorAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryDelegationRequest.create();
            request.delegatorAddr = injectiveAddress;
            request.validatorAddr = validatorAddress;
            try {
                const response = yield this.retry(() => this.client.Delegation(request));
                return ChainGrpcStakingTransformer.delegationResponseToDelegation(response);
            }
            catch (e) {
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Delegation',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Delegation',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegations({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryDelegatorDelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.DelegatorDelegations(request));
                return ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Delegations',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Delegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegationsNoThrow({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryDelegatorDelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.DelegatorDelegations(request));
                return ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { delegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Delegation',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Delegation',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegators({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryValidatorDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorDelegations(request));
                return ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorDelegations',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'ValidatorDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegatorsNoThrow({ validatorAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryValidatorDelegationsRequest.create();
            request.validatorAddr = validatorAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ValidatorDelegations(request));
                return ChainGrpcStakingTransformer.delegationsResponseToDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { delegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ValidatorDelegations',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'ValidatorDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchUnbondingDelegations({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryDelegatorUnbondingDelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.DelegatorUnbondingDelegations(request));
                return ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(response);
            }
            catch (e) {
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegatorUnbondingDelegations',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'DelegatorUnbondingDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchUnbondingDelegationsNoThrow({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryDelegatorUnbondingDelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.DelegatorUnbondingDelegations(request));
                return ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { unbondingDelegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegatorUnbondingDelegations',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'DelegatorUnbondingDelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchReDelegations({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryRedelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Redelegations(request));
                return ChainGrpcStakingTransformer.reDelegationsResponseToReDelegations(response);
            }
            catch (e) {
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Redelegations',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Redelegations',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchReDelegationsNoThrow({ injectiveAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosStakingV1Beta1Query.QueryRedelegationsRequest.create();
            request.delegatorAddr = injectiveAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Redelegations(request));
                return ChainGrpcStakingTransformer.reDelegationsResponseToReDelegations(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return { redelegations: [], pagination: { total: 0, next: '' } };
                }
                if (e instanceof CosmosStakingV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Redelegations',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Redelegations',
                    contextModule: this.module,
                });
            }
        });
    }
}
