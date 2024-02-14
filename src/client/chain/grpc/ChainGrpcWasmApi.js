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
exports.ChainGrpcWasmApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
const pagination_1 = require("../../../utils/pagination");
const utf8_1 = require("../../../utils/utf8");
/**
 * @category Chain Grpc API
 */
class ChainGrpcWasmApi extends BaseGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.ChainModule.Wasm;
        this.client = new core_proto_ts_1.CosmwasmWasmV1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchContractAccountsBalance({ contractAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryAllContractStateRequest.create();
            request.address = contractAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.AllContractState(request));
                return transformers_1.ChainGrpcWasmTransformer.allContractStateResponseToContractAccountsBalanceWithPagination(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AllContractState',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'AllContractState',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractState({ contractAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryAllContractStateRequest.create();
            request.address = contractAddress;
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.AllContractState(request));
                return transformers_1.ChainGrpcWasmTransformer.allContractStateResponseToContractState(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AllContractState',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'AllContractState',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractInfo(contractAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryContractInfoRequest.create();
            request.address = contractAddress;
            try {
                const response = yield this.retry(() => this.client.ContractInfo(request));
                const contractInfo = response.contractInfo;
                if (!contractInfo) {
                    return;
                }
                return transformers_1.ChainGrpcWasmTransformer.contactInfoResponseToContractInfo(contractInfo);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ContractInfo',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'ContractInfo',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractHistory(contractAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryContractHistoryRequest.create();
            request.address = contractAddress;
            try {
                const response = yield this.retry(() => this.client.ContractHistory(request));
                return transformers_1.ChainGrpcWasmTransformer.contactHistoryResponseToContractHistory(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ContractHistory',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'ContractHistory',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchSmartContractState(contractAddress, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmwasmWasmV1Query.QuerySmartContractStateRequest.create();
            request.address = contractAddress;
            if (query) {
                request.queryData = Buffer.from(typeof query === 'string' ? query : (0, utf8_1.toBase64)(query), 'base64');
            }
            try {
                const response = yield this.retry(() => this.client.SmartContractState(request));
                return response;
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'SmartContractState',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'SmartContractState',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchRawContractState(contractAddress, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryRawContractStateRequest.create();
            request.address = contractAddress;
            if (query) {
                request.queryData = Buffer.from(query, 'base64');
            }
            try {
                const response = yield this.retry(() => this.client.RawContractState(request));
                return response;
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'RawContractState',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'RawContractState',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractCodes(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryCodesRequest.create();
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Codes(request));
                return transformers_1.ChainGrpcWasmTransformer.contractCodesResponseToContractCodes(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Codes',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Codes',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractCode(codeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryCodeRequest.create();
            request.codeId = codeId.toString();
            try {
                const response = yield this.retry(() => this.client.Code(request));
                return transformers_1.ChainGrpcWasmTransformer.contractCodeResponseToContractCode(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Code',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Code',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractCodeContracts(codeId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryContractsByCodeRequest.create();
            request.codeId = codeId.toString();
            const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ContractsByCode(request));
                return transformers_1.ChainGrpcWasmTransformer.contractByCodeResponseToContractByCode(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ContractsByCode',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'ContractsByCode',
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.ChainGrpcWasmApi = ChainGrpcWasmApi;
