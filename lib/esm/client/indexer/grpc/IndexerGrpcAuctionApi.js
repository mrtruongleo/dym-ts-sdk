"use strict";
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
    module = types_1.IndexerModule.Account;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new indexer_proto_ts_1.InjectiveAuctionRpc.InjectiveAuctionRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchAuction(round) {
        const request = indexer_proto_ts_1.InjectiveAuctionRpc.AuctionEndpointRequest.create();
        /**
         * If round is provided, set it on the request,
         * otherwise fetch latest round
         **/
        if (round) {
            request.round = round.toString();
        }
        try {
            const response = await this.retry(() => this.client.AuctionEndpoint(request));
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
    }
    async fetchAuctions() {
        const request = indexer_proto_ts_1.InjectiveAuctionRpc.AuctionsRequest.create();
        try {
            const response = await this.retry(() => this.client.Auctions(request));
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
    }
}
exports.IndexerGrpcAuctionApi = IndexerGrpcAuctionApi;
//# sourceMappingURL=IndexerGrpcAuctionApi.js.map