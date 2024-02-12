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
    module = ChainModule.Authz;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new CosmosAuthzV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchGrants({ pagination, granter, grantee, msgTypeUrl, }) {
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
            const response = await this.retry(() => this.client.Grants(request));
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
    }
    async fetchGranterGrants(granter, pagination) {
        const request = CosmosAuthzV1Beta1Query.QueryGranterGrantsRequest.create();
        if (granter) {
            request.granter = granter;
        }
        const paginationForRequest = paginationRequestFromPagination(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.GranterGrants(request));
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
    }
    async fetchGranteeGrants(grantee, pagination) {
        const request = CosmosAuthzV1Beta1Query.QueryGranteeGrantsRequest.create();
        if (grantee) {
            request.grantee = grantee;
        }
        const paginationForRequest = paginationRequestFromPagination(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.GranteeGrants(request));
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
    }
}
