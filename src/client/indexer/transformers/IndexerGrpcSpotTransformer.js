"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcSpotTransformer = void 0;
const utils_1 = require("@injectivelabs/utils");
const pagination_1 = require("../../../utils/pagination");
const token_metadata_1 = require("@injectivelabs/token-metadata");
const zeroPriceLevel = () => ({
    price: '0',
    quantity: '0',
    timestamp: 0,
});
/**
 * @category Indexer Grpc Transformer
 */
class IndexerGrpcSpotTransformer {
    static grpcTokenMetaToTokenMeta(tokenMeta) {
        if (!tokenMeta) {
            return;
        }
        return {
            name: tokenMeta.name,
            address: tokenMeta.address,
            symbol: tokenMeta.symbol,
            logo: tokenMeta.logo,
            decimals: tokenMeta.decimals,
            updatedAt: tokenMeta.updatedAt,
            coinGeckoId: '',
            tokenType: token_metadata_1.TokenType.Unknown,
        };
    }
    static marketResponseToMarket(response) {
        const market = response.market;
        return IndexerGrpcSpotTransformer.grpcMarketToMarket(market);
    }
    static marketsResponseToMarkets(response) {
        const markets = response.markets;
        return IndexerGrpcSpotTransformer.grpcMarketsToMarkets(markets);
    }
    static ordersResponseToOrders(response) {
        const orders = response.orders;
        const pagination = response.paging;
        return {
            orders: IndexerGrpcSpotTransformer.grpcOrdersToOrders(orders),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static orderHistoryResponseToOrderHistory(response) {
        const orderHistory = response.orders;
        const pagination = response.paging;
        return {
            orderHistory: IndexerGrpcSpotTransformer.grpcOrderHistoryListToOrderHistoryList(orderHistory),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static tradesResponseToTrades(response) {
        const trades = response.trades;
        const pagination = response.paging;
        return {
            trades: IndexerGrpcSpotTransformer.grpcTradesToTrades(trades),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static subaccountTradesListResponseToTradesList(response) {
        const tradesList = response.trades;
        return IndexerGrpcSpotTransformer.grpcTradesToTrades(tradesList);
    }
    static orderbookV2ResponseToOrderbookV2(response) {
        const orderbook = response.orderbook;
        return IndexerGrpcSpotTransformer.grpcOrderbookV2ToOrderbookV2({
            sequence: parseInt(orderbook.sequence, 10),
            buys: orderbook === null || orderbook === void 0 ? void 0 : orderbook.buys,
            sells: orderbook === null || orderbook === void 0 ? void 0 : orderbook.sells,
        });
    }
    static orderbooksV2ResponseToOrderbooksV2(response) {
        const orderbooks = response.orderbooks;
        return orderbooks.map((o) => {
            const orderbook = o.orderbook;
            return {
                marketId: o.marketId,
                orderbook: IndexerGrpcSpotTransformer.grpcOrderbookV2ToOrderbookV2({
                    sequence: parseInt(orderbook.sequence, 10),
                    buys: orderbook.buys,
                    sells: orderbook.sells,
                }),
            };
        });
    }
    static grpcMarketToMarket(market) {
        return {
            marketId: market.marketId,
            marketStatus: market.marketStatus,
            ticker: market.ticker,
            baseDenom: market.baseDenom,
            quoteDenom: market.quoteDenom,
            quoteToken: IndexerGrpcSpotTransformer.grpcTokenMetaToTokenMeta(market.quoteTokenMeta),
            baseToken: IndexerGrpcSpotTransformer.grpcTokenMetaToTokenMeta(market.baseTokenMeta),
            makerFeeRate: market.makerFeeRate,
            takerFeeRate: market.takerFeeRate,
            serviceProviderFee: market.serviceProviderFee,
            minPriceTickSize: new utils_1.BigNumber(market.minPriceTickSize).toNumber(),
            minQuantityTickSize: new utils_1.BigNumber(market.minQuantityTickSize).toNumber(),
        };
    }
    static grpcMarketsToMarkets(markets) {
        return markets.map((market) => IndexerGrpcSpotTransformer.grpcMarketToMarket(market));
    }
    static grpcPriceLevelToPriceLevel(priceLevel) {
        return {
            price: priceLevel.price,
            quantity: priceLevel.quantity,
            timestamp: parseInt(priceLevel.timestamp, 10),
        };
    }
    static grpcPriceLevelsToPriceLevels(priceLevels) {
        return priceLevels.map((priceLevel) => IndexerGrpcSpotTransformer.grpcPriceLevelToPriceLevel(priceLevel));
    }
    static grpcOrderbookToOrderbook({ buys, sells, }) {
        return {
            buys: IndexerGrpcSpotTransformer.grpcPriceLevelsToPriceLevels(buys),
            sells: IndexerGrpcSpotTransformer.grpcPriceLevelsToPriceLevels(sells),
        };
    }
    static grpcOrderbookV2ToOrderbookV2({ buys, sells, sequence, }) {
        return {
            sequence,
            buys: IndexerGrpcSpotTransformer.grpcPriceLevelsToPriceLevels(buys),
            sells: IndexerGrpcSpotTransformer.grpcPriceLevelsToPriceLevels(sells),
        };
    }
    static grpcOrderToOrder(order) {
        return {
            orderHash: order.orderHash,
            orderSide: order.orderSide,
            marketId: order.marketId,
            cid: order.cid,
            subaccountId: order.subaccountId,
            price: order.price,
            state: order.state,
            quantity: order.quantity,
            unfilledQuantity: order.unfilledQuantity,
            triggerPrice: order.triggerPrice,
            feeRecipient: order.feeRecipient,
            createdAt: parseInt(order.createdAt, 10),
            updatedAt: parseInt(order.updatedAt, 10),
        };
    }
    static grpcOrdersToOrders(orders) {
        return orders.map((order) => IndexerGrpcSpotTransformer.grpcOrderToOrder(order));
    }
    static grpcOrderHistoryToOrderHistory(orderHistory) {
        return {
            orderHash: orderHistory.orderHash,
            marketId: orderHistory.marketId,
            cid: orderHistory.cid,
            active: orderHistory.isActive,
            subaccountId: orderHistory.subaccountId,
            executionType: orderHistory.executionType,
            orderType: orderHistory.orderType,
            price: orderHistory.price,
            triggerPrice: orderHistory.triggerPrice,
            quantity: orderHistory.quantity,
            filledQuantity: orderHistory.filledQuantity,
            state: orderHistory.state,
            createdAt: parseInt(orderHistory.createdAt, 10),
            updatedAt: parseInt(orderHistory.updatedAt, 10),
            direction: orderHistory.direction,
        };
    }
    static grpcOrderHistoryListToOrderHistoryList(orderHistory) {
        return orderHistory.map((orderHistory) => IndexerGrpcSpotTransformer.grpcOrderHistoryToOrderHistory(orderHistory));
    }
    static grpcTradeToTrade(trade) {
        const price = trade.price;
        const mappedPrice = price
            ? IndexerGrpcSpotTransformer.grpcPriceLevelToPriceLevel(price)
            : zeroPriceLevel();
        return Object.assign({ orderHash: trade.orderHash, subaccountId: trade.subaccountId, marketId: trade.marketId, tradeId: trade.tradeId, executedAt: parseInt(trade.executedAt, 10), feeRecipient: trade.feeRecipient, tradeExecutionType: trade.tradeExecutionType, executionSide: trade.executionSide, tradeDirection: trade.tradeDirection, fee: trade.fee }, mappedPrice);
    }
    static grpcTradesToTrades(trades) {
        return trades.map((trade) => IndexerGrpcSpotTransformer.grpcTradeToTrade(trade));
    }
    static grpcAtomicSwapHistoryListToAtomicSwapHistoryList(response) {
        const swapHistory = response.data;
        const pagination = response.paging;
        return {
            swapHistory: swapHistory.map(IndexerGrpcSpotTransformer.grpcAtomicSwapHistoryToAtomicSwapHistory),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static grpcAtomicSwapHistoryToAtomicSwapHistory(swapHistory) {
        return {
            sender: swapHistory.sender,
            route: swapHistory.route,
            sourceCoin: swapHistory.sourceCoin,
            destinationCoin: swapHistory.destCoin,
            fees: swapHistory.fees,
            contractAddress: swapHistory.contractAddress,
            indexBySender: swapHistory.indexBySender,
            indexBySenderContract: swapHistory.indexBySenderContract,
            txHash: swapHistory.txHash,
            executedAt: parseInt(swapHistory.executedAt, 10),
        };
    }
}
exports.IndexerGrpcSpotTransformer = IndexerGrpcSpotTransformer;
