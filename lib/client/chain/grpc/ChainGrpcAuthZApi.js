var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UnspecifiedErrorCode, GrpcUnaryRequestException, } from '@injectivelabs/exceptions';
import { CosmosAuthzV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { paginationRequestFromPagination } from '../../../utils/pagination';
import { ChainGrpcAuthZTransformer } from '../transformers/ChainGrpcAuthZTransformer';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcAuthZApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Authz;
        this.client = new CosmosAuthzV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchGrants({ pagination, granter, grantee, msgTypeUrl, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosAuthzV1Beta1Query.QueryGrantsRequest.create();
            if (granter) {
                request.granter = granter;
            }
            if (grantee) {
                request.grantee = grantee;
            }
            if (msgTypeUrl) {
                request.msgTypeUrl = msgTypeUrl;
            }
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.Grants(request));
                return ChainGrpcAuthZTransformer.grpcGrantsToGrants(response);
            }
            catch (e) {
                if (e instanceof CosmosAuthzV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Grants',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Grants',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchGranterGrants(granter, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosAuthzV1Beta1Query.QueryGranterGrantsRequest.create();
            if (granter) {
                request.granter = granter;
            }
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.GranterGrants(request));
                return ChainGrpcAuthZTransformer.grpcGranterGrantsToGranterGrants(response);
            }
            catch (e) {
                if (e instanceof CosmosAuthzV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GranterGrants',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GranterGrants',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchGranteeGrants(grantee, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosAuthzV1Beta1Query.QueryGranteeGrantsRequest.create();
            if (grantee) {
                request.grantee = grantee;
            }
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.GranteeGrants(request));
                return ChainGrpcAuthZTransformer.grpcGranteeGrantsToGranteeGrants(response);
            }
            catch (e) {
                if (e instanceof CosmosAuthzV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GranteeGrants',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GranteeGrants',
                    contextModule: this.module,
                });
            }
        });
    }
}
