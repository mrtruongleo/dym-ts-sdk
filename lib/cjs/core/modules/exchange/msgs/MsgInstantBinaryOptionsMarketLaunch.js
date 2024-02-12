"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const numbers_1 = require("../../../../utils/numbers");
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const createMessage = (params) => {
    const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgInstantBinaryOptionsMarketLaunch.create();
    message.sender = params.proposer;
    message.ticker = params.market.ticker;
    message.oracleSymbol = params.market.oracleSymbol;
    message.oracleProvider = params.market.oracleProvider;
    message.oracleType = params.market.oracleType;
    message.oracleScaleFactor = params.market.oracleScaleFactor;
    message.makerFeeRate = params.market.makerFeeRate;
    message.takerFeeRate = params.market.takerFeeRate;
    message.expirationTimestamp = params.market.expirationTimestamp.toString();
    message.settlementTimestamp = params.market.settlementTimestamp.toString();
    message.admin = params.market.admin;
    message.quoteDenom = params.market.quoteDenom;
    message.minPriceTickSize = params.market.minPriceTickSize;
    message.minQuantityTickSize = params.market.minQuantityTickSize;
    return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgInstantBinaryOptionsMarketLaunch.fromPartial(message);
};
/**
 * @category Messages
 */
class MsgInstantBinaryOptionsMarketLaunch extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgInstantBinaryOptionsMarketLaunch(params);
    }
    toProto() {
        const { params: initialParams } = this;
        const params = {
            ...initialParams,
            market: {
                ...initialParams.market,
                minPriceTickSize: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.market.minPriceTickSize).toFixed(),
                makerFeeRate: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.market.makerFeeRate).toFixed(),
                takerFeeRate: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.market.takerFeeRate).toFixed(),
                minQuantityTickSize: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.market.minQuantityTickSize).toFixed(),
            },
        };
        return createMessage(params);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.exchange.v1beta1.MsgInstantBinaryOptionsMarketLaunch",
            ...proto,
        };
    }
    toAmino() {
        const { params } = this;
        const proto = createMessage(params);
        const message = {
            ...(0, snakecase_keys_1.default)(proto),
        };
        return {
            type: "exchange/MsgInstantBinaryOptionsMarketLaunch",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.exchange.v1beta1.MsgInstantBinaryOptionsMarketLaunch",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgInstantBinaryOptionsMarketLaunch",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgInstantBinaryOptionsMarketLaunch.encode(this.toProto()).finish();
    }
}
exports.default = MsgInstantBinaryOptionsMarketLaunch;
//# sourceMappingURL=MsgInstantBinaryOptionsMarketLaunch.js.map