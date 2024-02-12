"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllWithPagination = exports.grpcPagingToPaging = exports.grpcPaginationToPagination = exports.pageResponseToPagination = exports.paginationUint8ArrayToString = exports.generatePagination = exports.paginationRequestFromPagination = void 0;
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const paginationRequestFromPagination = (pagination) => {
    const paginationForRequest = core_proto_ts_1.CosmosBaseQueryV1Beta1Pagination.PageRequest.create();
    if (!pagination) {
        return;
    }
    if (pagination.key) {
        paginationForRequest.key = Buffer.from(pagination.key, 'base64');
    }
    if (pagination.limit !== undefined) {
        paginationForRequest.limit = pagination.limit.toString();
    }
    if (pagination.offset !== undefined) {
        paginationForRequest.offset = pagination.offset.toString();
    }
    if (pagination.reverse !== undefined) {
        paginationForRequest.reverse = pagination.reverse;
    }
    if (pagination.countTotal !== undefined) {
        paginationForRequest.countTotal = pagination.countTotal;
    }
    return paginationForRequest;
};
exports.paginationRequestFromPagination = paginationRequestFromPagination;
const generatePagination = (pagination) => {
    if (!pagination) {
        return;
    }
    if (!pagination.next) {
        return;
    }
    return {
        pagination: {
            key: pagination.next,
        },
    };
};
exports.generatePagination = generatePagination;
const paginationUint8ArrayToString = (key) => {
    if (!key) {
        return '';
    }
    if (key.constructor !== Uint8Array) {
        return key;
    }
    return Buffer.from(key).toString('base64');
};
exports.paginationUint8ArrayToString = paginationUint8ArrayToString;
const pageResponseToPagination = ({ newPagination, oldPagination, }) => {
    if (!newPagination) {
        return {
            prev: null,
            current: null,
            next: null,
        };
    }
    const next = (0, exports.paginationUint8ArrayToString)(newPagination.next);
    if (!oldPagination) {
        return {
            prev: null,
            current: null,
            next,
        };
    }
    return {
        prev: oldPagination.current,
        current: oldPagination.next,
        next,
    };
};
exports.pageResponseToPagination = pageResponseToPagination;
const grpcPaginationToPagination = (pagination) => {
    return {
        total: pagination
            ? parseInt((0, exports.paginationUint8ArrayToString)(pagination.total), 10)
            : 0,
        next: pagination ? (0, exports.paginationUint8ArrayToString)(pagination.nextKey) : '',
    };
};
exports.grpcPaginationToPagination = grpcPaginationToPagination;
const grpcPagingToPaging = (pagination) => {
    if (!pagination) {
        return {
            to: 0,
            from: 0,
            total: 0,
        };
    }
    return {
        ...pagination,
        to: parseInt(pagination.to.toString() || '0', 10),
        from: parseInt(pagination.from.toString() || '0', 10),
        total: parseInt(pagination.total || '0', 10),
    };
};
exports.grpcPagingToPaging = grpcPagingToPaging;
const fetchAllWithPagination = async (args, method) => {
    let result = [];
    let response = await method(args);
    if (!args) {
        return response;
    }
    const paginationOption = args.pagination;
    if (!paginationOption) {
        return response;
    }
    const keys = Object.keys(response);
    const valueKey = keys.find((key) => key !== 'pagination');
    while (response.pagination.next) {
        result.push(response[valueKey]);
        response = await method({
            ...args,
            pagination: { ...paginationOption, key: response.pagination.next },
        });
    }
    return { [valueKey]: result, pagination: response.pagination };
};
exports.fetchAllWithPagination = fetchAllWithPagination;
//# sourceMappingURL=pagination.js.map