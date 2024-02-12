import { ExecArgs } from "../exec-args";
import { MsgBase } from "../../MsgBase";
import { InjectiveWasmxV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgExecuteContractCompat {
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
            msg: Record<string, any>;
            action: string;
        };
        /**
         * Same as exec but you don't pass
         * the action as a separate property
         * but as a whole object
         * example:
            msg: {
              reset: {
                count: 10
              },
            },
         */
        msg?: Record<string, any>;
    }
    type Proto = InjectiveWasmxV1Beta1Tx.MsgExecuteContractCompat;
    type Object = Omit<InjectiveWasmxV1Beta1Tx.MsgExecuteContractCompat, "msg"> & {
        msg: string;
    };
}
/**
 * @category Messages
 */
export default class MsgExecuteContractCompat extends MsgBase<MsgExecuteContractCompat.Params, MsgExecuteContractCompat.Proto, MsgExecuteContractCompat.Object> {
    static fromJSON(params: MsgExecuteContractCompat.Params): MsgExecuteContractCompat;
    toProto(): InjectiveWasmxV1Beta1Tx.MsgExecuteContractCompat;
    toData(): {
        sender: string;
        contract: string;
        msg: string;
        funds: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveWasmxV1Beta1Tx.MsgExecuteContractCompat;
    };
    toBinary(): Uint8Array;
    private getMsgObject;
}
