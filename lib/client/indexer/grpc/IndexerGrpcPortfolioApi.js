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
import { InjectivePortfolioRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
import { IndexerGrpcAccountPortfolioTransformer } from '../transformers';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcAccountPortfolioApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = IndexerModule.Portfolio;
        this.client = new InjectivePortfolioRpc.InjectivePortfolioRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchAccountPortfolio(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectivePortfolioRpc.AccountPortfolioRequest.create();
            request.accountAddress = address;
            try {
                const response = yield this.retry(() => this.client.AccountPortfolio(request));
                return IndexerGrpcAccountPortfolioTransformer.accountPortfolioResponseToAccountPortfolio(response, address);
            }
            catch (e) {
                if ((e === null || e === void 0 ? void 0 : e.message) === 'account address not found') {
                    return {
                        accountAddress: address || '',
                        bankBalancesList: [],
                        subaccountsList: [],
                        positionsWithUpnlList: [],
                    };
                }
                if (e instanceof InjectivePortfolioRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AccountPortfolio',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'AccountPortfolio',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchAccountPortfolioBalances(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectivePortfolioRpc.AccountPortfolioBalancesRequest.create();
            request.accountAddress = address;
            try {
                const response = yield this.retry(() => this.client.AccountPortfolioBalances(request));
                return IndexerGrpcAccountPortfolioTransformer.accountPortfolioBalancesResponseToAccountPortfolioBalances(response, address);
            }
            catch (e) {
                if ((e === null || e === void 0 ? void 0 : e.message) === 'account address not found') {
                    return {
                        accountAddress: address || '',
                        bankBalancesList: [],
                        subaccountsList: [],
                    };
                }
                if (e instanceof InjectivePortfolioRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AccountPortfolio',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'AccountPortfolio',
                    contextModule: this.module,
                });
            }
        });
    }
}
