"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcTendermintApi = void 0;
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const exceptions_1 = require("@injectivelabs/exceptions");
/**
 * @category Chain Grpc API
 */
class ChainGrpcTendermintApi extends BaseGrpcConsumer_1.default {
    module = types_1.ChainModule.Tendermint;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new core_proto_ts_1.CosmosBaseTendermintV1Beta1Query.ServiceClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchLatestBlock() {
        const request = core_proto_ts_1.CosmosBaseTendermintV1Beta1Query.GetLatestBlockRequest.create();
        try {
            const response = await this.retry(() => this.client.GetLatestBlock(request));
            return response.block || response.sdkBlock;
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosBaseTendermintV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'TendermintApi.fetchLatestBlock',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'TendermintApi.fetchLatestBlock',
                contextModule: this.module,
            });
        }
    }
}
exports.ChainGrpcTendermintApi = ChainGrpcTendermintApi;
//# sourceMappingURL=ChainGrpcTendermintApi.js.map