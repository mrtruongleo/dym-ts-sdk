import { InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgReclaimLockedFunds {
    interface Params {
        sender: string;
        lockedAccountPubKey: string;
        signature: Uint8Array;
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgReclaimLockedFunds;
}
/**
 * @category Messages
 */
export default class MsgReclaimLockedFunds extends MsgBase<MsgReclaimLockedFunds.Params, MsgReclaimLockedFunds.Proto> {
    static fromJSON(params: MsgReclaimLockedFunds.Params): MsgReclaimLockedFunds;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgReclaimLockedFunds;
    toData(): {
        sender: string;
        lockedAccountPubKey: Uint8Array;
        signature: Uint8Array;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: {
            sender: any;
            locked_account_pub_key: any;
            signature: any;
        };
    };
    toWeb3(): {
        sender: any;
        locked_account_pub_key: any;
        signature: any;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgReclaimLockedFunds;
    };
    toBinary(): Uint8Array;
}
