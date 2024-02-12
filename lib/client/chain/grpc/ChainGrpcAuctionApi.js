import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveAuctionV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcAuctionTransformer } from '../transformers';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcAuctionApi extends BaseGrpcConsumer {
    module = ChainModule.Auction;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveAuctionV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchModuleParams() {
        const request = InjectiveAuctionV1Beta1Query.QueryAuctionParamsRequest.create();
        try {
            const response = await this.retry(() => this.client.AuctionParams(request));
            return ChainGrpcAuctionTransformer.moduleParamsResponseToModuleParams(response);
        }
        catch (e) {
            if (e instanceof InjectiveAuctionV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'AuctionParams',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'AuctionParams',
                contextModule: this.module,
            });
        }
    }
    async fetchModuleState() {
        const request = InjectiveAuctionV1Beta1Query.QueryModuleStateRequest.create();
        try {
            const response = await this.retry(() => this.client.AuctionModuleState(request));
            return ChainGrpcAuctionTransformer.auctionModuleStateResponseToAuctionModuleState(response);
        }
        catch (e) {
            if (e instanceof InjectiveAuctionV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'AuctionModuleState',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'AuctionModuleState',
                contextModule: this.module,
            });
        }
    }
    async fetchCurrentBasket() {
        const request = InjectiveAuctionV1Beta1Query.QueryCurrentAuctionBasketRequest.create();
        try {
            const response = await this.retry(() => this.client.CurrentAuctionBasket(request));
            return ChainGrpcAuctionTransformer.currentBasketResponseToCurrentBasket(response);
        }
        catch (e) {
            if (e instanceof InjectiveAuctionV1Beta1Query.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'CurrentAuctionBasket',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'CurrentAuctionBasket',
                contextModule: this.module,
            });
        }
    }
}
