import { MsgBase } from "../../MsgBase";
import { CosmosBaseV1Beta1Coin, InjectiveInsuranceV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgUnderwrite {
    interface Params {
        marketId: string;
        amount: {
            denom: string;
            amount: string;
        };
        injectiveAddress: string;
    }
    type Proto = InjectiveInsuranceV1Beta1Tx.MsgUnderwrite;
}
/**
 * @category Messages
 */
export default class MsgUnderwrite extends MsgBase<MsgUnderwrite.Params, MsgUnderwrite.Proto> {
    static fromJSON(params: MsgUnderwrite.Params): MsgUnderwrite;
    toProto(): InjectiveInsuranceV1Beta1Tx.MsgUnderwrite;
    toData(): {
        sender: string;
        marketId: string;
        deposit: CosmosBaseV1Beta1Coin.Coin | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveInsuranceV1Beta1Tx.MsgUnderwrite;
    };
    toBinary(): Uint8Array;
}
