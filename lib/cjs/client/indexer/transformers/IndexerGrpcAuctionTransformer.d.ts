import { InjectiveAuctionRpc } from '@injectivelabs/indexer-proto-ts';
import { GrpcCoin } from '../../../types';
import { GrpcIndexerBid, GrpcAuction, IndexerBid, Auction } from '../types/auction';
import { Coin } from '@injectivelabs/ts-types';
/**
 * @category Indexer Grpc Transformer
 */
export declare class IndexerGrpcAuctionTransformer {
    static auctionResponseToAuction(response: InjectiveAuctionRpc.AuctionEndpointResponse): {
        auction: Auction;
        bids: IndexerBid[];
    };
    static auctionsResponseToAuctions(response: InjectiveAuctionRpc.AuctionsResponse): Auction[];
    static grpcBidToBid(grpcBid: GrpcIndexerBid): IndexerBid;
    static grpcCoinToCoin(grpcCoin: GrpcCoin): Coin;
    static grpcAuctionToAuction(grpcAuction: GrpcAuction): Auction;
}
