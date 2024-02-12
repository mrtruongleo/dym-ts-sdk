"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcAuthZTransformer = void 0;
const pagination_1 = require("../../../utils/pagination");
/**
 * @category Chain Grpc Transformer
 */
class ChainGrpcAuthZTransformer {
    static grpcGrantToGrant(grant) {
        return {
            authorization: decodeAuthorization(grant.authorization),
            expiration: grant.expiration,
        };
    }
    static grpcGrantAuthorizationToGrantAuthorization(grant) {
        return {
            granter: grant.granter,
            grantee: grant.grantee,
            authorization: decodeAuthorization(grant.authorization),
            expiration: grant.expiration,
        };
    }
    static grpcGrantsToGrants(response) {
        return {
            pagination: (0, pagination_1.grpcPaginationToPagination)(response.pagination),
            grants: response.grants.map(ChainGrpcAuthZTransformer.grpcGrantToGrant),
        };
    }
    static grpcGranteeGrantsToGranteeGrants(response) {
        return {
            pagination: (0, pagination_1.grpcPaginationToPagination)(response.pagination),
            grants: response.grants.map(ChainGrpcAuthZTransformer.grpcGrantAuthorizationToGrantAuthorization),
        };
    }
    static grpcGranterGrantsToGranterGrants(response) {
        return {
            pagination: (0, pagination_1.grpcPaginationToPagination)(response.pagination),
            grants: response.grants.map(ChainGrpcAuthZTransformer.grpcGrantAuthorizationToGrantAuthorization),
        };
    }
}
exports.ChainGrpcAuthZTransformer = ChainGrpcAuthZTransformer;
const decodeAuthorization = (authorization) => {
    if (!authorization) {
        return '';
    }
    switch (authorization.typeUrl) {
        case '/cosmos.authz.v1beta1.GenericAuthorization':
            return Buffer.from(authorization.value).toString('utf-8');
        default:
            return Buffer.from(authorization.value).toString('utf-8');
    }
};
//# sourceMappingURL=ChainGrpcAuthZTransformer.js.map