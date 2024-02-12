import { MsgTransfer as BaseMsgTransferCosmjs } from "cosmjs-types/ibc/applications/transfer/v1/tx";
/**
 * @category Messages
 *
 * @deprecated use MsgTransfer with SIGN_DIRECT and a Cosmos wallet
 */
export default class MsgTransferCosmjs {
    constructor(params) {
        this.params = params;
    }
    static fromJSON(params) {
        return new MsgTransferCosmjs(params);
    }
    toProto() {
        throw new Error("Method not implemented.");
    }
    toData() {
        throw new Error("Method not implemented.");
    }
    toAmino() {
        const { params } = this;
        const transferMsg = {
            typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
            value: BaseMsgTransferCosmjs.fromPartial({
                sourcePort: params.port,
                sourceChannel: params.channelId,
                sender: params.sender,
                receiver: params.receiver,
                token: params.amount,
                timeoutHeight: (params.height
                    ? {
                        revisionHeight: BigInt(params.height.revisionHeight),
                        revisionNumber: BigInt(params.height.revisionNumber),
                    }
                    : undefined),
                timeoutTimestamp: (params.timeout
                    ? BigInt(params.timeout)
                    : undefined),
            }),
        };
        return transferMsg;
    }
    toWeb3() {
        throw new Error("Method not implemented.");
    }
    toDirectSign() {
        throw new Error("Method not implemented.");
    }
}
