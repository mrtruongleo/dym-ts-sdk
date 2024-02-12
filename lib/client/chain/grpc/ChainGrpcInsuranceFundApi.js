import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveInsuranceV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcInsuranceFundTransformer } from '../transformers/ChainGrpcInsuranceFundTransformer';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcInsuranceFundApi extends BaseGrpcConsumer {
    module = ChainModule.InsuranceFund;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveInsuranceV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = InjectiveInsuranceV1Beta1Query.QueryInsuranceParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.InsuranceParams(request));
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
    }
    async fetchInsuranceFunds() {
        const request = InjectiveInsuranceV1Beta1Query.QueryInsuranceFundsRequest.create();
        try {
            const response = await this.retry(() => this.client.InsuranceFunds(request));
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
    }
    async fetchInsuranceFund(marketId) {
        const request = InjectiveInsuranceV1Beta1Query.QueryInsuranceFundRequest.create();
        request.marketId = marketId;
        try {
            const response = await this.retry(() => this.client.InsuranceFund(request));
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
    }
    async fetchEstimatedRedemptions({ marketId, address, }) {
        const request = InjectiveInsuranceV1Beta1Query.QueryEstimatedRedemptionsRequest.create();
        request.marketId = marketId;
        request.address = address;
        try {
            const response = await this.retry(() => this.client.EstimatedRedemptions(request));
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
    }
    async fetchPendingRedemptions({ marketId, address, }) {
        const request = InjectiveInsuranceV1Beta1Query.QueryPendingRedemptionsRequest.create();
        request.marketId = marketId;
        request.address = address;
        try {
            const response = await this.retry(() => this.client.PendingRedemptions(request));
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
    }
}
