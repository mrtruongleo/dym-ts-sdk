import { AuctionModuleState, CurrentBasket, AuctionModuleStateParams } from '../types/auction';
import { InjectiveAuctionV1Beta1Query } from '@injectivelabs/core-proto-ts';
/**
 * @category Chain Grpc Transformer
 */
export declare class ChainGrpcAuctionTransformer {
    static moduleParamsResponseToModuleParams(response: InjectiveAuctionV1Beta1Query.QueryAuctionParamsResponse): AuctionModuleStateParams;
    static currentBasketResponseToCurrentBasket(response: InjectiveAuctionV1Beta1Query.QueryCurrentAuctionBasketResponse): CurrentBasket;
    static auctionModuleStateResponseToAuctionModuleState(response: InjectiveAuctionV1Beta1Query.QueryModuleStateResponse): AuctionModuleState;
}
