"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const numbers_1 = require("../../../../utils/numbers");
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
/**
 * @category Messages
 */
class MsgBatchUpdateOrders extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgBatchUpdateOrders(params);
    }
    toProto() {
        const { params } = this;
        const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgBatchUpdateOrders.create();
        message.sender = params.injectiveAddress;
        if (params.spotMarketIdsToCancelAll &&
            params.spotMarketIdsToCancelAll.length > 0) {
            message.spotMarketIdsToCancelAll = params.spotMarketIdsToCancelAll;
            message.subaccountId = params.subaccountId;
        }
        if (params.derivativeMarketIdsToCancelAll &&
            params.derivativeMarketIdsToCancelAll.length > 0) {
            message.derivativeMarketIdsToCancelAll =
                params.derivativeMarketIdsToCancelAll;
            message.subaccountId = params.subaccountId;
        }
        if (params.binaryOptionsMarketIdsToCancelAll &&
            params.binaryOptionsMarketIdsToCancelAll.length > 0) {
            message.binaryOptionsMarketIdsToCancelAll =
                params.binaryOptionsMarketIdsToCancelAll;
            message.subaccountId = params.subaccountId;
        }
        if (params.spotOrdersToCancel && params.spotOrdersToCancel.length > 0) {
            const orderData = params.spotOrdersToCancel.map(({ marketId, subaccountId, orderHash, cid }) => {
                const orderData = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.OrderData.create();
                orderData.marketId = marketId;
                orderData.subaccountId = subaccountId;
                if (orderHash) {
                    orderData.orderHash = orderHash;
                }
                if (cid) {
                    orderData.cid = cid;
                }
                return orderData;
            });
            message.spotOrdersToCancel = orderData;
        }
        if (params.derivativeOrdersToCancel &&
            params.derivativeOrdersToCancel.length > 0) {
            const orderData = params.derivativeOrdersToCancel.map(({ marketId, subaccountId, orderHash, cid }) => {
                const orderData = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.OrderData.create();
                orderData.marketId = marketId;
                orderData.subaccountId = subaccountId;
                if (orderHash) {
                    orderData.orderHash = orderHash;
                }
                if (cid) {
                    orderData.cid = cid;
                }
                return orderData;
            });
            message.derivativeOrdersToCancel = orderData;
        }
        if (params.binaryOptionsOrdersToCancel &&
            params.binaryOptionsOrdersToCancel.length > 0) {
            const orderData = params.binaryOptionsOrdersToCancel.map(({ marketId, subaccountId, orderHash, cid }) => {
                const orderData = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.OrderData.create();
                orderData.marketId = marketId;
                orderData.subaccountId = subaccountId;
                if (orderHash) {
                    orderData.orderHash = orderHash;
                }
                if (cid) {
                    orderData.cid = cid;
                }
                return orderData;
            });
            message.derivativeOrdersToCancel = orderData;
        }
        if (params.spotOrdersToCreate && params.spotOrdersToCreate.length > 0) {
            const orderData = params.spotOrdersToCreate.map((args) => {
                const orderInfo = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderInfo.create();
                const paramsFromArgs = {
                    ...args,
                    price: (0, numbers_1.amountToCosmosSdkDecAmount)(args.price).toFixed(),
                    triggerPrice: (0, numbers_1.amountToCosmosSdkDecAmount)(args.triggerPrice || 0).toFixed(),
                    quantity: (0, numbers_1.amountToCosmosSdkDecAmount)(args.quantity).toFixed(),
                };
                orderInfo.subaccountId = params.subaccountId;
                orderInfo.feeRecipient = paramsFromArgs.feeRecipient;
                orderInfo.price = paramsFromArgs.price;
                orderInfo.quantity = paramsFromArgs.quantity;
                if (paramsFromArgs.cid) {
                    orderInfo.cid = paramsFromArgs.cid;
                }
                const order = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.SpotOrder.create();
                order.marketId = paramsFromArgs.marketId;
                order.orderType = paramsFromArgs.orderType;
                order.orderInfo = orderInfo;
                if (paramsFromArgs.triggerPrice) {
                    order.triggerPrice = paramsFromArgs.triggerPrice;
                }
                return order;
            });
            message.spotOrdersToCreate = orderData;
        }
        if (params.derivativeOrdersToCreate &&
            params.derivativeOrdersToCreate.length > 0) {
            const orderData = params.derivativeOrdersToCreate.map((args) => {
                const paramsFromArgs = {
                    ...args,
                    price: (0, numbers_1.amountToCosmosSdkDecAmount)(args.price).toFixed(),
                    margin: (0, numbers_1.amountToCosmosSdkDecAmount)(args.margin).toFixed(),
                    triggerPrice: (0, numbers_1.amountToCosmosSdkDecAmount)(args.triggerPrice || 0).toFixed(),
                    quantity: (0, numbers_1.amountToCosmosSdkDecAmount)(args.quantity).toFixed(),
                };
                const orderInfo = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderInfo.create();
                orderInfo.subaccountId = params.subaccountId;
                orderInfo.feeRecipient = paramsFromArgs.feeRecipient;
                orderInfo.price = paramsFromArgs.price;
                orderInfo.quantity = paramsFromArgs.quantity;
                if (paramsFromArgs.cid) {
                    orderInfo.cid = paramsFromArgs.cid;
                }
                const order = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.DerivativeOrder.create();
                order.marketId = paramsFromArgs.marketId;
                order.orderType = paramsFromArgs.orderType;
                order.orderInfo = orderInfo;
                order.margin = paramsFromArgs.margin;
                if (paramsFromArgs.triggerPrice) {
                    order.triggerPrice = paramsFromArgs.triggerPrice;
                }
                return order;
            });
            message.derivativeOrdersToCreate = orderData;
        }
        if (params.binaryOptionsOrdersToCreate &&
            params.binaryOptionsOrdersToCreate.length > 0) {
            const orderData = params.binaryOptionsOrdersToCreate.map((args) => {
                const paramsFromArgs = {
                    ...args,
                    price: (0, numbers_1.amountToCosmosSdkDecAmount)(args.price).toFixed(),
                    margin: (0, numbers_1.amountToCosmosSdkDecAmount)(args.margin).toFixed(),
                    triggerPrice: (0, numbers_1.amountToCosmosSdkDecAmount)(args.triggerPrice || 0).toFixed(),
                    quantity: (0, numbers_1.amountToCosmosSdkDecAmount)(args.quantity).toFixed(),
                };
                const orderInfo = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderInfo.create();
                orderInfo.subaccountId = params.subaccountId;
                orderInfo.feeRecipient = paramsFromArgs.feeRecipient;
                orderInfo.price = paramsFromArgs.price;
                orderInfo.quantity = paramsFromArgs.quantity;
                if (paramsFromArgs.cid) {
                    orderInfo.cid = paramsFromArgs.cid;
                }
                const order = core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.DerivativeOrder.create();
                order.marketId = paramsFromArgs.marketId;
                order.orderType = paramsFromArgs.orderType;
                order.orderInfo = orderInfo;
                order.margin = paramsFromArgs.margin;
                if (paramsFromArgs.triggerPrice) {
                    order.triggerPrice = paramsFromArgs.triggerPrice;
                }
                return order;
            });
            message.derivativeOrdersToCreate = orderData;
        }
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgBatchUpdateOrders.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.exchange.v1beta1.MsgBatchUpdateOrders",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "exchange/MsgBatchUpdateOrders",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.exchange.v1beta1.MsgBatchUpdateOrders",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgBatchUpdateOrders",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgBatchUpdateOrders.encode(this.toProto()).finish();
    }
}
exports.default = MsgBatchUpdateOrders;
//# sourceMappingURL=MsgBatchUpdateOrders.js.map