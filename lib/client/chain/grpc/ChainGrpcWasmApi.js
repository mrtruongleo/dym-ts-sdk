var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { CosmwasmWasmV1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcWasmTransformer } from '../transformers';
import { paginationRequestFromPagination } from '../../../utils/pagination';
import { toBase64 } from '../../../utils/utf8';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcWasmApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Wasm;
        this.client = new CosmwasmWasmV1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchContractAccountsBalance({ contractAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmwasmWasmV1Query.QueryAllContractStateRequest.create();
            request.address = contractAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.AllContractState(request));
                return ChainGrpcWasmTransformer.allContractStateResponseToContractAccountsBalanceWithPagination(response);
            }
            catch (e) {
                if (e instanceof CosmwasmWasmV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AllContractState',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'AllContractState',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractState({ contractAddress, pagination, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmwasmWasmV1Query.QueryAllContractStateRequest.create();
            request.address = contractAddress;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.AllContractState(request));
                return ChainGrpcWasmTransformer.allContractStateResponseToContractState(response);
            }
            catch (e) {
                if (e instanceof CosmwasmWasmV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AllContractState',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'AllContractState',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractInfo(contractAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmwasmWasmV1Query.QueryContractInfoRequest.create();
            request.address = contractAddress;
            try {
                const response = yield this.retry(() => this.client.ContractInfo(request));
                const contractInfo = response.contractInfo;
                if (!contractInfo) {
                    return;
                }
                return ChainGrpcWasmTransformer.contactInfoResponseToContractInfo(contractInfo);
            }
            catch (e) {
                if (e instanceof CosmwasmWasmV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ContractInfo',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'ContractInfo',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractHistory(contractAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmwasmWasmV1Query.QueryContractHistoryRequest.create();
            request.address = contractAddress;
            try {
                const response = yield this.retry(() => this.client.ContractHistory(request));
                return ChainGrpcWasmTransformer.contactHistoryResponseToContractHistory(response);
            }
            catch (e) {
                if (e instanceof CosmwasmWasmV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ContractHistory',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'ContractHistory',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchSmartContractState(contractAddress, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmwasmWasmV1Query.QuerySmartContractStateRequest.create();
            request.address = contractAddress;
            if (query) {
                request.queryData = Buffer.from(typeof query === 'string' ? query : toBase64(query), 'base64');
            }
            try {
                const response = yield this.retry(() => this.client.SmartContractState(request));
                return response;
            }
            catch (e) {
                if (e instanceof CosmwasmWasmV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'SmartContractState',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'SmartContractState',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchRawContractState(contractAddress, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmwasmWasmV1Query.QueryRawContractStateRequest.create();
            request.address = contractAddress;
            if (query) {
                request.queryData = Buffer.from(query, 'base64');
            }
            try {
                const response = yield this.retry(() => this.client.RawContractState(request));
                return response;
            }
            catch (e) {
                if (e instanceof CosmwasmWasmV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'RawContractState',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'RawContractState',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractCodes(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmwasmWasmV1Query.QueryCodesRequest.create();
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Codes(request));
                return ChainGrpcWasmTransformer.contractCodesResponseToContractCodes(response);
            }
            catch (e) {
                if (e instanceof CosmwasmWasmV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Codes',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Codes',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractCode(codeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmwasmWasmV1Query.QueryCodeRequest.create();
            request.codeId = codeId.toString();
            try {
                const response = yield this.retry(() => this.client.Code(request));
                return ChainGrpcWasmTransformer.contractCodeResponseToContractCode(response);
            }
            catch (e) {
                if (e instanceof CosmwasmWasmV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Code',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Code',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchContractCodeContracts(codeId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmwasmWasmV1Query.QueryContractsByCodeRequest.create();
            request.codeId = codeId.toString();
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.ContractsByCode(request));
                return ChainGrpcWasmTransformer.contractByCodeResponseToContractByCode(response);
            }
            catch (e) {
                if (e instanceof CosmwasmWasmV1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'ContractsByCode',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'ContractsByCode',
                    contextModule: this.module,
                });
            }
        });
    }
}
