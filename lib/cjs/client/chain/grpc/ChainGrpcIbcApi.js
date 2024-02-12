"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcIbcApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const pagination_1 = require("../../../utils/pagination");
/**
 * @category Chain Grpc API
 */
class ChainGrpcIbcApi extends BaseGrpcConsumer_1.default {
    module = types_1.ChainModule.Ibc;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new core_proto_ts_1.IbcApplicationsTransferV1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchDenomTrace(hash) {
        const request = core_proto_ts_1.IbcApplicationsTransferV1Query.QueryDenomTraceRequest.create();
        request.hash = hash;
        try {
            const response = await this.retry(() => this.client.DenomTrace(request));
            return response.denomTrace;
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.IbcApplicationsTransferV1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'DenomTrace',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'DenomTrace',
                contextModule: this.module,
            });
        }
    }
    async fetchDenomsTrace(pagination) {
        const request = core_proto_ts_1.IbcApplicationsTransferV1Query.QueryDenomTracesRequest.create();
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.DenomTraces(request));
            return response.denomTraces;
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.IbcApplicationsTransferV1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'DenomTraces',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'DenomTraces',
                contextModule: this.module,
            });
        }
    }
}
exports.ChainGrpcIbcApi = ChainGrpcIbcApi;
//# sourceMappingURL=ChainGrpcIbcApi.js.map