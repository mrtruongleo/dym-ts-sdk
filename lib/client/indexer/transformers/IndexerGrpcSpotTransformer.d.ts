import { AtomicSwap, SpotTrade, SpotMarket, GrpcSpotTrade, SpotLimitOrder, SpotOrderHistory, GrpcSpotMarketInfo, GrpcSpotLimitOrder, GrpcSpotOrderHistory, GrpcAtomicSwap } from '../types/spot';
import { Orderbook, PriceLevel, GrpcTokenMeta, GrpcPriceLevel, IndexerTokenMeta, OrderbookWithSequence } from '../types/exchange';
import { InjectiveSpotExchangeRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Grpc Transformer
 */
export declare class IndexerGrpcSpotTransformer {
    static grpcTokenMetaToTokenMeta(tokenMeta: GrpcTokenMeta | undefined): IndexerTokenMeta | undefined;
    static marketResponseToMarket(response: InjectiveSpotExchangeRpc.MarketResponse): SpotMarket;
    static marketsResponseToMarkets(response: InjectiveSpotExchangeRpc.MarketsResponse): SpotMarket[];
    static ordersResponseToOrders(response: InjectiveSpotExchangeRpc.OrdersResponse): {
        orders: SpotLimitOrder[];
        pagination: import("../../..").ExchangePagination;
    };
    static orderHistoryResponseToOrderHistory(response: InjectiveSpotExchangeRpc.OrdersHistoryResponse): {
        orderHistory: SpotOrderHistory[];
        pagination: import("../../..").ExchangePagination;
    };
    static tradesResponseToTrades(response: InjectiveSpotExchangeRpc.TradesResponse): {
        trades: SpotTrade[];
        pagination: import("../../..").ExchangePagination;
    };
    static subaccountTradesListResponseToTradesList(response: InjectiveSpotExchangeRpc.SubaccountTradesListResponse): SpotTrade[];
    static orderbookV2ResponseToOrderbookV2(response: InjectiveSpotExchangeRpc.OrderbookV2Response): OrderbookWithSequence;
    static orderbooksV2ResponseToOrderbooksV2(response: InjectiveSpotExchangeRpc.OrderbooksV2Response): {
        marketId: string;
        orderbook: OrderbookWithSequence;
    }[];
    static grpcMarketToMarket(market: GrpcSpotMarketInfo): SpotMarket;
    static grpcMarketsToMarkets(markets: GrpcSpotMarketInfo[]): SpotMarket[];
    static grpcPriceLevelToPriceLevel(priceLevel: GrpcPriceLevel): PriceLevel;
    static grpcPriceLevelsToPriceLevels(priceLevels: GrpcPriceLevel[]): PriceLevel[];
    static grpcOrderbookToOrderbook({ buys, sells, }: {
        buys: GrpcPriceLevel[];
        sells: GrpcPriceLevel[];
    }): Orderbook;
    static grpcOrderbookV2ToOrderbookV2({ buys, sells, sequence, }: {
        buys: GrpcPriceLevel[];
        sells: GrpcPriceLevel[];
        sequence: number;
    }): OrderbookWithSequence;
    static grpcOrderToOrder(order: GrpcSpotLimitOrder): SpotLimitOrder;
    static grpcOrdersToOrders(orders: GrpcSpotLimitOrder[]): SpotLimitOrder[];
    static grpcOrderHistoryToOrderHistory(orderHistory: GrpcSpotOrderHistory): SpotOrderHistory;
    static grpcOrderHistoryListToOrderHistoryList(orderHistory: GrpcSpotOrderHistory[]): SpotOrderHistory[];
    static grpcTradeToTrade(trade: GrpcSpotTrade): SpotTrade;
    static grpcTradesToTrades(trades: GrpcSpotTrade[]): SpotTrade[];
    static grpcAtomicSwapHistoryListToAtomicSwapHistoryList(response: InjectiveSpotExchangeRpc.AtomicSwapHistoryResponse): {
        swapHistory: AtomicSwap[];
        pagination: import("../../..").ExchangePagination;
    };
    static grpcAtomicSwapHistoryToAtomicSwapHistory(swapHistory: GrpcAtomicSwap): AtomicSwap;
}
