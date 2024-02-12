"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcAuctionTransformer = void 0;
/**
 * @category Chain Grpc Transformer
 */
class ChainGrpcAuctionTransformer {
    static moduleParamsResponseToModuleParams(response) {
        const params = response.params;
        return {
            auctionPeriod: parseInt(params?.auctionPeriod || '0', 10),
            minNextBidIncrementRate: params?.minNextBidIncrementRate || '0',
        };
    }
    static currentBasketResponseToCurrentBasket(response) {
        return {
            amountList: response.amount.map((coin) => ({
                amount: coin.amount,
                denom: coin.denom,
            })),
            auctionRound: parseInt(response.auctionRound, 10),
            auctionClosingTime: parseInt(response.auctionClosingTime, 10),
            highestBidder: response.highestBidAmount,
            highestBidAmount: response.highestBidAmount,
        };
    }
    static auctionModuleStateResponseToAuctionModuleState(response) {
        const state = response.state;
        const bid = state.highestBid;
        const params = state.params;
        return {
            params: {
                auctionPeriod: parseInt(params.auctionPeriod, 10),
                minNextBidIncrementRate: params.minNextBidIncrementRate,
            },
            auctionRound: parseInt(state.auctionRound, 10),
            highestBid: bid
                ? {
                    bidder: bid.bidder,
                    amount: bid.amount,
                }
                : {
                    amount: '',
                    bidder: '',
                },
            auctionEndingTimestamp: parseInt(state.auctionEndingTimestamp, 10),
        };
    }
}
exports.ChainGrpcAuctionTransformer = ChainGrpcAuctionTransformer;
//# sourceMappingURL=ChainGrpcAuctionTransformer.js.map