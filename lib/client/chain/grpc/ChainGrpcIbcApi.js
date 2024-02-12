import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { IbcApplicationsTransferV1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { paginationRequestFromPagination } from '../../../utils/pagination';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcIbcApi extends BaseGrpcConsumer {
    module = ChainModule.Ibc;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new IbcApplicationsTransferV1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchDenomTrace(hash) {
        const request = IbcApplicationsTransferV1Query.QueryDenomTraceRequest.create();
        request.hash = hash;
        try {
            const response = await this.retry(() => this.client.DenomTrace(request));
            return response.denomTrace;
        }
        catch (e) {
            if (e instanceof IbcApplicationsTransferV1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'DenomTrace',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'DenomTrace',
                contextModule: this.module,
            });
        }
    }
    async fetchDenomsTrace(pagination) {
        const request = IbcApplicationsTransferV1Query.QueryDenomTracesRequest.create();
        const paginationForRequest = paginationRequestFromPagination(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.DenomTraces(request));
            return response.denomTraces;
        }
        catch (e) {
            if (e instanceof IbcApplicationsTransferV1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'DenomTraces',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'DenomTraces',
                contextModule: this.module,
            });
        }
    }
}
