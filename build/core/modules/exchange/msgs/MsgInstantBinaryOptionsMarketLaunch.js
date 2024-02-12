import { amountToCosmosSdkDecAmount } from "../../../../utils/numbers";
import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { InjectiveExchangeV1Beta1Tx, } from "@injectivelabs/core-proto-ts";
const createMessage = (params) => {
    const message = InjectiveExchangeV1Beta1Tx.MsgInstantBinaryOptionsMarketLaunch.create();
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
    return InjectiveExchangeV1Beta1Tx.MsgInstantBinaryOptionsMarketLaunch.fromPartial(message);
};
/**
 * @category Messages
 */
export default class MsgInstantBinaryOptionsMarketLaunch extends MsgBase {
    static fromJSON(params) {
        return new MsgInstantBinaryOptionsMarketLaunch(params);
    }
    toProto() {
        const { params: initialParams } = this;
        const params = {
            ...initialParams,
            market: {
                ...initialParams.market,
                minPriceTickSize: amountToCosmosSdkDecAmount(initialParams.market.minPriceTickSize).toFixed(),
                makerFeeRate: amountToCosmosSdkDecAmount(initialParams.market.makerFeeRate).toFixed(),
                takerFeeRate: amountToCosmosSdkDecAmount(initialParams.market.takerFeeRate).toFixed(),
                minQuantityTickSize: amountToCosmosSdkDecAmount(initialParams.market.minQuantityTickSize).toFixed(),
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
            ...snakecaseKeys(proto),
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
        return InjectiveExchangeV1Beta1Tx.MsgInstantBinaryOptionsMarketLaunch.encode(this.toProto()).finish();
    }
}
