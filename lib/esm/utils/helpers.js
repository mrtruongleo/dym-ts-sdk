"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.sortObjectByKeys = exports.sortObjectByKeysWithReduce = exports.snakeToPascal = exports.toPascalCase = exports.uint8ArrayToString = exports.grpcCoinToUiCoin = exports.protoObjectToJson = exports.objectToJson = exports.isBrowser = exports.isNode = exports.isReactNative = exports.isServerSide = void 0;
const isServerSide = () => typeof window === 'undefined';
exports.isServerSide = isServerSide;
const isReactNative = () => {
    return (typeof document === 'undefined' &&
        typeof navigator !== 'undefined' &&
        navigator.product === 'ReactNative');
};
exports.isReactNative = isReactNative;
const isNode = () => {
    if (typeof window === 'undefined') {
        return true;
    }
    return (typeof process !== 'undefined' &&
        typeof process.versions !== 'undefined' &&
        typeof process.versions.node !== 'undefined');
};
exports.isNode = isNode;
const isBrowser = () => {
    if ((0, exports.isReactNative)()) {
        return false;
    }
    if ((0, exports.isNode)()) {
        return false;
    }
    return typeof window !== 'undefined';
};
exports.isBrowser = isBrowser;
const objectToJson = (object, params) => {
    const { replacer, indentation } = params || { replacer: null, indentation: 2 };
    return JSON.stringify(object, replacer, indentation);
};
exports.objectToJson = objectToJson;
const protoObjectToJson = (object, params) => {
    const { replacer, indentation } = params || { replacer: null, indentation: 2 };
    if (object.toObject !== undefined) {
        return JSON.stringify(object.toObject(), replacer, indentation);
    }
    return (0, exports.objectToJson)(object, { replacer, indentation });
};
exports.protoObjectToJson = protoObjectToJson;
const grpcCoinToUiCoin = (coin) => ({
    amount: coin.amount,
    denom: coin.denom,
});
exports.grpcCoinToUiCoin = grpcCoinToUiCoin;
const uint8ArrayToString = (string) => {
    if (!string) {
        return '';
    }
    if (string.constructor !== Uint8Array) {
        return string;
    }
    return new TextDecoder().decode(string);
};
exports.uint8ArrayToString = uint8ArrayToString;
const toPascalCase = (str) => {
    return `${str}`
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(new RegExp(/\s+(.)(\w*)/, 'g'), (_$1, $2, $3) => `${$2.toUpperCase() + $3}`)
        .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};
exports.toPascalCase = toPascalCase;
const snakeToPascal = (str) => {
    return str
        .split('/')
        .map((snake) => snake
        .split('_')
        .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
        .join(''))
        .join('/');
};
exports.snakeToPascal = snakeToPascal;
const sortObjectByKeysWithReduce = (obj) => {
    if (typeof obj !== 'object' || obj === null)
        return obj;
    if (Array.isArray(obj)) {
        return obj.map((e) => (0, exports.sortObjectByKeysWithReduce)(e)).sort();
    }
    return Object.keys(obj)
        .sort()
        .reduce((sorted, k) => {
        const key = k;
        sorted[key] = (0, exports.sortObjectByKeysWithReduce)(obj[key]);
        return sorted;
    }, {});
};
exports.sortObjectByKeysWithReduce = sortObjectByKeysWithReduce;
const sortObjectByKeys = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(exports.sortObjectByKeys);
    }
    const sortedKeys = Object.keys(obj).sort();
    const result = {};
    sortedKeys.forEach((key) => {
        result[key] = (0, exports.sortObjectByKeys)(obj[key]);
    });
    return result;
};
exports.sortObjectByKeys = sortObjectByKeys;
const getErrorMessage = (error, endpoint) => {
    if (!error.response) {
        return `The request to ${endpoint} has failed.`;
    }
    return error.response.data
        ? error.response.data.message || error.response.data
        : error.response.statusText;
};
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=helpers.js.map