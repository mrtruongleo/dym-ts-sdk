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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcTendermintApi = void 0;
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const exceptions_1 = require("@injectivelabs/exceptions");
/**
 * @category Chain Grpc API
 */
class ChainGrpcTendermintApi extends BaseGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.ChainModule.Tendermint;
        this.client = new core_proto_ts_1.CosmosBaseTendermintV1Beta1Query.ServiceClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchLatestBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.CosmosBaseTendermintV1Beta1Query.GetLatestBlockRequest.create();
            try {
                const response = yield this.retry(() => this.client.GetLatestBlock(request));
                return response.block || response.sdkBlock;
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.CosmosBaseTendermintV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'TendermintApi.fetchLatestBlock',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'TendermintApi.fetchLatestBlock',
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.ChainGrpcTendermintApi = ChainGrpcTendermintApi;
