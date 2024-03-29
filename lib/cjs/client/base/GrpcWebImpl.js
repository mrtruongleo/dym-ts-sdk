"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcWebImpl = exports.GrpcWebError = void 0;
const grpc_web_1 = require("@injectivelabs/grpc-web");
const browser_headers_1 = require("browser-headers");
class GrpcWebError extends Error {
    code;
    metadata;
    constructor(message, code, metadata) {
        super(message);
        this.code = code;
        this.metadata = metadata;
    }
}
exports.GrpcWebError = GrpcWebError;
class GrpcWebImpl {
    host;
    options;
    constructor(host, options) {
        this.host = host;
        this.options = options;
    }
    unary(methodDesc, _request, metadata) {
        const request = { ..._request, ...methodDesc.requestType };
        const actualMetadata = new browser_headers_1.BrowserHeaders({
            ...(metadata?.headersMap || {}),
            ...(this.options?.metadata?.headersMap || {}),
        });
        return new Promise((resolve, reject) => {
            grpc_web_1.grpc.unary(methodDesc, {
                request,
                host: this.host,
                metadata: actualMetadata,
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
}
exports.GrpcWebImpl = GrpcWebImpl;
//# sourceMappingURL=GrpcWebImpl.js.map