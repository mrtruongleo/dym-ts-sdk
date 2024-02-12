"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcInsuranceFundApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const ChainGrpcInsuranceFundTransformer_1 = require("../transformers/ChainGrpcInsuranceFundTransformer");
/**
 * @category Chain Grpc API
 */
class ChainGrpcInsuranceFundApi extends BaseGrpcConsumer_1.default {
    module = types_1.ChainModule.InsuranceFund;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new core_proto_ts_1.InjectiveInsuranceV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = core_proto_ts_1.InjectiveInsuranceV1Beta1Query.QueryInsuranceParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.InsuranceParams(request));
            return ChainGrpcInsuranceFundTransformer_1.ChainGrpcInsuranceFundTransformer.moduleParamsResponseToModuleParams(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.InjectiveInsuranceV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'InsuranceParams',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'InsuranceParams',
                contextModule: this.module,
            });
        }
    }
    async fetchInsuranceFunds() {
        const request = core_proto_ts_1.InjectiveInsuranceV1Beta1Query.QueryInsuranceFundsRequest.create();
        try {
            const response = await this.retry(() => this.client.InsuranceFunds(request));
            return ChainGrpcInsuranceFundTransformer_1.ChainGrpcInsuranceFundTransformer.insuranceFundsResponseToInsuranceFunds(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.InjectiveInsuranceV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'InsuranceFunds',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'InsuranceFunds',
                contextModule: this.module,
            });
        }
    }
    async fetchInsuranceFund(marketId) {
        const request = core_proto_ts_1.InjectiveInsuranceV1Beta1Query.QueryInsuranceFundRequest.create();
        request.marketId = marketId;
        try {
            const response = await this.retry(() => this.client.InsuranceFund(request));
            return ChainGrpcInsuranceFundTransformer_1.ChainGrpcInsuranceFundTransformer.insuranceFundResponseToInsuranceFund(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.InjectiveInsuranceV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'InsuranceFund',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'InsuranceFund',
                contextModule: this.module,
            });
        }
    }
    async fetchEstimatedRedemptions({ marketId, address, }) {
        const request = core_proto_ts_1.InjectiveInsuranceV1Beta1Query.QueryEstimatedRedemptionsRequest.create();
        request.marketId = marketId;
        request.address = address;
        try {
            const response = await this.retry(() => this.client.EstimatedRedemptions(request));
            return ChainGrpcInsuranceFundTransformer_1.ChainGrpcInsuranceFundTransformer.estimatedRedemptionsResponseToEstimatedRedemptions(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.InjectiveInsuranceV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'EstimatedRedemptions',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'EstimatedRedemptions',
                contextModule: this.module,
            });
        }
    }
    async fetchPendingRedemptions({ marketId, address, }) {
        const request = core_proto_ts_1.InjectiveInsuranceV1Beta1Query.QueryPendingRedemptionsRequest.create();
        request.marketId = marketId;
        request.address = address;
        try {
            const response = await this.retry(() => this.client.PendingRedemptions(request));
            return ChainGrpcInsuranceFundTransformer_1.ChainGrpcInsuranceFundTransformer.redemptionsResponseToRedemptions(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.InjectiveInsuranceV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'PendingRedemptions',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'PendingRedemptions',
                contextModule: this.module,
            });
        }
    }
}
exports.ChainGrpcInsuranceFundApi = ChainGrpcInsuranceFundApi;
//# sourceMappingURL=ChainGrpcInsuranceFundApi.js.map