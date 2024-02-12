import { MsgBase } from "../../MsgBase";
import { InjectiveTokenFactoryV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { CosmosBankV1Beta1Bank } from "@injectivelabs/core-proto-ts";
export declare namespace MsgSetDenomMetadata {
    interface Params {
        sender: string;
        metadata: CosmosBankV1Beta1Bank.Metadata;
    }
    type Proto = InjectiveTokenFactoryV1Beta1Tx.MsgSetDenomMetadata;
}
/**
 * @category Messages
 */
export default class MsgSetDenomMetadata extends MsgBase<MsgSetDenomMetadata.Params, MsgSetDenomMetadata.Proto> {
    static fromJSON(params: MsgSetDenomMetadata.Params): MsgSetDenomMetadata;
    toProto(): InjectiveTokenFactoryV1Beta1Tx.MsgSetDenomMetadata;
    toData(): {
        sender: string;
        metadata: CosmosBankV1Beta1Bank.Metadata | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveTokenFactoryV1Beta1Tx.MsgSetDenomMetadata;
    };
    toBinary(): Uint8Array;
}
