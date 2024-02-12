import { grpcPaginationToPagination } from '../../../utils/pagination';
/**
 * @category Chain Grpc Transformer
 */
export class ChainGrpcAuthZTransformer {
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
            pagination: grpcPaginationToPagination(response.pagination),
            grants: response.grants.map(ChainGrpcAuthZTransformer.grpcGrantToGrant),
        };
    }
    static grpcGranteeGrantsToGranteeGrants(response) {
        return {
            pagination: grpcPaginationToPagination(response.pagination),
            grants: response.grants.map(ChainGrpcAuthZTransformer.grpcGrantAuthorizationToGrantAuthorization),
        };
    }
    static grpcGranterGrantsToGranterGrants(response) {
        return {
            pagination: grpcPaginationToPagination(response.pagination),
            grants: response.grants.map(ChainGrpcAuthZTransformer.grpcGrantAuthorizationToGrantAuthorization),
        };
    }
}
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
