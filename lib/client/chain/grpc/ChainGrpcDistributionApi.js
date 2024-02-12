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
import { CosmosDistributionV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcDistributionTransformer } from '../transformers';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcDistributionApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Distribution;
        this.client = new CosmosDistributionV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosDistributionV1Beta1Query.QueryParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Params(request));
                return ChainGrpcDistributionTransformer.moduleParamsResponseToModuleParams(response);
            }
            catch (e) {
                if (e instanceof CosmosDistributionV1Beta1Query.GrpcWebError) {
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
    fetchDelegatorRewardsForValidator({ delegatorAddress, validatorAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosDistributionV1Beta1Query.QueryDelegationRewardsRequest.create();
            request.validatorAddress = validatorAddress;
            request.delegatorAddress = delegatorAddress;
            try {
                const response = yield this.retry(() => this.client.DelegationRewards(request));
                return ChainGrpcDistributionTransformer.delegationRewardResponseToReward(response);
            }
            catch (e) {
                if (e instanceof CosmosDistributionV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegationRewards',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'DelegationRewards',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegatorRewardsForValidatorNoThrow({ delegatorAddress, validatorAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosDistributionV1Beta1Query.QueryDelegationRewardsRequest.create();
            request.validatorAddress = validatorAddress;
            request.delegatorAddress = delegatorAddress;
            try {
                const response = yield this.retry(() => this.client.DelegationRewards(request));
                return ChainGrpcDistributionTransformer.delegationRewardResponseToReward(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return [];
                }
                if (e instanceof CosmosDistributionV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegationRewards',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'DelegationRewards',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegatorRewards(injectiveAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosDistributionV1Beta1Query.QueryDelegationTotalRewardsRequest.create();
            request.delegatorAddress = injectiveAddress;
            try {
                const response = yield this.retry(() => this.client.DelegationTotalRewards(request));
                return ChainGrpcDistributionTransformer.totalDelegationRewardResponseToTotalReward(response);
            }
            catch (e) {
                if (e instanceof CosmosDistributionV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegationTotalRewards',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'DelegationTotalRewards',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDelegatorRewardsNoThrow(injectiveAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosDistributionV1Beta1Query.QueryDelegationTotalRewardsRequest.create();
            request.delegatorAddress = injectiveAddress;
            try {
                const response = yield this.retry(() => this.client.DelegationTotalRewards(request));
                return ChainGrpcDistributionTransformer.totalDelegationRewardResponseToTotalReward(response);
            }
            catch (e) {
                if (e.message.includes('does not exist')) {
                    return [];
                }
                if (e instanceof CosmosDistributionV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DelegationTotalRewards',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'DelegationTotalRewards',
                    contextModule: this.module,
                });
            }
        });
    }
}
