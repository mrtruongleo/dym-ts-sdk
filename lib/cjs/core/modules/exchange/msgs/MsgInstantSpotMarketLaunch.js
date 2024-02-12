"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const numbers_1 = require("../../../../utils/numbers");
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const createMessage = (params) => {
    const message = core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgInstantSpotMarketLaunch.create();
    message.sender = params.proposer;
    message.quoteDenom = params.market.quoteDenom;
    message.ticker = params.market.ticker;
    message.baseDenom = params.market.baseDenom;
    message.minPriceTickSize = params.market.minPriceTickSize;
    message.minQuantityTickSize = params.market.minQuantityTickSize;
    return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgInstantSpotMarketLaunch.fromPartial(message);
};
/**
 * @category Messages
 */
class MsgInstantSpotMarketLaunch extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgInstantSpotMarketLaunch(params);
    }
    toProto() {
        const { params: initialParams } = this;
        const params = {
            ...initialParams,
            market: {
                ...initialParams.market,
                minPriceTickSize: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.market.minPriceTickSize).toFixed(),
                minQuantityTickSize: (0, numbers_1.amountToCosmosSdkDecAmount)(initialParams.market.minQuantityTickSize).toFixed(),
            },
        };
        return createMessage(params);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.exchange.v1beta1.MsgInstantSpotMarketLaunch",
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
            type: "exchange/MsgInstantSpotMarketLaunch",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.exchange.v1beta1.MsgInstantSpotMarketLaunch",
            ...value,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgInstantSpotMarketLaunch",
            message: proto,
        };
    }
    toBinary() {
        return core_proto_ts_1.InjectiveExchangeV1Beta1Tx.MsgInstantSpotMarketLaunch.encode(this.toProto()).finish();
    }
}
exports.default = MsgInstantSpotMarketLaunch;
//# sourceMappingURL=MsgInstantSpotMarketLaunch.js.map