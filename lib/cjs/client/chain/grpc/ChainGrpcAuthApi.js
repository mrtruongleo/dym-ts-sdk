"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcAuthApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const pagination_1 = require("../../../utils/pagination");
const ChainGrpcAuthTransformer_1 = require("../transformers/ChainGrpcAuthTransformer");
/**
 * @category Chain Grpc API
 */
class ChainGrpcAuthApi extends BaseGrpcConsumer_1.default {
    module = types_1.ChainModule.Auth;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new core_proto_ts_1.CosmosAuthV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = core_proto_ts_1.CosmosAuthV1Beta1Query.QueryParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.Params(request));
            return ChainGrpcAuthTransformer_1.ChainGrpcAuthTransformer.moduleParamsResponseToModuleParams(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosAuthV1Beta1Query.GrpcWebError) {
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
    async fetchAccount(address) {
        const request = core_proto_ts_1.CosmosAuthV1Beta1Query.QueryAccountRequest.create();
        request.address = address;
        try {
            const response = await this.retry(() => this.client.Account(request));
            return ChainGrpcAuthTransformer_1.ChainGrpcAuthTransformer.accountResponseToAccount(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosAuthV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Account',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Account',
                contextModule: this.module,
            });
        }
    }
    async fetchAccounts(pagination) {
        const request = core_proto_ts_1.CosmosAuthV1Beta1Query.QueryAccountsRequest.create();
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.Accounts(request));
            return ChainGrpcAuthTransformer_1.ChainGrpcAuthTransformer.accountsResponseToAccounts(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosAuthV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Accounts',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Accounts',
                contextModule: this.module,
            });
        }
    }
}
exports.ChainGrpcAuthApi = ChainGrpcAuthApi;
//# sourceMappingURL=ChainGrpcAuthApi.js.map