"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcDerivativesStream = void 0;
const transformers_1 = require("../transformers");
const BaseIndexerGrpcWebConsumer_1 = require("../../base/BaseIndexerGrpcWebConsumer");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const exceptions_1 = require("@injectivelabs/exceptions");
/**
 * @category Indexer Grpc Stream
 */
class IndexerGrpcDerivativesStream {
    constructor(endpoint) {
        this.client =
            new indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.InjectiveDerivativeExchangeRPCClientImpl((0, BaseIndexerGrpcWebConsumer_1.getGrpcIndexerWebImpl)(endpoint));
    }
    /** @deprecated - use streamDerivativeOrderbookV2 */
    streamDerivativeOrderbook(_args) {
        throw new exceptions_1.GeneralException(new Error('deprecated - use streamDerivativeOrderbookV2'));
    }
    streamDerivativeOrders({ marketId, subaccountId, orderSide, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.StreamOrdersRequest.create();
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
                callback(transformers_1.IndexerDerivativeStreamTransformer.ordersStreamCallback(response));
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
    streamDerivativeOrderHistory({ subaccountId, marketId, orderTypes, executionTypes, direction, state, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.StreamOrdersHistoryRequest.create();
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
                callback(transformers_1.IndexerDerivativeStreamTransformer.orderHistoryStreamCallback(response));
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
    streamDerivativeTrades({ marketIds, marketId, subaccountIds, subaccountId, callback, pagination, executionSide, direction, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.StreamTradesRequest.create();
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
                callback(transformers_1.IndexerDerivativeStreamTransformer.tradesStreamCallback(response));
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
    streamDerivativePositions({ marketId, subaccountId, callback, address, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.StreamPositionsRequest.create();
        if (marketId) {
            request.marketId = marketId;
        }
        if (address) {
            request.accountAddress = address;
        }
        if (subaccountId) {
            request.subaccountId = subaccountId;
        }
        const subscription = this.client.StreamPositions(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerDerivativeStreamTransformer.positionStreamCallback(response));
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
    streamDerivativeMarket({ marketIds, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.StreamMarketRequest.create();
        if (marketIds && marketIds.length) {
            request.marketIds = marketIds;
        }
        const subscription = this.client.StreamMarket(request).subscribe({
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
    streamDerivativeOrderbookV2({ marketIds, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.StreamOrderbookV2Request.create();
        request.marketIds = marketIds;
        const subscription = this.client.StreamOrderbookV2(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerDerivativeStreamTransformer.orderbookV2StreamCallback(response));
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
    streamDerivativeOrderbookUpdate({ marketIds, callback, onEndCallback, onStatusCallback, }) {
        const request = indexer_proto_ts_1.InjectiveDerivativeExchangeRpc.StreamOrderbookUpdateRequest.create();
        request.marketIds = marketIds;
        const subscription = this.client.StreamOrderbookUpdate(request).subscribe({
            next(response) {
                callback(transformers_1.IndexerDerivativeStreamTransformer.orderbookUpdateStreamCallback(response));
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
exports.IndexerGrpcDerivativesStream = IndexerGrpcDerivativesStream;
