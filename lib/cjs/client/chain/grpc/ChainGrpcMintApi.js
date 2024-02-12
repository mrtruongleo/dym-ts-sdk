"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcMintApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const utils_1 = require("../../../utils");
const utils_2 = require("@injectivelabs/utils");
const ChainGrpcMintTransformer_1 = require("./../transformers/ChainGrpcMintTransformer");
const types_1 = require("../types");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
/**
 * @category Chain Grpc API
 */
class ChainGrpcMintApi extends BaseGrpcConsumer_1.default {
    module = types_1.ChainModule.Mint;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new core_proto_ts_1.CosmosMintV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = core_proto_ts_1.CosmosMintV1Beta1Query.QueryParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.Params(request));
            return ChainGrpcMintTransformer_1.ChainGrpcMintTransformer.moduleParamsResponseToModuleParams(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosMintV1Beta1Query.GrpcWebError) {
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
    }
    async fetchInflation() {
        const request = core_proto_ts_1.CosmosMintV1Beta1Query.QueryInflationRequest.create();
        try {
            const response = await this.retry(() => this.client.Inflation(request));
            return {
                inflation: (0, utils_1.cosmosSdkDecToBigNumber)(new utils_2.BigNumberInBase((0, utils_1.uint8ArrayToString)(response.inflation))).toFixed(),
            };
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosMintV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Inflation',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Inflation',
                contextModule: this.module,
            });
        }
    }
    async fetchAnnualProvisions() {
        const request = core_proto_ts_1.CosmosMintV1Beta1Query.QueryAnnualProvisionsRequest.create();
        try {
            const response = await this.retry(() => this.client.AnnualProvisions(request));
            return {
                annualProvisions: (0, utils_1.cosmosSdkDecToBigNumber)(new utils_2.BigNumberInBase((0, utils_1.uint8ArrayToString)(response.annualProvisions))).toFixed(),
            };
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosMintV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'AnnualProvisions',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'AnnualProvisions',
                contextModule: this.module,
            });
        }
    }
}
exports.ChainGrpcMintApi = ChainGrpcMintApi;
//# sourceMappingURL=ChainGrpcMintApi.js.map