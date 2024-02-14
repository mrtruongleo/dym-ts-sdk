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
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.ChainModule.Bank;
        this.client = new core_proto_ts_1.CosmosBankV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Params(request));
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
        });
    }
    fetchBalance({ accountAddress, denom, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryBalanceRequest.create();
            request.address = accountAddress;
            request.denom = denom;
            try {
                const response = yield this.retry(() => this.client.Balance(request));
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
        });
    }
    fetchBalances(address, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryAllBalancesRequest.create();
            request.address = address;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.AllBalances(request));
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
        });
    }
    fetchTotalSupply(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryTotalSupplyRequest.create();
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.TotalSupply(request));
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
        });
    }
    /** a way to ensure all total supply is fully fetched */
    fetchAllTotalSupply(pagination = { limit: MAX_LIMIT_FOR_SUPPLY }) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, pagination_1.fetchAllWithPagination)(pagination, this.fetchTotalSupply.bind(this));
        });
    }
    fetchSupplyOf(denom) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosBankV1Beta1Query.QuerySupplyOfRequest.create();
            request.denom = denom;
            try {
                const response = yield this.retry(() => this.client.SupplyOf(request));
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
        });
    }
    fetchDenomsMetadata(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryDenomsMetadataRequest.create();
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.DenomsMetadata(request));
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
        });
    }
    fetchDenomMetadata(denom) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosBankV1Beta1Query.QueryDenomMetadataRequest.create();
            request.denom = denom;
            try {
                const response = yield this.retry(() => this.client.DenomMetadata(request));
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
        });
    }
}
exports.ChainGrpcBankApi = ChainGrpcBankApi;
