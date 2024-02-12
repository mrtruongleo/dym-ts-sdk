import { StreamStatusResponse } from '../types';
import { IndexerAuctionStreamTransformer } from '../transformers';
import { Subscription } from 'rxjs';
import { InjectiveAuctionRpc } from '@injectivelabs/indexer-proto-ts';
export type BidsStreamCallback = (response: ReturnType<typeof IndexerAuctionStreamTransformer.bidsStreamCallback>) => void;
/**
 * @category Indexer Grpc Stream
 */
export declare class IndexerGrpcAuctionStream {
    protected client: InjectiveAuctionRpc.InjectiveAuctionRPCClientImpl;
    constructor(endpoint: string);
    streamBids({ callback, onEndCallback, onStatusCallback, }: {
        callback: BidsStreamCallback;
        onEndCallback?: (status?: StreamStatusResponse) => void;
        onStatusCallback?: (status: StreamStatusResponse) => void;
    }): Subscription;
}
