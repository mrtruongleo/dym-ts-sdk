import { MsgBase } from "../../MsgBase";
import type { Msgs } from "../../msgs";
import { CosmosAuthzV1Beta1Tx, GoogleProtobufAny } from "@injectivelabs/core-proto-ts";
export declare namespace MsgExec {
    interface Params {
        grantee: string;
        msgs: Msgs | Msgs[];
    }
    type Proto = CosmosAuthzV1Beta1Tx.MsgExec;
    type Object = Omit<CosmosAuthzV1Beta1Tx.MsgExec, "msgs"> & {
        msgs: any;
    };
}
/**
 * @category Messages
 */
export default class MsgExec extends MsgBase<MsgExec.Params, MsgExec.Proto, MsgExec.Object> {
    static fromJSON(params: MsgExec.Params): MsgExec;
    toProto(): CosmosAuthzV1Beta1Tx.MsgExec;
    toData(): {
        grantee: string;
        msgs: GoogleProtobufAny.Any[];
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: MsgExec.Object;
    };
    toWeb3(): {
        "@type": string;
        grantee: string;
        msgs: any[];
    };
    toDirectSign(): {
        type: string;
        message: CosmosAuthzV1Beta1Tx.MsgExec;
    };
    toBinary(): Uint8Array;
}
