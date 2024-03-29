"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcSpotStream = void 0;
const transformers_1 = require("../transformers");
const BaseIndexerGrpcWebConsumer_1 = require("../../base/BaseIndexerGrpcWebConsumer");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const exceptions_1 = require("@injectivelabs/exceptions");
/**
 * @category Indexer Grpc Stream
 */
class IndexerGrpcSpotStream {
    constructor(endpoint) {
        this.client =
            new indexer_proto_ts_1.InjectiveSpotExchangeRpc.InjectiveSpotExchangeRPCClientImpl((0, BaseIndexerGrpcWebConsumer_1.getGrpcIndexerWebImpl)(endpoint));
    }
    /** @deprecated - use streamSpotOrderbookV2 */
    streamSpotOrderbook(_args) {
        throw new exceptions_1.GeneralException(new Error('deprecated - use streamDerivativeOrderbookV2'));
    }
    streamSpotOrders({ marketId, subaccountId, orderSide, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.StreamOrdersRequest.create();
        if (marketId) {
            request.marketId = marketId;
        }
        if (subaccountId) {
            request.subaccountId = subaccountId;
        }
        if (orderSide) {
            request.orderSide = orderSide;
        }
        const subscription = this.client.StreamOrders(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerSpotStreamTransformer.ordersStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamSpotOrderHistory({ marketId, subaccountId, orderTypes, executionTypes, direction, state, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.StreamOrdersHistoryRequest.create();
        if (subaccountId) {
            request.subaccountId = subaccountId;
        }
        if (marketId) {
            request.marketId = marketId;
        }
        if (orderTypes) {
            request.orderTypes = orderTypes;
        }
        if (direction) {
            request.direction = direction;
        }
        if (state) {
            request.state = state;
        }
        if (executionTypes) {
            request.executionTypes = executionTypes;
        }
        const subscription = this.client.StreamOrdersHistory(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerSpotStreamTransformer.orderHistoryStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamSpotTrades({ marketIds, marketId, subaccountIds, subaccountId, pagination, direction, executionSide, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.StreamTradesRequest.create();
        if (marketIds) {
            request.marketIds = marketIds;
        }
        if (marketId) {
            request.marketId = marketId;
        }
        if (subaccountIds) {
            request.subaccountIds = subaccountIds;
        }
        if (subaccountId) {
            request.subaccountId = subaccountId;
        }
        if (executionSide) {
            request.executionSide = executionSide;
        }
        if (direction) {
            request.direction = direction;
        }
        if (pagination) {
            if (pagination.skip !== undefined) {
                request.skip = pagination.skip.toString();
            }
            if (pagination.limit !== undefined) {
                request.limit = pagination.limit;
            }
        }
        const subscription = this.client.StreamTrades(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerSpotStreamTransformer.tradesStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamSpotMarket({ marketIds, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.StreamMarketsRequest.create();
        if (marketIds) {
            request.marketIds = marketIds;
        }
        const subscription = this.client.StreamMarkets(request).subscribe({
            next(response) {
                callback(response);
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamSpotOrderbookV2({ marketIds, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.StreamOrderbookV2Request.create();
        request.marketIds = marketIds;
        const subscription = this.client.StreamOrderbookV2(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerSpotStreamTransformer.orderbookV2StreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamSpotOrderbookUpdate({ marketIds, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveSpotExchangeRpc.StreamOrderbookUpdateRequest.create();
        request.marketIds = marketIds;
        const subscription = this.client.StreamOrderbookUpdate(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerSpotStreamTransformer.orderbookUpdateStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
}
exports.IndexerGrpcSpotStream = IndexerGrpcSpotStream;
