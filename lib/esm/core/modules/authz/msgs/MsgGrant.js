"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MsgBase_1 = require("../../MsgBase");
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const genericAuthorizationType = '/cosmos.authz.v1beta1.GenericAuthorization';
/**
 * @category Messages
 */
class MsgGrant extends MsgBase_1.MsgBase {
    static fromJSON(params) {
        return new MsgGrant(params);
    }
    toProto() {
        const { params } = this;
        const timestamp = this.getTimestamp();
        const genericAuthorization = core_proto_ts_1.CosmosAuthzV1Beta1Authz.GenericAuthorization.create();
        genericAuthorization.msg = params.messageType;
        const authorization = core_proto_ts_1.GoogleProtobufAny.Any.create();
        authorization.typeUrl = genericAuthorizationType;
        authorization.value = Buffer.from(core_proto_ts_1.CosmosAuthzV1Beta1Authz.GenericAuthorization.encode(genericAuthorization).finish());
        const grant = core_proto_ts_1.CosmosAuthzV1Beta1Authz.Grant.create();
        grant.expiration = new Date(Number(timestamp.seconds) * 1000);
        grant.authorization = authorization;
        const message = core_proto_ts_1.CosmosAuthzV1Beta1Tx.MsgGrant.create();
        message.grantee = params.grantee;
        message.granter = params.granter;
        message.grant = grant;
        return core_proto_ts_1.CosmosAuthzV1Beta1Tx.MsgGrant.fromJSON(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            '@type': '/cosmos.authz.v1beta1.MsgGrant',
            ...proto,
        };
    }
    toAmino() {
        const { params } = this;
        const proto = this.toProto();
        const timestamp = this.getTimestamp();
        const message = proto;
        const messageWithAuthorizationType = (0, snakecase_keys_1.default)({
            ...message,
            grant: {
                ...message.grant,
                authorization: {
                    type: 'cosmos-sdk/GenericAuthorization',
                    value: { msg: params.messageType },
                },
                expiration: new Date(Number(timestamp.seconds) * 1000),
            },
        });
        return {
            type: 'cosmos-sdk/MsgGrant',
            value: messageWithAuthorizationType,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: '/cosmos.authz.v1beta1.MsgGrant',
            message: proto,
        };
    }
    toWeb3() {
        const { params } = this;
        const amino = this.toAmino();
        const timestamp = this.getTimestamp();
        const messageWithAuthorizationType = {
            granter: amino.value.granter,
            grantee: amino.value.grantee,
            grant: {
                authorization: {
                    '@type': '/cosmos.authz.v1beta1.GenericAuthorization',
                    msg: params.messageType,
                },
                expiration: new Date(Number(timestamp.seconds) * 1000),
            },
        };
        return {
            '@type': '/cosmos.authz.v1beta1.MsgGrant',
            ...messageWithAuthorizationType,
        };
    }
    getTimestamp() {
        const { params } = this;
        if (params.expiration) {
            const timestamp = core_proto_ts_1.GoogleProtobufTimestamp.Timestamp.create();
            timestamp.seconds = params.expiration.toString();
            return timestamp;
        }
        const defaultExpiryYears = params.expiryInSeconds ? 0 : 5;
        const dateNow = new Date();
        const expiration = new Date(dateNow.getFullYear() + (params.expiryInYears || defaultExpiryYears), dateNow.getMonth(), dateNow.getDate());
        const timestamp = core_proto_ts_1.GoogleProtobufTimestamp.Timestamp.create();
        const timestampInSeconds = (expiration.getTime() / 1000 +
            (params.expiryInSeconds || 0)).toString();
        timestamp.seconds = timestampInSeconds;
        return timestamp;
    }
    toBinary() {
        return core_proto_ts_1.CosmosAuthzV1Beta1Tx.MsgGrant.encode(this.toProto()).finish();
    }
}
exports.default = MsgGrant;
//# sourceMappingURL=MsgGrant.js.map