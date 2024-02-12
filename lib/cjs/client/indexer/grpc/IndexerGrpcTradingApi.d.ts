import { InjectiveTradingRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
/**
 * @category Indexer Grpc API
 */
export declare class IndexerGrpcTradingApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveTradingRpc.InjectiveTradingRPCClientImpl;
    constructor(endpoint: string);
    fetchGridStrategies({ accountAddress, subaccountId, state, marketId, }: {
        accountAddress?: string;
        subaccountId?: string;
        state?: string;
        marketId?: string;
    }): Promise<InjectiveTradingRpc.ListTradingStrategiesResponse>;
}
