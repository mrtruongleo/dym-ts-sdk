var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveAuctionRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
import { IndexerGrpcAuctionTransformer } from '../transformers';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcAuctionApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = IndexerModule.Account;
        this.client = new InjectiveAuctionRpc.InjectiveAuctionRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchAuction(round) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveAuctionRpc.AuctionEndpointRequest.create();
            /**
             * If round is provided, set it on the request,
             * otherwise fetch latest round
             **/
            if (round) {
                request.round = round.toString();
            }
            try {
                const response = yield this.retry(() => this.client.AuctionEndpoint(request));
                return IndexerGrpcAuctionTransformer.auctionResponseToAuction(response);
            }
            catch (e) {
                if (e instanceof InjectiveAuctionRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AuctionEndpoint',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'AuctionEndpoint',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchAuctions() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveAuctionRpc.AuctionsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Auctions(request));
                return IndexerGrpcAuctionTransformer.auctionsResponseToAuctions(response);
            }
            catch (e) {
                if (e instanceof InjectiveAuctionRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Auctions',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Auctions',
                    contextModule: this.module,
                });
            }
        });
    }
}
