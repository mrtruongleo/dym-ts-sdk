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
import { InjectiveAuctionV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
import { ChainModule } from '../types';
import { ChainGrpcAuctionTransformer } from '../transformers';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcAuctionApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Auction;
        this.client = new InjectiveAuctionV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveAuctionV1Beta1Query.QueryAuctionParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.AuctionParams(request));
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
        });
    }
    fetchModuleState() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveAuctionV1Beta1Query.QueryModuleStateRequest.create();
            try {
                const response = yield this.retry(() => this.client.AuctionModuleState(request));
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
        });
    }
    fetchCurrentBasket() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveAuctionV1Beta1Query.QueryCurrentAuctionBasketRequest.create();
            try {
                const response = yield this.retry(() => this.client.CurrentAuctionBasket(request));
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
        });
    }
}
