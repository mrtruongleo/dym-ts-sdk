import { StreamOperation } from '@injectivelabs/ts-types';
import { IndexerBid } from '../types';
import { InjectiveAuctionRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Stream Transformer
 */
export declare class IndexerAuctionStreamTransformer {
    static bidsStreamCallback: (response: InjectiveAuctionRpc.StreamBidsResponse) => {
        bid: IndexerBid;
        operation: StreamOperation;
    };
}
