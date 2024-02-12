"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcWasmXApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
/**
 * @category Chain Grpc API
 */
class ChainGrpcWasmXApi extends BaseGrpcConsumer_1.default {
    module = types_1.ChainModule.WasmX;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new core_proto_ts_1.InjectiveWasmxV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = core_proto_ts_1.InjectiveWasmxV1Beta1Query.QueryWasmxParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.WasmxParams(request));
            return response;
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.InjectiveWasmxV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'WasmxParams',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'WasmxParams',
                contextModule: this.module,
            });
        }
    }
    async fetchModuleState() {
        const request = core_proto_ts_1.InjectiveWasmxV1Beta1Query.QueryModuleStateRequest.create();
        try {
            const response = await this.retry(() => this.client.WasmxModuleState(request));
            return response.state; /* TODO */
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.InjectiveWasmxV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'WasmxModuleState',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'WasmxModuleState',
                contextModule: this.module,
            });
        }
    }
}
exports.ChainGrpcWasmXApi = ChainGrpcWasmXApi;
//# sourceMappingURL=ChainGrpcWasmXApi.js.map