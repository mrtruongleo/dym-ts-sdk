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
import { CosmosAuthV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { paginationRequestFromPagination } from '../../../utils/pagination';
import { ChainGrpcAuthTransformer } from '../transformers/ChainGrpcAuthTransformer';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcAuthApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Auth;
        this.client = new CosmosAuthV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosAuthV1Beta1Query.QueryParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Params(request));
                return ChainGrpcAuthTransformer.moduleParamsResponseToModuleParams(response);
            }
            catch (e) {
                if (e instanceof CosmosAuthV1Beta1Query.GrpcWebError) {
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
    fetchAccount(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosAuthV1Beta1Query.QueryAccountRequest.create();
            request.address = address;
            try {
                const response = yield this.retry(() => this.client.Account(request));
                return ChainGrpcAuthTransformer.accountResponseToAccount(response);
            }
            catch (e) {
                if (e instanceof CosmosAuthV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Account',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Account',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchAccounts(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosAuthV1Beta1Query.QueryAccountsRequest.create();
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Accounts(request));
                return ChainGrpcAuthTransformer.accountsResponseToAccounts(response);
            }
            catch (e) {
                if (e instanceof CosmosAuthV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Accounts',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Accounts',
                    contextModule: this.module,
                });
            }
        });
    }
}
