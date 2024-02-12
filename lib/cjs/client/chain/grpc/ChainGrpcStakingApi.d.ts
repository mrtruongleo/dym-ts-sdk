import { CosmosStakingV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { PaginationOption } from '../../../types/pagination';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcStakingApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: CosmosStakingV1Beta1Query.QueryClientImpl;
    constructor(endpoint: string);
    fetchModuleParams(): Promise<import("../types").StakingModuleParams>;
    fetchPool(): Promise<import("../types").Pool>;
    fetchValidators(pagination?: PaginationOption): Promise<{
        validators: import("../types").Validator[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchValidator(address: string): Promise<import("../types").Validator>;
    fetchValidatorDelegations({ validatorAddress, pagination, }: {
        validatorAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        delegations: import("../types").Delegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchValidatorDelegationsNoThrow({ validatorAddress, pagination, }: {
        validatorAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        delegations: import("../types").Delegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchValidatorUnbondingDelegations({ validatorAddress, pagination, }: {
        validatorAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        unbondingDelegations: import("../types").UnBondingDelegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchValidatorUnbondingDelegationsNoThrow({ validatorAddress, pagination, }: {
        validatorAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        unbondingDelegations: import("../types").UnBondingDelegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchDelegation({ injectiveAddress, validatorAddress, }: {
        injectiveAddress: string;
        validatorAddress: string;
    }): Promise<import("../types").Delegation>;
    fetchDelegations({ injectiveAddress, pagination, }: {
        injectiveAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        delegations: import("../types").Delegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchDelegationsNoThrow({ injectiveAddress, pagination, }: {
        injectiveAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        delegations: import("../types").Delegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchDelegators({ validatorAddress, pagination, }: {
        validatorAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        delegations: import("../types").Delegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchDelegatorsNoThrow({ validatorAddress, pagination, }: {
        validatorAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        delegations: import("../types").Delegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchUnbondingDelegations({ injectiveAddress, pagination, }: {
        injectiveAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        unbondingDelegations: import("../types").UnBondingDelegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchUnbondingDelegationsNoThrow({ injectiveAddress, pagination, }: {
        injectiveAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        unbondingDelegations: import("../types").UnBondingDelegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchReDelegations({ injectiveAddress, pagination, }: {
        injectiveAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        redelegations: import("../types").ReDelegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
    fetchReDelegationsNoThrow({ injectiveAddress, pagination, }: {
        injectiveAddress: string;
        pagination?: PaginationOption;
    }): Promise<{
        redelegations: import("../types").ReDelegation[];
        pagination: import("../../../types/pagination").Pagination;
    }>;
}
