import { MsgBase } from "../../MsgBase";
import { CosmwasmWasmV1Tx, CosmosBaseV1Beta1Coin } from "@injectivelabs/core-proto-ts";
export declare namespace MsgInstantiateContract {
    interface Params {
        sender: string;
        admin: string;
        codeId: number;
        label: string;
        msg: Object;
        amount?: {
            denom: string;
            amount: string;
        };
    }
    type Proto = CosmwasmWasmV1Tx.MsgInstantiateContract;
}
/**
 * @category Messages
 */
export default class MsgInstantiateContract extends MsgBase<MsgInstantiateContract.Params, MsgInstantiateContract.Proto> {
    static fromJSON(params: MsgInstantiateContract.Params): MsgInstantiateContract;
    toProto(): CosmwasmWasmV1Tx.MsgInstantiateContract;
    toData(): {
        sender: string;
        admin: string;
        codeId: string;
        label: string;
        msg: Uint8Array;
        funds: CosmosBaseV1Beta1Coin.Coin[];
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: CosmwasmWasmV1Tx.MsgInstantiateContract;
    };
    toBinary(): Uint8Array;
}
