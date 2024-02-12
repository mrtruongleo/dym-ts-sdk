import { CosmosBaseQueryV1Beta1Pagination } from '@injectivelabs/core-proto-ts';
export const paginationRequestFromPagination = (pagination) => {
    const paginationForRequest = CosmosBaseQueryV1Beta1Pagination.PageRequest.create();
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
export const generatePagination = (pagination) => {
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
export const paginationUint8ArrayToString = (key) => {
    if (!key) {
        return '';
    }
    if (key.constructor !== Uint8Array) {
        return key;
    }
    return Buffer.from(key).toString('base64');
};
export const pageResponseToPagination = ({ newPagination, oldPagination, }) => {
    if (!newPagination) {
        return {
            prev: null,
            current: null,
            next: null,
        };
    }
    const next = paginationUint8ArrayToString(newPagination.next);
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
export const grpcPaginationToPagination = (pagination) => {
    return {
        total: pagination
            ? parseInt(paginationUint8ArrayToString(pagination.total), 10)
            : 0,
        next: pagination ? paginationUint8ArrayToString(pagination.nextKey) : '',
    };
};
export const grpcPagingToPaging = (pagination) => {
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
export const fetchAllWithPagination = async (args, method) => {
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
