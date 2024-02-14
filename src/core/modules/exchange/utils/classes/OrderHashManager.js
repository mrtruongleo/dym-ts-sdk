"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHashManager = void 0;
const networks_1 = require("@injectivelabs/networks");
const utils_1 = require("@injectivelabs/utils");
const exceptions_1 = require("@injectivelabs/exceptions");
const Address_1 = require("../../../../accounts/Address");
const ChainGrpcExchangeApi_1 = require("../../../../../client/chain/grpc/ChainGrpcExchangeApi");
const crypto_1 = require("../../../../../utils/crypto");
const numbers_1 = require("../../../../../utils/numbers");
const keccak256_1 = __importDefault(require("keccak256"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const spotOrderPrimaryType = "SpotOrder";
const derivativeOrderPrimaryType = "DerivativeOrder";
const EIP712DomainType = [
    {
        name: "name",
        type: "string",
    },
    {
        name: "version",
        type: "string",
    },
    {
        name: "chainId",
        type: "uint256",
    },
    {
        name: "verifyingContract",
        type: "address",
    },
    {
        name: "salt",
        type: "bytes32",
    },
];
const SpotOrderType = [
    {
        name: "MarketId",
        type: "string",
    },
    {
        name: "OrderInfo",
        type: "OrderInfo",
    },
    {
        name: "Salt",
        type: "string",
    },
    {
        name: "OrderType",
        type: "string",
    },
    {
        name: "TriggerPrice",
        type: "string",
    },
];
const DerivativeOrderType = [
    {
        name: "MarketId",
        type: "string",
    },
    {
        name: "OrderInfo",
        type: "OrderInfo",
    },
    {
        name: "OrderType",
        type: "string",
    },
    {
        name: "Margin",
        type: "string",
    },
    {
        name: "TriggerPrice",
        type: "string",
    },
    {
        name: "Salt",
        type: "string",
    },
];
const OrderInfoType = [
    {
        name: "SubaccountId",
        type: "string",
    },
    {
        name: "FeeRecipient",
        type: "string",
    },
    {
        name: "Price",
        type: "string",
    },
    {
        name: "Quantity",
        type: "string",
    },
];
const EIP712Domain = {
    name: "Injective Protocol",
    version: "2.0.0",
    chainId: `0x${new utils_1.BigNumber(888).toString(16)}`,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
    salt: "0x0000000000000000000000000000000000000000000000000000000000000000",
};
const EIP712Types = {
    EIP712Domain: EIP712DomainType,
    [spotOrderPrimaryType]: SpotOrderType,
    [derivativeOrderPrimaryType]: DerivativeOrderType,
    OrderInfo: OrderInfoType,
};
const orderTypeToChainOrderType = (orderType) => {
    switch (orderType) {
        case core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderType.BUY:
            return "\u0001";
        case core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderType.SELL:
            return "\u0002";
        case core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderType.STOP_BUY:
            return "\u0003";
        case core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderType.STOP_SELL:
            return "\u0004";
        case core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderType.TAKE_BUY:
            return "\u0005";
        case core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderType.TAKE_SELL:
            return "\u0006";
        case core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderType.BUY_PO:
            return "\u0007";
        case core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderType.SELL_PO:
            return "\u0008";
        case core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderType.BUY_ATOMIC:
            return "\u0009";
        case core_proto_ts_1.InjectiveExchangeV1Beta1Exchange.OrderType.SELL_ATOMIC:
            return "\u000A";
        default:
            return "\u0001";
    }
};
const getEip712ForSpotOrder = (spotOrder, nonce) => {
    return {
        primaryType: spotOrderPrimaryType,
        types: EIP712Types,
        domain: EIP712Domain,
        message: {
            MarketId: spotOrder.marketId,
            OrderInfo: {
                SubaccountId: spotOrder.orderInfo.subaccountId,
                FeeRecipient: spotOrder.orderInfo.feeRecipient,
                Price: (0, numbers_1.numberToCosmosSdkDecString)(spotOrder.orderInfo.price),
                Quantity: (0, numbers_1.numberToCosmosSdkDecString)(spotOrder.orderInfo.quantity),
            },
            Salt: nonce.toString(),
            OrderType: orderTypeToChainOrderType(spotOrder.orderType),
            TriggerPrice: spotOrder.triggerPrice
                ? (0, numbers_1.numberToCosmosSdkDecString)(spotOrder.triggerPrice)
                : "0.000000000000000000",
        },
    };
};
const getEip712ForDerivativeOrder = (derivativeOrder, nonce) => {
    return {
        primaryType: derivativeOrderPrimaryType,
        types: EIP712Types,
        domain: EIP712Domain,
        message: {
            MarketId: derivativeOrder.marketId,
            OrderInfo: {
                SubaccountId: derivativeOrder.orderInfo.subaccountId,
                FeeRecipient: derivativeOrder.orderInfo.feeRecipient,
                Price: (0, numbers_1.numberToCosmosSdkDecString)(derivativeOrder.orderInfo.price),
                Quantity: (0, numbers_1.numberToCosmosSdkDecString)(derivativeOrder.orderInfo.quantity),
            },
            Margin: (0, numbers_1.numberToCosmosSdkDecString)(derivativeOrder.margin),
            OrderType: orderTypeToChainOrderType(derivativeOrder.orderType),
            TriggerPrice: derivativeOrder.triggerPrice
                ? (0, numbers_1.numberToCosmosSdkDecString)(derivativeOrder.triggerPrice)
                : "0.000000000000000000",
            Salt: nonce.toString(),
        },
    };
};
class OrderHashManager {
    constructor({ network, address, subaccountIndex = 0 /* default trading account */, }) {
        this.nonce = 0;
        this.network = network;
        this.address = address;
        this.subaccountIndex = subaccountIndex;
    }
    incrementNonce() {
        this.nonce += 1;
    }
    setNonce(nonce) {
        this.nonce = nonce;
    }
    /**
     * Keep in mind that the order params have to be transformed
     * in proper format that's supported on the chain
     */
    getOrderHashes({ spotOrders = [], derivativeOrders = [], }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (spotOrders.length === 0 && derivativeOrders.length === 0) {
                throw new exceptions_1.GeneralException(new Error("Please provide spot or derivative orders"));
            }
            yield this.initSubaccountNonce();
            const spotOrderHashes = spotOrders.map((order) => {
                return this.incrementNonceAndReturn(this.hashTypedData(getEip712ForSpotOrder(order, this.nonce)));
            });
            const derivativeOrderHashes = derivativeOrders.map((order) => {
                return this.incrementNonceAndReturn(this.hashTypedData(getEip712ForDerivativeOrder(order, this.nonce)));
            });
            return {
                spotOrderHashes,
                derivativeOrderHashes,
            };
        });
    }
    /**
     * Keep in mind that the order params have to be transformed
     * in proper format that's supported on the chain
     */
    getDerivativeOrderHashes(orders) {
        return __awaiter(this, void 0, void 0, function* () {
            if (orders.length === 0) {
                throw new exceptions_1.GeneralException(new Error("Please provide orders"));
            }
            yield this.initSubaccountNonce();
            return orders.map((order) => {
                return this.incrementNonceAndReturn(this.hashTypedData(getEip712ForDerivativeOrder(order, this.nonce)));
            });
        });
    }
    /**
     * Keep in mind that the order params have to be transformed
     * in proper format that's supported on the chain
     */
    getSpotOrderHashes(orders) {
        return __awaiter(this, void 0, void 0, function* () {
            if (orders.length === 0) {
                throw new exceptions_1.GeneralException(new Error("Please provide orders"));
            }
            yield this.initSubaccountNonce();
            return orders.map((order) => {
                return this.incrementNonceAndReturn(this.hashTypedData(getEip712ForSpotOrder(order, this.nonce)));
            });
        });
    }
    getSpotOrderHashFromMsg(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initSubaccountNonce();
            const proto = msg.toAmino();
            const order = proto.value.order;
            if (!order) {
                throw new exceptions_1.GeneralException(new Error("The MsgCreateSpotLimitOrder is not complete"));
            }
            const orderInfo = order.orderInfo;
            if (!orderInfo) {
                throw new exceptions_1.GeneralException(new Error("The MsgCreateSpotLimitOrder is not complete"));
            }
            return this.incrementNonceAndReturn(this.hashTypedData(getEip712ForSpotOrder({
                marketId: order.marketId,
                orderInfo: {
                    subaccountId: orderInfo.subaccountId,
                    feeRecipient: orderInfo.feeRecipient,
                    price: orderInfo.price,
                    quantity: orderInfo.quantity,
                },
                orderType: order.orderType,
                triggerPrice: order.triggerPrice,
            }, this.nonce)));
        });
    }
    getDerivativeOrderHashFromMsg(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initSubaccountNonce();
            const proto = msg.toAmino();
            const order = proto.value.order;
            if (!order) {
                throw new exceptions_1.GeneralException(new Error("The MsgCreateDerivativeLimitOrder is not complete"));
            }
            const orderInfo = order.orderInfo;
            if (!orderInfo) {
                throw new exceptions_1.GeneralException(new Error("The MsgCreateDerivativeLimitOrder is not complete"));
            }
            return this.incrementNonceAndReturn(this.hashTypedData(getEip712ForDerivativeOrder({
                marketId: order.marketId,
                orderInfo: {
                    subaccountId: orderInfo.subaccountId,
                    feeRecipient: orderInfo.feeRecipient,
                    price: orderInfo.price,
                    quantity: orderInfo.quantity,
                },
                margin: order.margin,
                orderType: order.orderType,
                triggerPrice: order.triggerPrice,
            }, this.nonce)));
        });
    }
    initSubaccountNonce() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nonce) {
                return this.incrementNonce();
            }
            const { network, subaccountIndex, address } = this;
            const endpoints = (0, networks_1.getNetworkEndpoints)(network);
            const chainGrpcExchangeApi = new ChainGrpcExchangeApi_1.ChainGrpcExchangeApi(endpoints.grpc);
            const subaccountId = Address_1.Address.fromBech32(address).getSubaccountId(subaccountIndex);
            const { nonce } = yield chainGrpcExchangeApi.fetchSubaccountTradeNonce(subaccountId);
            this.nonce = nonce + 1;
        });
    }
    hashTypedData(eip712) {
        const bytesToHash = Buffer.concat([
            Buffer.from("19", "hex"),
            Buffer.from("01", "hex"),
            (0, crypto_1.domainHash)(eip712),
            (0, crypto_1.messageHash)(eip712),
        ]);
        try {
            return `0x${Buffer.from((0, keccak256_1.default)(bytesToHash)).toString("hex")}`;
        }
        catch (e) {
            return "";
        }
    }
    incrementNonceAndReturn(result) {
        this.incrementNonce();
        return result;
    }
}
exports.OrderHashManager = OrderHashManager;
