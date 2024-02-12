import { InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { amountToCosmosSdkDecAmount } from "../../../../utils/numbers";
import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
const createMessage = (params) => {
    const message = InjectiveExchangeV1Beta1Tx.MsgInstantSpotMarketLaunch.create();
    message.sender = params.proposer;
    message.quoteDenom = params.market.quoteDenom;
    message.ticker = params.market.ticker;
    message.baseDenom = params.market.baseDenom;
    message.minPriceTickSize = params.market.minPriceTickSize;
    message.minQuantityTickSize = params.market.minQuantityTickSize;
    return InjectiveExchangeV1Beta1Tx.MsgInstantSpotMarketLaunch.fromPartial(message);
};
/**
 * @category Messages
 */
export default class MsgInstantSpotMarketLaunch extends MsgBase {
    static fromJSON(params) {
        return new MsgInstantSpotMarketLaunch(params);
    }
    toProto() {
        const { params: initialParams } = this;
        const params = Object.assign(Object.assign({}, initialParams), { market: Object.assign(Object.assign({}, initialParams.market), { minPriceTickSize: amountToCosmosSdkDecAmount(initialParams.market.minPriceTickSize).toFixed(), minQuantityTickSize: amountToCosmosSdkDecAmount(initialParams.market.minQuantityTickSize).toFixed() }) });
        return createMessage(params);
    }
    toData() {
        const proto = this.toProto();
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgInstantSpotMarketLaunch" }, proto);
    }
    toAmino() {
        const { params } = this;
        const proto = createMessage(params);
        const message = Object.assign({}, snakecaseKeys(proto));
        return {
            type: "exchange/MsgInstantSpotMarketLaunch",
            value: message,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return Object.assign({ "@type": "/injective.exchange.v1beta1.MsgInstantSpotMarketLaunch" }, value);
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.exchange.v1beta1.MsgInstantSpotMarketLaunch",
            message: proto,
        };
    }
    toBinary() {
        return InjectiveExchangeV1Beta1Tx.MsgInstantSpotMarketLaunch.encode(this.toProto()).finish();
    }
}
