import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveInsuranceRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerGrpcInsuranceFundTransformer } from '../transformers';
import { IndexerModule } from '../types';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcInsuranceFundApi extends BaseGrpcConsumer {
    module = IndexerModule.InsuranceFund;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveInsuranceRpc.InjectiveInsuranceRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchRedemptions({ denom, address, status, }) {
        const request = InjectiveInsuranceRpc.RedemptionsRequest.create();
        request.redeemer = address;
        if (denom) {
            request.redemptionDenom = denom;
        }
        if (status) {
            request.status = status;
        }
        try {
            const response = await this.retry(() => this.client.Redemptions(request));
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
    }
    async fetchInsuranceFunds() {
        const request = InjectiveInsuranceRpc.FundsRequest.create();
        try {
            const response = await this.retry(() => this.client.Funds(request));
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
    }
}
