import { MsgBase } from '../../MsgBase';
import { CosmosAuthzV1Beta1Tx, CosmosAuthzV1Beta1Authz } from '@injectivelabs/core-proto-ts';
export declare namespace MsgGrant {
    interface Params {
        messageType: string;
        grantee: string;
        granter: string;
        expiration?: number;
        expiryInYears?: number;
        expiryInSeconds?: number;
    }
    type Proto = CosmosAuthzV1Beta1Tx.MsgGrant;
    type Object = Omit<CosmosAuthzV1Beta1Tx.MsgGrant, 'msgs'> & {
        msgs: any;
    };
}
/**
 * @category Messages
 */
export default class MsgGrant extends MsgBase<MsgGrant.Params, MsgGrant.Proto> {
    static fromJSON(params: MsgGrant.Params): MsgGrant;
    toProto(): CosmosAuthzV1Beta1Tx.MsgGrant;
    toData(): {
        granter: string;
        grantee: string;
        grant: CosmosAuthzV1Beta1Authz.Grant | undefined;
        '@type': string;
    };
    toAmino(): {
        type: string;
        value: MsgGrant.Object;
    };
    toDirectSign(): {
        type: string;
        message: CosmosAuthzV1Beta1Tx.MsgGrant;
    };
    toWeb3(): {
        granter: string;
        grantee: string;
        grant: {
            authorization: {
                '@type': string;
                msg: string;
            };
            expiration: Date;
        };
        '@type': string;
    };
    private getTimestamp;
    toBinary(): Uint8Array;
}
