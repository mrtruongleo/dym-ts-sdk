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
import { InjectiveInsuranceRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerGrpcInsuranceFundTransformer } from '../transformers';
import { IndexerModule } from '../types';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcInsuranceFundApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = IndexerModule.InsuranceFund;
        this.client = new InjectiveInsuranceRpc.InjectiveInsuranceRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchRedemptions({ denom, address, status, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveInsuranceRpc.RedemptionsRequest.create();
            request.redeemer = address;
            if (denom) {
                request.redemptionDenom = denom;
            }
            if (status) {
                request.status = status;
            }
            try {
                const response = yield this.retry(() => this.client.Redemptions(request));
                return IndexerGrpcInsuranceFundTransformer.redemptionsResponseToRedemptions(response);
            }
            catch (e) {
                if (e instanceof InjectiveInsuranceRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Redemptions',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Redemptions',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchInsuranceFunds() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveInsuranceRpc.FundsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Funds(request));
                return IndexerGrpcInsuranceFundTransformer.insuranceFundsResponseToInsuranceFunds(response);
            }
            catch (e) {
                if (e instanceof InjectiveInsuranceRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Funds',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Funds',
                    contextModule: this.module,
                });
            }
        });
    }
}
