import { MsgBase } from "../../MsgBase";
import { CosmosFeegrantV1Beta1Tx } from "@injectivelabs/core-proto-ts";
export declare namespace MsgRevokeAllowance {
    interface Params {
        granter: string;
        grantee: string;
    }
    type Proto = CosmosFeegrantV1Beta1Tx.MsgRevokeAllowance;
}
/**
 * @category Messages
 */
export default class MsgRevokeAllowance extends MsgBase<MsgRevokeAllowance.Params, MsgRevokeAllowance.Proto> {
    static fromJSON(params: MsgRevokeAllowance.Params): MsgRevokeAllowance;
    toProto(): CosmosFeegrantV1Beta1Tx.MsgRevokeAllowance;
    toData(): {
        granter: string;
        grantee: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: MsgRevokeAllowance;
    };
    toWeb3(): {
        params: MsgRevokeAllowance.Params;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: CosmosFeegrantV1Beta1Tx.MsgRevokeAllowance;
    };
    toBinary(): Uint8Array;
}
