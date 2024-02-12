import { ExecArgs } from "../exec-args";
import { MsgBase } from "../../MsgBase";
import { CosmosBaseV1Beta1Coin, CosmwasmWasmV1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgExecuteContract {
    interface Params {
        funds?: {
            denom: string;
            amount: string;
        } | {
            denom: string;
            amount: string;
        }[];
        sender: string;
        contractAddress: string;
        execArgs?: ExecArgs;
        exec?: {
            msg: object;
            action: string;
        };
        /**
         * Same as exec but you don't pass
         * the action as a separate property
         * but as a whole object
         */
        msg?: object;
    }
    type Proto = CosmwasmWasmV1Tx.MsgExecuteContract;
    type Object = Omit<CosmwasmWasmV1Tx.MsgExecuteContract, "msg"> & {
        msg: any;
    };
}
/**
 * @category Messages
 */
export default class MsgExecuteContract extends MsgBase<MsgExecuteContract.Params, MsgExecuteContract.Proto, MsgExecuteContract.Object> {
    static fromJSON(params: MsgExecuteContract.Params): MsgExecuteContract;
    toProto(): CosmwasmWasmV1Tx.MsgExecuteContract;
    toData(): {
        sender: string;
        contract: string;
        msg: Uint8Array;
        funds: CosmosBaseV1Beta1Coin.Coin[];
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: MsgExecuteContract.Object;
    };
    toWeb3(): {
        funds: CosmosBaseV1Beta1Coin.Coin[];
        sender: string;
        contract: string;
        msg: any;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: CosmwasmWasmV1Tx.MsgExecuteContract;
    };
    toBinary(): Uint8Array;
    private getMsgObject;
}
