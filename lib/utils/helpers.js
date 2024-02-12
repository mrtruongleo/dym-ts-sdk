export const isServerSide = () => typeof window === 'undefined';
export const isReactNative = () => {
    return (typeof document === 'undefined' &&
        typeof navigator !== 'undefined' &&
        navigator.product === 'ReactNative');
};
export const isNode = () => {
    if (typeof window === 'undefined') {
        return true;
    }
    return (typeof process !== 'undefined' &&
        typeof process.versions !== 'undefined' &&
        typeof process.versions.node !== 'undefined');
};
export const isBrowser = () => {
    if (isReactNative()) {
        return false;
    }
    if (isNode()) {
        return false;
    }
    return typeof window !== 'undefined';
};
export const objectToJson = (object, params) => {
    const { replacer, indentation } = params || { replacer: null, indentation: 2 };
    return JSON.stringify(object, replacer, indentation);
};
export const protoObjectToJson = (object, params) => {
    const { replacer, indentation } = params || { replacer: null, indentation: 2 };
    if (object.toObject !== undefined) {
        return JSON.stringify(object.toObject(), replacer, indentation);
    }
    return objectToJson(object, { replacer, indentation });
};
export const grpcCoinToUiCoin = (coin) => ({
    amount: coin.amount,
    denom: coin.denom,
});
export const uint8ArrayToString = (string) => {
    if (!string) {
        return '';
    }
    if (string.constructor !== Uint8Array) {
        return string;
    }
    return new TextDecoder().decode(string);
};
export const toPascalCase = (str) => {
    return `${str}`
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(new RegExp(/\s+(.)(\w*)/, 'g'), (_$1, $2, $3) => `${$2.toUpperCase() + $3}`)
        .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};
export const snakeToPascal = (str) => {
    return str
        .split('/')
        .map((snake) => snake
        .split('_')
        .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
        .join(''))
        .join('/');
};
export const sortObjectByKeysWithReduce = (obj) => {
    if (typeof obj !== 'object' || obj === null)
        return obj;
    if (Array.isArray(obj)) {
        return obj.map((e) => sortObjectByKeysWithReduce(e)).sort();
    }
    return Object.keys(obj)
        .sort()
        .reduce((sorted, k) => {
        const key = k;
        sorted[key] = sortObjectByKeysWithReduce(obj[key]);
        return sorted;
    }, {});
};
export const sortObjectByKeys = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(sortObjectByKeys);
    }
    const sortedKeys = Object.keys(obj).sort();
    const result = {};
    sortedKeys.forEach((key) => {
        result[key] = sortObjectByKeys(obj[key]);
    });
    return result;
};
export const getErrorMessage = (error, endpoint) => {
    if (!error.response) {
        return `The request to ${endpoint} has failed.`;
    }
    return error.response.data
        ? error.response.data.message || error.response.data
        : error.response.statusText;
};
