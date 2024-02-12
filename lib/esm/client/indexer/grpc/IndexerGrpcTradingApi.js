import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveTradingRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcTradingApi extends BaseGrpcConsumer {
    module = IndexerModule.Trading;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveTradingRpc.InjectiveTradingRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchGridStrategies({ accountAddress, subaccountId, state, marketId, }) {
        const request = InjectiveTradingRpc.ListTradingStrategiesRequest.create();
        if (accountAddress) {
            request.accountAddress = accountAddress;
        }
        if (subaccountId) {
            request.subaccountId = subaccountId;
        }
        if (state) {
            request.state = state;
        }
        if (marketId) {
            request.marketId = marketId;
        }
        try {
            const response = await this.retry(() => this.client.ListTradingStrategies(request));
            return response;
        }
        catch (e) {
            if (e instanceof InjectiveTradingRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GridStrategies',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'GridStrategies',
                contextModule: this.module,
            });
        }
    }
}
