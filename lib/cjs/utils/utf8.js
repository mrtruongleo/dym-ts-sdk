"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromBase64 = exports.toBase64 = exports.binaryToBase64 = exports.toUtf8 = exports.fromUtf8 = void 0;
function fromUtf8(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return new TextEncoder().encode(str);
}
exports.fromUtf8 = fromUtf8;
function toUtf8(data) {
    if (typeof data === 'string') {
        return data;
    }
    return new TextDecoder('utf-8', { fatal: true }).decode(data);
}
exports.toUtf8 = toUtf8;
function binaryToBase64(data) {
    return typeof data === 'string' ? data : Buffer.from(data).toString('base64');
}
exports.binaryToBase64 = binaryToBase64;
function toBase64(data) {
    return Buffer.from(JSON.stringify(data)).toString('base64');
}
exports.toBase64 = toBase64;
function fromBase64(payload) {
    return JSON.parse(Buffer.from(payload, 'base64').toString());
}
exports.fromBase64 = fromBase64;
//# sourceMappingURL=utf8.js.map