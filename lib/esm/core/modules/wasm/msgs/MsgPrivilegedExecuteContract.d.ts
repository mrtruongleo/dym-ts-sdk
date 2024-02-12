import { ExecPrivilegedArgs } from "../exec-args";
import { MsgBase } from "../../MsgBase";
import { InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgPrivilegedExecuteContract {
    interface Params {
        sender: string;
        funds: string;
        contractAddress: string;
        data: ExecPrivilegedArgs;
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgPrivilegedExecuteContract;
}
/**
 * @category Messages
 */
export default class MsgPrivilegedExecuteContract extends MsgBase<MsgPrivilegedExecuteContract.Params, MsgPrivilegedExecuteContract.Proto> {
    static fromJSON(params: MsgPrivilegedExecuteContract.Params): MsgPrivilegedExecuteContract;
    toProto(): MsgPrivilegedExecuteContract.Proto;
    toData(): {
        sender: string;
        funds: string;
        contractAddress: string;
        data: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: InjectiveExchangeV1Beta1Tx.MsgPrivilegedExecuteContract;
    };
    toWeb3(): {
        sender: string;
        funds: string;
        contractAddress: string;
        data: string;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgPrivilegedExecuteContract;
    };
    toBinary(): Uint8Array;
}
