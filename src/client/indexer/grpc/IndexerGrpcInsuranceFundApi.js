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
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.IndexerModule.InsuranceFund;
        this.client = new indexer_proto_ts_1.InjectiveInsuranceRpc.InjectiveInsuranceRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchRedemptions({ denom, address, status, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveInsuranceRpc.RedemptionsRequest.create();
            request.redeemer = address;
            if (denom) {
                request.redemptionDenom = denom;
            }
            if (status) {
                request.status = status;
            }
            try {
                const response = yield this.retry(() => this.client.Redemptions(request));
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
        });
    }
    fetchInsuranceFunds() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveInsuranceRpc.FundsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Funds(request));
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
        });
    }
}
exports.IndexerGrpcInsuranceFundApi = IndexerGrpcInsuranceFundApi;
