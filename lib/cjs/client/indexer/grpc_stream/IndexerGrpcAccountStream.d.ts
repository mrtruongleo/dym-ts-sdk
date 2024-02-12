import { StreamStatusResponse } from '../types';
import { IndexerAccountStreamTransformer } from '../transformers';
import { Subscription } from 'rxjs';
import { InjectiveAccountRpc } from '@injectivelabs/indexer-proto-ts';
export type BalanceStreamCallback = (response: ReturnType<typeof IndexerAccountStreamTransformer.balanceStreamCallback>) => void;
/**
 * @category Indexer Grpc Stream
 */
export declare class IndexerGrpcAccountStream {
    protected client: InjectiveAccountRpc.InjectiveAccountsRPCClientImpl;
    constructor(endpoint: string);
    streamSubaccountBalance({ subaccountId, callback, onEndCallback, onStatusCallback, }: {
        subaccountId: string;
        callback: BalanceStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
}
