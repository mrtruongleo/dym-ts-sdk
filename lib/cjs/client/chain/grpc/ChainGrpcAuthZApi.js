"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcAuthZApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const pagination_1 = require("../../../utils/pagination");
const ChainGrpcAuthZTransformer_1 = require("../transformers/ChainGrpcAuthZTransformer");
/**
 * @category Chain Grpc API
 */
class ChainGrpcAuthZApi extends BaseGrpcConsumer_1.default {
    module = types_1.ChainModule.Authz;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new core_proto_ts_1.CosmosAuthzV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchGrants({ pagination, granter, grantee, msgTypeUrl, }) {
        const request = core_proto_ts_1.CosmosAuthzV1Beta1Query.QueryGrantsRequest.create();
        if (granter) {
            request.granter = granter;
        }
        if (grantee) {
            request.grantee = grantee;
        }
        if (msgTypeUrl) {
            request.msgTypeUrl = msgTypeUrl;
        }
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.Grants(request));
            return ChainGrpcAuthZTransformer_1.ChainGrpcAuthZTransformer.grpcGrantsToGrants(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosAuthzV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Grants',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Grants',
                contextModule: this.module,
            });
        }
    }
    async fetchGranterGrants(granter, pagination) {
        const request = core_proto_ts_1.CosmosAuthzV1Beta1Query.QueryGranterGrantsRequest.create();
        if (granter) {
            request.granter = granter;
        }
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.GranterGrants(request));
            return ChainGrpcAuthZTransformer_1.ChainGrpcAuthZTransformer.grpcGranterGrantsToGranterGrants(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosAuthzV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GranterGrants',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GranterGrants',
                contextModule: this.module,
            });
        }
    }
    async fetchGranteeGrants(grantee, pagination) {
        const request = core_proto_ts_1.CosmosAuthzV1Beta1Query.QueryGranteeGrantsRequest.create();
        if (grantee) {
            request.grantee = grantee;
        }
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.GranteeGrants(request));
            return ChainGrpcAuthZTransformer_1.ChainGrpcAuthZTransformer.grpcGranteeGrantsToGranteeGrants(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosAuthzV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GranteeGrants',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'GranteeGrants',
                contextModule: this.module,
            });
        }
    }
}
exports.ChainGrpcAuthZApi = ChainGrpcAuthZApi;
//# sourceMappingURL=ChainGrpcAuthZApi.js.map