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
exports.ChainGrpcAuctionApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
/**
 * @category Chain Grpc API
 */
class ChainGrpcAuctionApi extends BaseGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.ChainModule.Auction;
        this.client = new core_proto_ts_1.InjectiveAuctionV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveAuctionV1Beta1Query.QueryAuctionParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.AuctionParams(request));
                return transformers_1.ChainGrpcAuctionTransformer.moduleParamsResponseToModuleParams(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveAuctionV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AuctionParams',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'AuctionParams',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchModuleState() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveAuctionV1Beta1Query.QueryModuleStateRequest.create();
            try {
                const response = yield this.retry(() => this.client.AuctionModuleState(request));
                return transformers_1.ChainGrpcAuctionTransformer.auctionModuleStateResponseToAuctionModuleState(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveAuctionV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AuctionModuleState',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'AuctionModuleState',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchCurrentBasket() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = core_proto_ts_1.InjectiveAuctionV1Beta1Query.QueryCurrentAuctionBasketRequest.create();
            try {
                const response = yield this.retry(() => this.client.CurrentAuctionBasket(request));
                return transformers_1.ChainGrpcAuctionTransformer.currentBasketResponseToCurrentBasket(response);
            }
            catch (e) {
                if (e instanceof core_proto_ts_1.InjectiveAuctionV1Beta1Query.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'CurrentAuctionBasket',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'CurrentAuctionBasket',
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.ChainGrpcAuctionApi = ChainGrpcAuctionApi;
