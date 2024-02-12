import { MsgBase } from "../../MsgBase";
import { CosmwasmWasmV1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgUpdateAdmin {
    interface Params {
        sender: string;
        newAdmin: string;
        contract: string;
    }
    type Proto = CosmwasmWasmV1Tx.MsgUpdateAdmin;
}
/**
 * @category Messages
 */
export default class MsgUpdateAdmin extends MsgBase<MsgUpdateAdmin.Params, MsgUpdateAdmin.Proto> {
    static fromJSON(params: MsgUpdateAdmin.Params): MsgUpdateAdmin;
    toProto(): CosmwasmWasmV1Tx.MsgUpdateAdmin;
    toData(): {
        sender: string;
        newAdmin: string;
        contract: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: CosmwasmWasmV1Tx.MsgUpdateAdmin;
    };
    toBinary(): Uint8Array;
}
