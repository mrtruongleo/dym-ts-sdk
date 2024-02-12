import { InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgInstantSpotMarketLaunch {
    interface Params {
        proposer: string;
        market: {
            sender: string;
            ticker: string;
            baseDenom: string;
            quoteDenom: string;
            minPriceTickSize: string;
            minQuantityTickSize: string;
        };
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgInstantSpotMarketLaunch;
}
/**
 * @category Messages
 */
export default class MsgInstantSpotMarketLaunch extends MsgBase<MsgInstantSpotMarketLaunch.Params, MsgInstantSpotMarketLaunch.Proto> {
    static fromJSON(params: MsgInstantSpotMarketLaunch.Params): MsgInstantSpotMarketLaunch;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgInstantSpotMarketLaunch;
    toData(): {
        sender: string;
        ticker: string;
        baseDenom: string;
        quoteDenom: string;
        minPriceTickSize: string;
        minQuantityTickSize: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgInstantSpotMarketLaunch;
    };
    toBinary(): Uint8Array;
}
