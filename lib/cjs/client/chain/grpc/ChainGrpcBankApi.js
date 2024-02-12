"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcBankApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
const pagination_1 = require("../../../utils/pagination");
const MAX_LIMIT_FOR_SUPPLY = 10000;
/**
 * @category Chain Grpc API
 */
class ChainGrpcBankApi extends BaseGrpcConsumer_1.default {
    module = types_1.ChainModule.Bank;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new core_proto_ts_1.CosmosBankV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.Params(request));
            return transformers_1.ChainGrpcBankTransformer.moduleParamsResponseToModuleParams(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosBankV1Beta1Query.GrpcWebError) {
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
    async fetchBalance({ accountAddress, denom, }) {
        const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryBalanceRequest.create();
        request.address = accountAddress;
        request.denom = denom;
        try {
            const response = await this.retry(() => this.client.Balance(request));
            return transformers_1.ChainGrpcBankTransformer.balanceResponseToBalance(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosBankV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Balance',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Balance',
                contextModule: this.module,
            });
        }
    }
    async fetchBalances(address, pagination) {
        const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryAllBalancesRequest.create();
        request.address = address;
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.AllBalances(request));
            return transformers_1.ChainGrpcBankTransformer.balancesResponseToBalances(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosBankV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'AllBalances',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'AllBalances',
                contextModule: this.module,
            });
        }
    }
    async fetchTotalSupply(pagination) {
        const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryTotalSupplyRequest.create();
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.TotalSupply(request));
            return transformers_1.ChainGrpcBankTransformer.totalSupplyResponseToTotalSupply(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosBankV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'TotalSupply',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'TotalSupply',
                contextModule: this.module,
            });
        }
    }
    /** a way to ensure all total supply is fully fetched */
    async fetchAllTotalSupply(pagination = { limit: MAX_LIMIT_FOR_SUPPLY }) {
        return (0, pagination_1.fetchAllWithPagination)(pagination, this.fetchTotalSupply.bind(this));
    }
    async fetchSupplyOf(denom) {
        const request = core_proto_ts_1.CosmosBankV1Beta1Query.QuerySupplyOfRequest.create();
        request.denom = denom;
        try {
            const response = await this.retry(() => this.client.SupplyOf(request));
            return transformers_1.ChainGrpcBankTransformer.grpcCoinToCoin(response.amount);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosBankV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'fetchSupplyOf',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'fetchSupplyOf',
                contextModule: this.module,
            });
        }
    }
    async fetchDenomsMetadata(pagination) {
        const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryDenomsMetadataRequest.create();
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.DenomsMetadata(request));
            return transformers_1.ChainGrpcBankTransformer.denomsMetadataResponseToDenomsMetadata(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosBankV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'DenomsMetadata',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'DenomsMetadata',
                contextModule: this.module,
            });
        }
    }
    async fetchDenomMetadata(denom) {
        const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryDenomMetadataRequest.create();
        request.denom = denom;
        try {
            const response = await this.retry(() => this.client.DenomMetadata(request));
            return transformers_1.ChainGrpcBankTransformer.metadataToMetadata(response.metadata);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmosBankV1Beta1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'DenomMetadata',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'DenomMetadata',
                contextModule: this.module,
            });
        }
    }
}
exports.ChainGrpcBankApi = ChainGrpcBankApi;
//# sourceMappingURL=ChainGrpcBankApi.js.map