"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = require("../../utils/grpc");
const GrpcWebImpl_1 = require("./GrpcWebImpl");
class BaseGrpcConsumer extends GrpcWebImpl_1.GrpcWebImpl {
    module = '';
    constructor(endpoint) {
        super(endpoint, {
            transport: (0, grpc_1.getGrpcTransport)(),
        });
    }
    getGrpcWebImpl(endpoint) {
        return new BaseGrpcConsumer(endpoint);
    }
    retry(grpcCall, retries = 3, delay = 1000) {
        const retryGrpcCall = async (attempt = 1) => {
            try {
                return await grpcCall();
            }
            catch (e) {
                if (attempt >= retries) {
                    throw e;
                }
                return new Promise((resolve) => setTimeout(() => resolve(retryGrpcCall(attempt + 1)), delay * attempt));
            }
        };
        return retryGrpcCall();
    }
}
exports.default = BaseGrpcConsumer;
//# sourceMappingURL=BaseGrpcConsumer.js.map