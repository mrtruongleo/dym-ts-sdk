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
import { IbcApplicationsTransferV1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { paginationRequestFromPagination } from '../../../utils/pagination';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcIbcApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Ibc;
        this.client = new IbcApplicationsTransferV1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchDenomTrace(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = IbcApplicationsTransferV1Query.QueryDenomTraceRequest.create();
            request.hash = hash;
            try {
                const response = yield this.retry(() => this.client.DenomTrace(request));
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
        });
    }
    fetchDenomsTrace(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = IbcApplicationsTransferV1Query.QueryDenomTracesRequest.create();
            const paginationForRequest = paginationRequestFromPagination(pagination);
            if (paginationForRequest) {
                request.pagination = paginationForRequest;
            }
            try {
                const response = yield this.retry(() => this.client.DenomTraces(request));
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
        });
    }
}
