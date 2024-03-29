"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcDerivativeTransformer = void 0;
const ts_types_1 = require("@injectivelabs/ts-types");
const utils_1 = require("@injectivelabs/utils");
const pagination_1 = require("../../../utils/pagination");
const token_metadata_1 = require("@injectivelabs/token-metadata");
const zeroPositionDelta = () => ({
    tradeDirection: ts_types_1.TradeDirection.Buy,
    executionPrice: '0',
    executionQuantity: '0',
    executionMargin: '0',
});
/**
 * @category Indexer Grpc Transformer
 */
class IndexerGrpcDerivativeTransformer {
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
    static grpcPerpetualMarketInfoToPerpetualMarketInfo(perpetualMarketInfo) {
        if (!perpetualMarketInfo) {
            return;
        }
        return {
            hourlyFundingRateCap: perpetualMarketInfo.hourlyFundingRateCap,
            hourlyInterestRate: perpetualMarketInfo.hourlyInterestRate,
            nextFundingTimestamp: parseInt(perpetualMarketInfo.nextFundingTimestamp, 10),
            fundingInterval: parseInt(perpetualMarketInfo.fundingInterval, 10),
        };
    }
    static grpcPerpetualMarketFundingToPerpetualMarketFunding(perpetualMarketFunding) {
        if (!perpetualMarketFunding) {
            return;
        }
        return {
            cumulativeFunding: perpetualMarketFunding.cumulativeFunding,
            cumulativePrice: perpetualMarketFunding.cumulativePrice,
            lastTimestamp: parseInt(perpetualMarketFunding.lastTimestamp, 10),
        };
    }
    static grpcExpiryFuturesMarketInfoToExpiryFuturesMarketInfo(expiryFuturesMarketInfo) {
        if (!expiryFuturesMarketInfo) {
            return;
        }
        return {
            expirationTimestamp: parseInt(expiryFuturesMarketInfo.expirationTimestamp, 10),
            settlementPrice: expiryFuturesMarketInfo.settlementPrice,
        };
    }
    static marketResponseToMarket(response) {
        const market = response.market;
        return IndexerGrpcDerivativeTransformer.grpcMarketToMarket(market);
    }
    static marketsResponseToMarkets(response) {
        const markets = response.markets;
        return IndexerGrpcDerivativeTransformer.grpcMarketsToMarkets(markets);
    }
    static ordersResponseToOrders(response) {
        const orders = response.orders;
        const pagination = response.paging;
        return {
            orders: IndexerGrpcDerivativeTransformer.grpcOrdersToOrders(orders),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static orderHistoryResponseToOrderHistory(response) {
        const orderHistory = response.orders;
        const pagination = response.paging;
        return {
            orderHistory: IndexerGrpcDerivativeTransformer.grpcOrderHistoryListToOrderHistoryList(orderHistory),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static positionsResponseToPositions(response) {
        const positions = response.positions;
        const pagination = response.paging;
        return {
            positions: IndexerGrpcDerivativeTransformer.grpcPositionsToPositions(positions),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static positionsV2ResponseToPositionsV2(response) {
        const positions = response.positions;
        const pagination = response.paging;
        return {
            positions: IndexerGrpcDerivativeTransformer.grpcPositionsV2ToPositionsV2(positions),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static tradesResponseToTrades(response) {
        const trades = response.trades;
        const pagination = response.paging;
        return {
            trades: IndexerGrpcDerivativeTransformer.grpcTradesToTrades(trades),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static subaccountTradesListResponseToSubaccountTradesList(response) {
        const tradesList = response.trades;
        return IndexerGrpcDerivativeTransformer.grpcTradesToTrades(tradesList);
    }
    static fundingPaymentsResponseToFundingPayments(response) {
        const fundingPayments = response.payments;
        const pagination = response.paging;
        return {
            fundingPayments: IndexerGrpcDerivativeTransformer.grpcFundingPaymentsToFundingPayments(fundingPayments),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static fundingRatesResponseToFundingRates(response) {
        const fundingRates = response.fundingRates;
        const pagination = response.paging;
        return {
            fundingRates: IndexerGrpcDerivativeTransformer.grpcFundingRatesToFundingRates(fundingRates),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static orderbookV2ResponseToOrderbookV2(response) {
        const orderbook = response.orderbook;
        return IndexerGrpcDerivativeTransformer.grpcOrderbookV2ToOrderbookV2({
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
                orderbook: IndexerGrpcDerivativeTransformer.grpcOrderbookV2ToOrderbookV2({
                    sequence: parseInt(orderbook.sequence, 10),
                    buys: orderbook.buys,
                    sells: orderbook.sells,
                }),
            };
        });
    }
    static binaryOptionsMarketResponseToBinaryOptionsMarket(response) {
        const market = response.market;
        return IndexerGrpcDerivativeTransformer.grpcBinaryOptionsMarketToBinaryOptionsMarket(market);
    }
    static binaryOptionsMarketResponseWithPaginationToBinaryOptionsMarket(response) {
        const markets = response.markets;
        const pagination = response.paging;
        return {
            markets: IndexerGrpcDerivativeTransformer.grpcBinaryOptionsMarketsToBinaryOptionsMarkets(markets),
            pagination: (0, pagination_1.grpcPagingToPaging)(pagination),
        };
    }
    static binaryOptionsMarketsResponseToBinaryOptionsMarkets(response) {
        const markets = response.markets;
        return IndexerGrpcDerivativeTransformer.grpcBinaryOptionsMarketsToBinaryOptionsMarkets(markets);
    }
    static grpcBinaryOptionsMarketToBinaryOptionsMarket(market) {
        return {
            marketId: market.marketId,
            marketStatus: market.marketStatus,
            ticker: market.ticker,
            oracleSymbol: market.oracleSymbol,
            oracleProvider: market.oracleProvider,
            oracleType: market.oracleType,
            oracleScaleFactor: market.oracleScaleFactor,
            expirationTimestamp: parseInt(market.expirationTimestamp, 10),
            settlementTimestamp: parseInt(market.settlementTimestamp, 10),
            quoteDenom: market.quoteDenom,
            quoteToken: IndexerGrpcDerivativeTransformer.grpcTokenMetaToTokenMeta(market.quoteTokenMeta),
            makerFeeRate: market.makerFeeRate,
            takerFeeRate: market.takerFeeRate,
            serviceProviderFee: market.serviceProviderFee,
            minPriceTickSize: market.minPriceTickSize,
            minQuantityTickSize: market.minQuantityTickSize,
            settlementPrice: market.settlementPrice,
        };
    }
    static grpcBinaryOptionsMarketsToBinaryOptionsMarkets(markets) {
        return markets.map(IndexerGrpcDerivativeTransformer.grpcBinaryOptionsMarketToBinaryOptionsMarket);
    }
    static grpcMarketToMarket(market) {
        return {
            oracleBase: market.oracleBase,
            oracleQuote: market.oracleQuote,
            oracleType: market.oracleType,
            oracleScaleFactor: market.oracleScaleFactor,
            initialMarginRatio: market.initialMarginRatio,
            maintenanceMarginRatio: market.maintenanceMarginRatio,
            isPerpetual: market.isPerpetual,
            marketId: market.marketId,
            marketStatus: market.marketStatus,
            ticker: market.ticker,
            quoteDenom: market.quoteDenom,
            quoteToken: IndexerGrpcDerivativeTransformer.grpcTokenMetaToTokenMeta(market.quoteTokenMeta),
            makerFeeRate: market.makerFeeRate,
            takerFeeRate: market.takerFeeRate,
            serviceProviderFee: market.serviceProviderFee,
            minPriceTickSize: new utils_1.BigNumber(market.minPriceTickSize).toNumber(),
            minQuantityTickSize: new utils_1.BigNumber(market.minQuantityTickSize).toNumber(),
            perpetualMarketInfo: IndexerGrpcDerivativeTransformer.grpcPerpetualMarketInfoToPerpetualMarketInfo(market.perpetualMarketInfo),
            perpetualMarketFunding: IndexerGrpcDerivativeTransformer.grpcPerpetualMarketFundingToPerpetualMarketFunding(market.perpetualMarketFunding),
            expiryFuturesMarketInfo: IndexerGrpcDerivativeTransformer.grpcExpiryFuturesMarketInfoToExpiryFuturesMarketInfo(market.expiryFuturesMarketInfo),
        };
    }
    static grpcMarketsToMarkets(markets) {
        return markets.map((market) => IndexerGrpcDerivativeTransformer.grpcMarketToMarket(market));
    }
    static grpcPositionDeltaToPositionDelta(positionDelta) {
        return {
            tradeDirection: positionDelta.tradeDirection,
            executionPrice: positionDelta.executionPrice,
            executionQuantity: positionDelta.executionQuantity,
            executionMargin: positionDelta.executionMargin,
        };
    }
    static grpcPriceLevelToPriceLevel(priceLevel) {
        return {
            price: priceLevel.price,
            quantity: priceLevel.quantity,
            timestamp: parseInt(priceLevel.timestamp, 10),
        };
    }
    static grpcPriceLevelsToPriceLevels(priceLevels) {
        return priceLevels.map((priceLevel) => IndexerGrpcDerivativeTransformer.grpcPriceLevelToPriceLevel(priceLevel));
    }
    static grpcOrderbookToOrderbook({ buys, sells, }) {
        return {
            buys: IndexerGrpcDerivativeTransformer.grpcPriceLevelsToPriceLevels(buys),
            sells: IndexerGrpcDerivativeTransformer.grpcPriceLevelsToPriceLevels(sells),
        };
    }
    static grpcOrderbookV2ToOrderbookV2({ sequence, buys, sells, }) {
        return {
            sequence,
            buys: IndexerGrpcDerivativeTransformer.grpcPriceLevelsToPriceLevels(buys),
            sells: IndexerGrpcDerivativeTransformer.grpcPriceLevelsToPriceLevels(sells),
        };
    }
    static grpcOrderToOrder(order) {
        return {
            orderHash: order.orderHash,
            orderSide: order.orderSide,
            marketId: order.marketId,
            cid: order.cid,
            subaccountId: order.subaccountId,
            isReduceOnly: order.isReduceOnly,
            margin: order.margin,
            price: order.price,
            quantity: order.quantity,
            unfilledQuantity: order.unfilledQuantity,
            triggerPrice: order.triggerPrice,
            feeRecipient: order.feeRecipient,
            state: order.state,
            createdAt: parseInt(order.createdAt, 10),
            updatedAt: parseInt(order.updatedAt, 10),
            orderNumber: parseInt(order.orderNumber, 10),
            triggerAt: parseInt(order.triggerAt, 10),
            orderType: order.orderType,
            isConditional: order.isConditional,
            placedOrderHash: order.placedOrderHash,
            executionType: order.executionType,
        };
    }
    static grpcOrdersToOrders(orders) {
        return orders.map((order) => IndexerGrpcDerivativeTransformer.grpcOrderToOrder(order));
    }
    static grpcOrderHistoryToOrderHistory(orderHistory) {
        return {
            orderHash: orderHistory.orderHash,
            marketId: orderHistory.marketId,
            cid: orderHistory.cid,
            isActive: orderHistory.isActive,
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
            triggerAt: parseInt(orderHistory.triggerAt, 10),
            isReduceOnly: orderHistory.isReduceOnly,
            direction: orderHistory.direction,
            isConditional: orderHistory.isConditional,
            placedOrderHash: orderHistory.placedOrderHash,
            margin: orderHistory.margin,
        };
    }
    static grpcOrderHistoryListToOrderHistoryList(orderHistory) {
        return orderHistory.map((orderHistory) => IndexerGrpcDerivativeTransformer.grpcOrderHistoryToOrderHistory(orderHistory));
    }
    static grpcPositionToPosition(position) {
        return {
            marketId: position.marketId,
            subaccountId: position.subaccountId,
            direction: position.direction,
            quantity: position.quantity,
            entryPrice: position.entryPrice,
            margin: position.margin,
            liquidationPrice: position.liquidationPrice,
            aggregateReduceOnlyQuantity: position.aggregateReduceOnlyQuantity,
            markPrice: position.markPrice,
            ticker: position.ticker,
            updatedAt: parseInt(position.updatedAt, 10),
        };
    }
    static grpcPositionV2ToPositionV2(position) {
        return {
            marketId: position.marketId,
            subaccountId: position.subaccountId,
            direction: position.direction,
            quantity: position.quantity,
            entryPrice: position.entryPrice,
            margin: position.margin,
            denom: position.denom,
            liquidationPrice: position.liquidationPrice,
            markPrice: position.markPrice,
            ticker: position.ticker,
            updatedAt: parseInt(position.updatedAt, 10),
        };
    }
    static grpcPositionsToPositions(positions) {
        return positions.map((position) => IndexerGrpcDerivativeTransformer.grpcPositionToPosition(position));
    }
    static grpcPositionsV2ToPositionsV2(positions) {
        return positions.map((position) => IndexerGrpcDerivativeTransformer.grpcPositionV2ToPositionV2(position));
    }
    static grpcTradeToTrade(trade) {
        const positionDelta = trade.positionDelta;
        const mappedPositionDelta = positionDelta
            ? IndexerGrpcDerivativeTransformer.grpcPositionDeltaToPositionDelta(positionDelta)
            : zeroPositionDelta();
        return Object.assign({ orderHash: trade.orderHash, tradeId: trade.tradeId, subaccountId: trade.subaccountId, marketId: trade.marketId, executedAt: parseInt(trade.executedAt, 10), tradeExecutionType: trade.tradeExecutionType, executionSide: trade.executionSide, fee: trade.fee, feeRecipient: trade.feeRecipient, isLiquidation: trade.isLiquidation, payout: trade.payout }, mappedPositionDelta);
    }
    static grpcTradesToTrades(trades) {
        return trades.map((trade) => IndexerGrpcDerivativeTransformer.grpcTradeToTrade(trade));
    }
    static grpcFundingPaymentToFundingPayment(fundingPayment) {
        return {
            marketId: fundingPayment.marketId,
            subaccountId: fundingPayment.subaccountId,
            amount: fundingPayment.amount,
            timestamp: parseInt(fundingPayment.timestamp, 10),
        };
    }
    static grpcFundingPaymentsToFundingPayments(fundingPayments) {
        return fundingPayments.map(IndexerGrpcDerivativeTransformer.grpcFundingPaymentToFundingPayment);
    }
    static grpcFundingRateToFundingRate(fundingRate) {
        return {
            marketId: fundingRate.marketId,
            rate: fundingRate.rate,
            timestamp: parseInt(fundingRate.timestamp, 10),
        };
    }
    static grpcFundingRatesToFundingRates(fundingRates) {
        return fundingRates.map(IndexerGrpcDerivativeTransformer.grpcFundingRateToFundingRate);
    }
}
exports.IndexerGrpcDerivativeTransformer = IndexerGrpcDerivativeTransformer;
