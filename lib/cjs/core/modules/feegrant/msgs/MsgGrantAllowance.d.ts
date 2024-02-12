import { MsgBase } from '../../MsgBase';
import { CosmosFeegrantV1Beta1Tx, GoogleProtobufAny } from '@injectivelabs/core-proto-ts';
import { Coin } from '@injectivelabs/ts-types';
export declare namespace MsgGrantAllowance {
    interface Params {
        granter: string;
        grantee: string;
        allowance: {
            spendLimit: Coin[];
            expiration: number | undefined;
        };
    }
    type Proto = CosmosFeegrantV1Beta1Tx.MsgGrantAllowance;
    type Object = Omit<CosmosFeegrantV1Beta1Tx.MsgGrantAllowance, 'allowance'> & {
        allowance: any;
    };
}
/**
 * @category Messages
 */
export default class MsgGrantAllowance extends MsgBase<MsgGrantAllowance.Params, MsgGrantAllowance.Proto> {
    static fromJSON(params: MsgGrantAllowance.Params): MsgGrantAllowance;
    toProto(): CosmosFeegrantV1Beta1Tx.MsgGrantAllowance;
    toData(): {
        granter: string;
        grantee: string;
        allowance: GoogleProtobufAny.Any | undefined;
        '@type': string;
    };
    toAmino(): {
        type: string;
        value: MsgGrantAllowance.Object;
    };
    toDirectSign(): {
        type: string;
        message: CosmosFeegrantV1Beta1Tx.MsgGrantAllowance;
    };
    toWeb3(): {
        granter: string;
        grantee: string;
        allowance: {
            '@type': string;
            spendLimit: Coin[];
            expiration: Date;
        };
        '@type': string;
    };
    private getTimestamp;
    toBinary(): Uint8Array;
}
