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
exports.IndexerGrpcAuctionApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcAuctionApi extends BaseIndexerGrpcConsumer_1.default {
    constructor(endpoint) {
        super(endpoint);
        this.module = types_1.IndexerModule.Account;
        this.client = new indexer_proto_ts_1.InjectiveAuctionRpc.InjectiveAuctionRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchAuction(round) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveAuctionRpc.AuctionEndpointRequest.create();
            /**
             * If round is provided, set it on the request,
             * otherwise fetch latest round
             **/
            if (round) {
                request.round = round.toString();
            }
            try {
                const response = yield this.retry(() => this.client.AuctionEndpoint(request));
                return transformers_1.IndexerGrpcAuctionTransformer.auctionResponseToAuction(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveAuctionRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AuctionEndpoint',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'AuctionEndpoint',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchAuctions() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = indexer_proto_ts_1.InjectiveAuctionRpc.AuctionsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Auctions(request));
                return transformers_1.IndexerGrpcAuctionTransformer.auctionsResponseToAuctions(response);
            }
            catch (e) {
                if (e instanceof indexer_proto_ts_1.InjectiveAuctionRpc.GrpcWebError) {
                    throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Auctions',
                        contextModule: this.module,
                    });
                }
                throw new exceptions_1.GrpcUnaryRequestException(e, {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: 'Auctions',
                    contextModule: this.module,
                });
            }
        });
    }
}
exports.IndexerGrpcAuctionApi = IndexerGrpcAuctionApi;
