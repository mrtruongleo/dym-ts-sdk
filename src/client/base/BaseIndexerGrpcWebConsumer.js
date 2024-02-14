"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGrpcIndexerWebImpl = void 0;
const grpc_1 = require("../../utils/grpc");
const IndexerGrpcWebImpl_1 = require("./IndexerGrpcWebImpl");
/**
 * @hidden
 */
class BaseIndexerGrpcWebConsumer extends IndexerGrpcWebImpl_1.GrpcWebImpl {
    constructor(endpoint) {
        super(endpoint, { transport: (0, grpc_1.getGrpcTransport)() });
        this.module = '';
    }
}
exports.default = BaseIndexerGrpcWebConsumer;
const getGrpcIndexerWebImpl = (endpoint) => new BaseIndexerGrpcWebConsumer(endpoint);
exports.getGrpcIndexerWebImpl = getGrpcIndexerWebImpl;
