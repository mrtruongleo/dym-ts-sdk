"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = require("../../utils/grpc");
const GrpcWebImpl_1 = require("./GrpcWebImpl");
/**
 * @hidden
 */
class BaseGrpcWebConsumer extends GrpcWebImpl_1.GrpcWebImpl {
    module = '';
    constructor(endpoint) {
        super(endpoint, {
            transport: (0, grpc_1.getGrpcTransport)(),
            setCookieMetadata: true
        });
    }
    static getGrpcWebImpl = (endpoint) => new BaseGrpcWebConsumer(endpoint);
}
exports.default = BaseGrpcWebConsumer;
//# sourceMappingURL=BaseGrpcWebConsumer.js.map