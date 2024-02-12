import { StreamStatusResponse } from '../types';
import { IndexerAccountPortfolioStreamTransformer } from '../transformers';
import { Subscription } from 'rxjs';
import { InjectivePortfolioRpc } from '@injectivelabs/indexer-proto-ts';
export type AccountPortfolioStreamCallback = (response: ReturnType<typeof IndexerAccountPortfolioStreamTransformer.accountPortfolioStreamCallback>) => void;
/**
 * @category Indexer Grpc Stream
 */
export declare class IndexerGrpcAccountPortfolioStream {
    protected client: InjectivePortfolioRpc.InjectivePortfolioRPCClientImpl;
    constructor(endpoint: string);
    streamAccountPortfolio({ subaccountId, accountAddress, type, callback, onEndCallback, onStatusCallback, }: {
        accountAddress: string;
        subaccountId?: string;
        type?: string;
        callback: AccountPortfolioStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
}
