import { grpc } from '@injectivelabs/grpc-web';
import { BrowserHeaders } from 'browser-headers';
export class GrpcWebError extends Error {
    constructor(message, code, metadata) {
        super(message);
        this.code = code;
        this.metadata = metadata;
    }
}
export class GrpcWebImpl {
    constructor(host, options) {
        this.host = host;
        this.options = options;
    }
    unary(methodDesc, _request, metadata) {
        var _a, _b;
        const request = Object.assign(Object.assign({}, _request), methodDesc.requestType);
        const actualMetadata = new BrowserHeaders(Object.assign(Object.assign({}, ((metadata === null || metadata === void 0 ? void 0 : metadata.headersMap) || {})), (((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.metadata) === null || _b === void 0 ? void 0 : _b.headersMap) || {})));
        return new Promise((resolve, reject) => {
            grpc.unary(methodDesc, {
                request,
                host: this.host,
                metadata: actualMetadata,
                transport: this.options.transport,
                debug: this.options.debug,
                onEnd: (response) => {
                    if (response.status === grpc.Code.OK) {
                        return resolve(response.message.toObject());
                    }
                    return reject(new GrpcWebError(response.statusMessage, response.status, response.trailers));
                },
            });
        });
    }
}
