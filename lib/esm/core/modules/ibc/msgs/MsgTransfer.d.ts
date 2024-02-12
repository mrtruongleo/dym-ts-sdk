import { MsgBase } from "../../MsgBase";
import { CosmosBaseV1Beta1Coin, IbcApplicationsTransferV1Tx, IbcCoreClientV1Client } from "@injectivelabs/core-proto-ts";
export declare namespace MsgTransfer {
    interface Params {
        amount: {
            denom: string;
            amount: string;
        };
        memo?: string;
        sender: string;
        port: string;
        receiver: string;
        channelId: string;
        timeout?: number;
        height?: {
            revisionHeight: number;
            revisionNumber: number;
        };
    }
    type Proto = IbcApplicationsTransferV1Tx.MsgTransfer;
}
/**
 * @category Messages
 */
export default class MsgTransfer extends MsgBase<MsgTransfer.Params, MsgTransfer.Proto> {
    static fromJSON(params: MsgTransfer.Params): MsgTransfer;
    toProto(): IbcApplicationsTransferV1Tx.MsgTransfer;
    toData(): {
        sourcePort: string;
        sourceChannel: string;
        token: CosmosBaseV1Beta1Coin.Coin | undefined;
        sender: string;
        receiver: string;
        timeoutHeight: IbcCoreClientV1Client.Height | undefined;
        timeoutTimestamp: string;
        memo: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: IbcApplicationsTransferV1Tx.MsgTransfer;
    };
    toWeb3(): {
        sourcePort: string;
        sourceChannel: string;
        token: CosmosBaseV1Beta1Coin.Coin | undefined;
        sender: string;
        receiver: string;
        timeoutHeight: IbcCoreClientV1Client.Height | undefined;
        timeoutTimestamp: string;
        memo: string;
        "@type": string;
    };
    toDirectSign(): {
        type: string;
        message: IbcApplicationsTransferV1Tx.MsgTransfer;
    };
    toBinary(): Uint8Array;
}
