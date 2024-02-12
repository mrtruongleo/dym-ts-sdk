import { MsgBase } from "../../MsgBase";
import { InjectiveTokenFactoryV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgChangeAdmin {
    interface Params {
        sender: string;
        denom: string;
        newAdmin: string;
    }
    type Proto = InjectiveTokenFactoryV1Beta1Tx.MsgChangeAdmin;
}
/**
 * @category Messages
 */
export default class MsgChangeAdmin extends MsgBase<MsgChangeAdmin.Params, MsgChangeAdmin.Proto> {
    static fromJSON(params: MsgChangeAdmin.Params): MsgChangeAdmin;
    toProto(): InjectiveTokenFactoryV1Beta1Tx.MsgChangeAdmin;
    toData(): {
        sender: string;
        denom: string;
        newAdmin: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveTokenFactoryV1Beta1Tx.MsgChangeAdmin;
    };
    toBinary(): Uint8Array;
}
