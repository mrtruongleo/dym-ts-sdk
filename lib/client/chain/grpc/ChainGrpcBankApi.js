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
import { CosmosBankV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcBankTransformer } from '../transformers';
import { fetchAllWithPagination, paginationRequestFromPagination, } from '../../../utils/pagination';
const MAX_LIMIT_FOR_SUPPLY = 10000;
/**
 * @category Chain Grpc API
 */
export class ChainGrpcBankApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Bank;
        this.client = new CosmosBankV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosBankV1Beta1Query.QueryParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Params(request));
                return ChainGrpcBankTransformer.moduleParamsResponseToModuleParams(response);
            }
            catch (e) {
                if (e instanceof CosmosBankV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Params',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Params',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchBalance({ accountAddress, denom, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosBankV1Beta1Query.QueryBalanceRequest.create();
            request.address = accountAddress;
            request.denom = denom;
            try {
                const response = yield this.retry(() => this.client.Balance(request));
                return ChainGrpcBankTransformer.balanceResponseToBalance(response);
            }
            catch (e) {
                if (e instanceof CosmosBankV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Balance',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Balance',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchBalances(address, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosBankV1Beta1Query.QueryAllBalancesRequest.create();
            request.address = address;
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.AllBalances(request));
                return ChainGrpcBankTransformer.balancesResponseToBalances(response);
            }
            catch (e) {
                if (e instanceof CosmosBankV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AllBalances',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'AllBalances',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchTotalSupply(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosBankV1Beta1Query.QueryTotalSupplyRequest.create();
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.TotalSupply(request));
                return ChainGrpcBankTransformer.totalSupplyResponseToTotalSupply(response);
            }
            catch (e) {
                if (e instanceof CosmosBankV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'TotalSupply',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'TotalSupply',
                    contextModule: this.module,
                });
            }
        });
    }
    /** a way to ensure all total supply is fully fetched */
    fetchAllTotalSupply(pagination = { limit: MAX_LIMIT_FOR_SUPPLY }) {
        return __awaiter(this, void 0, void 0, function* () {
            return fetchAllWithPagination(pagination, this.fetchTotalSupply.bind(this));
        });
    }
    fetchSupplyOf(denom) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosBankV1Beta1Query.QuerySupplyOfRequest.create();
            request.denom = denom;
            try {
                const response = yield this.retry(() => this.client.SupplyOf(request));
                return ChainGrpcBankTransformer.grpcCoinToCoin(response.amount);
            }
            catch (e) {
                if (e instanceof CosmosBankV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'fetchSupplyOf',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'fetchSupplyOf',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDenomsMetadata(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosBankV1Beta1Query.QueryDenomsMetadataRequest.create();
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.DenomsMetadata(request));
                return ChainGrpcBankTransformer.denomsMetadataResponseToDenomsMetadata(response);
            }
            catch (e) {
                if (e instanceof CosmosBankV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DenomsMetadata',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'DenomsMetadata',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchDenomMetadata(denom) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosBankV1Beta1Query.QueryDenomMetadataRequest.create();
            request.denom = denom;
            try {
                const response = yield this.retry(() => this.client.DenomMetadata(request));
                return ChainGrpcBankTransformer.metadataToMetadata(response.metadata);
            }
            catch (e) {
                if (e instanceof CosmosBankV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'DenomMetadata',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'DenomMetadata',
                    contextModule: this.module,
                });
            }
        });
    }
}
