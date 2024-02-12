import { InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgRewardsOptOut {
    interface Params {
        sender: string;
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgRewardsOptOut;
}
/**
 * @category Messages
 */
export default class MsgRewardsOptOut extends MsgBase<MsgRewardsOptOut.Params, MsgRewardsOptOut.Proto> {
    static fromJSON(params: MsgRewardsOptOut.Params): MsgRewardsOptOut;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgRewardsOptOut;
    toData(): {
        sender: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgRewardsOptOut;
    };
    toBinary(): Uint8Array;
}
