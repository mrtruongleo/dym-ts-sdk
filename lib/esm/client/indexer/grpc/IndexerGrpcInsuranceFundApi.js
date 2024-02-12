"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcInsuranceFundApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const transformers_1 = require("../transformers");
const types_1 = require("../types");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcInsuranceFundApi extends BaseIndexerGrpcConsumer_1.default {
    module = types_1.IndexerModule.InsuranceFund;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new indexer_proto_ts_1.InjectiveInsuranceRpc.InjectiveInsuranceRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchRedemptions({ denom, address, status, }) {
        const request = indexer_proto_ts_1.InjectiveInsuranceRpc.RedemptionsRequest.create();
        request.redeemer = address;
        if (denom) {
            request.redemptionDenom = denom;
        }
        if (status) {
            request.status = status;
        }
        try {
            const response = await this.retry(() => this.client.Redemptions(request));
            return transformers_1.IndexerGrpcInsuranceFundTransformer.redemptionsResponseToRedemptions(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveInsuranceRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Redemptions',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Redemptions',
                contextModule: this.module,
            });
        }
    }
    async fetchInsuranceFunds() {
        const request = indexer_proto_ts_1.InjectiveInsuranceRpc.FundsRequest.create();
        try {
            const response = await this.retry(() => this.client.Funds(request));
            return transformers_1.IndexerGrpcInsuranceFundTransformer.insuranceFundsResponseToInsuranceFunds(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveInsuranceRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Funds',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Funds',
                contextModule: this.module,
            });
        }
    }
}
exports.IndexerGrpcInsuranceFundApi = IndexerGrpcInsuranceFundApi;
//# sourceMappingURL=IndexerGrpcInsuranceFundApi.js.map