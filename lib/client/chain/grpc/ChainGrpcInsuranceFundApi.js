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
import { InjectiveInsuranceV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcInsuranceFundTransformer } from '../transformers/ChainGrpcInsuranceFundTransformer';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcInsuranceFundApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.InsuranceFund;
        this.client = new InjectiveInsuranceV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveInsuranceV1Beta1Query.QueryInsuranceParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.InsuranceParams(request));
                return ChainGrpcInsuranceFundTransformer.moduleParamsResponseToModuleParams(response);
            }
            catch (e) {
                if (e instanceof InjectiveInsuranceV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'InsuranceParams',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'InsuranceParams',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchInsuranceFunds() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveInsuranceV1Beta1Query.QueryInsuranceFundsRequest.create();
            try {
                const response = yield this.retry(() => this.client.InsuranceFunds(request));
                return ChainGrpcInsuranceFundTransformer.insuranceFundsResponseToInsuranceFunds(response);
            }
            catch (e) {
                if (e instanceof InjectiveInsuranceV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'InsuranceFunds',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'InsuranceFunds',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchInsuranceFund(marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveInsuranceV1Beta1Query.QueryInsuranceFundRequest.create();
            request.marketId = marketId;
            try {
                const response = yield this.retry(() => this.client.InsuranceFund(request));
                return ChainGrpcInsuranceFundTransformer.insuranceFundResponseToInsuranceFund(response);
            }
            catch (e) {
                if (e instanceof InjectiveInsuranceV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'InsuranceFund',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'InsuranceFund',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchEstimatedRedemptions({ marketId, address, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveInsuranceV1Beta1Query.QueryEstimatedRedemptionsRequest.create();
            request.marketId = marketId;
            request.address = address;
            try {
                const response = yield this.retry(() => this.client.EstimatedRedemptions(request));
                return ChainGrpcInsuranceFundTransformer.estimatedRedemptionsResponseToEstimatedRedemptions(response);
            }
            catch (e) {
                if (e instanceof InjectiveInsuranceV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'EstimatedRedemptions',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'EstimatedRedemptions',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchPendingRedemptions({ marketId, address, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveInsuranceV1Beta1Query.QueryPendingRedemptionsRequest.create();
            request.marketId = marketId;
            request.address = address;
            try {
                const response = yield this.retry(() => this.client.PendingRedemptions(request));
                return ChainGrpcInsuranceFundTransformer.redemptionsResponseToRedemptions(response);
            }
            catch (e) {
                if (e instanceof InjectiveInsuranceV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'PendingRedemptions',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'PendingRedemptions',
                    contextModule: this.module,
                });
            }
        });
    }
}
