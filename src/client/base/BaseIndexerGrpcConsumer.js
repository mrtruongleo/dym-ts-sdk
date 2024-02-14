"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = require("../../utils/grpc");
const IndexerGrpcWebImpl_1 = require("./IndexerGrpcWebImpl");
class BaseIndexerGrpcConsumer extends IndexerGrpcWebImpl_1.GrpcWebImpl {
    constructor(endpoint) {
        super(endpoint, {
            transport: (0, grpc_1.getGrpcTransport)(),
        });
        this.module = '';
    }
    getGrpcWebImpl(endpoint) {
        return new BaseIndexerGrpcConsumer(endpoint);
    }
    retry(grpcCall, retries = 3, delay = 1000) {
        const retryGrpcCall = (attempt = 1) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield grpcCall();
            }
            catch (e) {
                if (attempt >= retries) {
                    throw e;
                }
                return new Promise((resolve) => setTimeout(() => resolve(retryGrpcCall(attempt + 1)), delay * attempt));
            }
        });
        return retryGrpcCall();
    }
}
exports.default = BaseIndexerGrpcConsumer;
