import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveAuctionRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
import { IndexerGrpcAuctionTransformer } from '../transformers';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcAuctionApi extends BaseGrpcConsumer {
    module = IndexerModule.Account;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveAuctionRpc.InjectiveAuctionRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchAuction(round) {
        const request = InjectiveAuctionRpc.AuctionEndpointRequest.create();
        /**
         * If round is provided, set it on the request,
         * otherwise fetch latest round
         **/
        if (round) {
            request.round = round.toString();
        }
        try {
            const response = await this.retry(() => this.client.AuctionEndpoint(request));
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
    }
    async fetchAuctions() {
        const request = InjectiveAuctionRpc.AuctionsRequest.create();
        try {
            const response = await this.retry(() => this.client.Auctions(request));
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
    }
}
