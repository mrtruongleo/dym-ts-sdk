import { CosmosBaseV1Beta1Coin, InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgWithdraw {
    interface Params {
        subaccountId: string;
        injectiveAddress: string;
        amount: {
            amount: string;
            denom: string;
        };
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgWithdraw;
}
/**
 * @category Messages
 */
export default class MsgWithdraw extends MsgBase<MsgWithdraw.Params, MsgWithdraw.Proto> {
    static fromJSON(params: MsgWithdraw.Params): MsgWithdraw;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgWithdraw;
    toData(): {
        sender: string;
        subaccountId: string;
        amount: CosmosBaseV1Beta1Coin.Coin | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgWithdraw;
    };
    toBinary(): Uint8Array;
}
