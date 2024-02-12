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
import { InjectiveTradingRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcTradingApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = IndexerModule.Trading;
        this.client = new InjectiveTradingRpc.InjectiveTradingRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchGridStrategies({ accountAddress, subaccountId, state, marketId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveTradingRpc.ListTradingStrategiesRequest.create();
            if (accountAddress) {
                request.accountAddress = accountAddress;
            }
            if (subaccountId) {
                request.subaccountId = subaccountId;
            }
            if (state) {
                request.state = state;
            }
            if (marketId) {
                request.marketId = marketId;
            }
            try {
                const response = yield this.retry(() => this.client.ListTradingStrategies(request));
                return response;
            }
            catch (e) {
                if (e instanceof InjectiveTradingRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'GridStrategies',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'GridStrategies',
                    contextModule: this.module,
                });
            }
        });
    }
}
