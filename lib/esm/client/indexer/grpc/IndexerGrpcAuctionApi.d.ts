import { InjectiveAuctionRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
/**
 * @category Indexer Grpc API
 */
export declare class IndexerGrpcAuctionApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveAuctionRpc.InjectiveAuctionRPCClientImpl;
    constructor(endpoint: string);
    fetchAuction(round?: number): Promise<{
        auction: import("../types").Auction;
        bids: import("../types").IndexerBid[];
    }>;
    fetchAuctions(): Promise<import("../types").Auction[]>;
}
