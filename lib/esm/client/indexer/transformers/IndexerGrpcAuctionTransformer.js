"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcAuctionTransformer = void 0;
/**
 * @category Indexer Grpc Transformer
 */
class IndexerGrpcAuctionTransformer {
    static auctionResponseToAuction(response) {
        return {
            auction: IndexerGrpcAuctionTransformer.grpcAuctionToAuction(response.auction),
            bids: response.bids.map(IndexerGrpcAuctionTransformer.grpcBidToBid),
        };
    }
    static auctionsResponseToAuctions(response) {
        return response.auctions.map((a) => IndexerGrpcAuctionTransformer.grpcAuctionToAuction(a));
    }
    static grpcBidToBid(grpcBid) {
        return {
            bidder: grpcBid.bidder,
            bidAmount: grpcBid.amount,
            bidTimestamp: parseInt(grpcBid.timestamp, 10),
        };
    }
    static grpcCoinToCoin(grpcCoin) {
        return {
            denom: grpcCoin.denom,
            amount: grpcCoin.amount,
        };
    }
    static grpcAuctionToAuction(grpcAuction) {
        return {
            winner: grpcAuction.winner,
            basketList: grpcAuction.basket.map(IndexerGrpcAuctionTransformer.grpcCoinToCoin),
            winningBidAmount: grpcAuction.winningBidAmount,
            round: parseInt(grpcAuction.round, 10),
            endTimestamp: parseInt(grpcAuction.endTimestamp, 10),
            updatedAt: parseInt(grpcAuction.updatedAt, 10),
        };
    }
}
exports.IndexerGrpcAuctionTransformer = IndexerGrpcAuctionTransformer;
//# sourceMappingURL=IndexerGrpcAuctionTransformer.js.map