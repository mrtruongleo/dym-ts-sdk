"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcWebImpl = exports.GrpcWebError = void 0;
const grpc_web_1 = require("@injectivelabs/grpc-web");
const browser_headers_1 = require("browser-headers");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class GrpcWebError extends Error {
    constructor(message, code, metadata) {
        super(message);
        this.code = code;
        this.metadata = metadata;
    }
}
exports.GrpcWebError = GrpcWebError;
class GrpcWebImpl {
    constructor(host, options) {
        this.host = host;
        this.options = options;
    }
    unary(methodDesc, _request, metadata) {
        var _a, _b;
        const request = Object.assign(Object.assign({}, _request), methodDesc.requestType);
        const metadataWithCookieMetadata = new browser_headers_1.BrowserHeaders(Object.assign(Object.assign({}, ((metadata === null || metadata === void 0 ? void 0 : metadata.headersMap) || {})), (((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.metadata) === null || _b === void 0 ? void 0 : _b.headersMap) || {})));
        return new Promise((resolve, reject) => {
            grpc_web_1.grpc.unary(methodDesc, {
                request,
                host: this.host,
                metadata: metadataWithCookieMetadata,
                transport: this.options.transport,
                debug: this.options.debug,
                onEnd: (response) => {
                    if (response.status === grpc_web_1.grpc.Code.OK) {
                        return resolve(response.message.toObject());
                    }
                    return reject(new GrpcWebError(response.statusMessage, response.status, response.trailers));
                },
            });
        });
    }
    invoke(methodDesc, _request, metadata) {
        var _a, _b;
        const upStreamCodes = this.options.upStreamRetryCodes || [];
        const DEFAULT_TIMEOUT_TIME = 3000;
        const request = Object.assign(Object.assign({}, _request), methodDesc.requestType);
        const actualMetadata = new browser_headers_1.BrowserHeaders(Object.assign(Object.assign({}, ((metadata === null || metadata === void 0 ? void 0 : metadata.headersMap) || {})), (((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.metadata) === null || _b === void 0 ? void 0 : _b.headersMap) || {})));
        return new rxjs_1.Observable((observer) => {
            const upStream = () => {
                const client = grpc_web_1.grpc.invoke(methodDesc, {
                    host: this.host,
                    request,
                    transport: this.options.streamingTransport || this.options.transport,
                    metadata: actualMetadata,
                    debug: this.options.debug,
                    onMessage: (next) => observer.next(next),
                    onEnd: (code, message, trailers) => {
                        if (code === 0) {
                            observer.complete();
                        }
                        else if (upStreamCodes.includes(code)) {
                            setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
                        }
                        else {
                            const err = new Error(message);
                            err.code = code;
                            err.metadata = trailers;
                            observer.error(err);
                        }
                    },
                });
                observer.add(() => client.close());
            };
            upStream();
        }).pipe((0, operators_1.share)());
    }
}
exports.GrpcWebImpl = GrpcWebImpl;
