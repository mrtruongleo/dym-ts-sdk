import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectivePortfolioRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
import { IndexerGrpcAccountPortfolioTransformer } from '../transformers';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcAccountPortfolioApi extends BaseGrpcConsumer {
    module = IndexerModule.Portfolio;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectivePortfolioRpc.InjectivePortfolioRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchAccountPortfolio(address) {
        const request = InjectivePortfolioRpc.AccountPortfolioRequest.create();
        request.accountAddress = address;
        try {
            const response = await this.retry(() => this.client.AccountPortfolio(request));
            return IndexerGrpcAccountPortfolioTransformer.accountPortfolioResponseToAccountPortfolio(response, address);
        }
        catch (e) {
            if (e?.message === 'account address not found') {
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
    }
    async fetchAccountPortfolioBalances(address) {
        const request = InjectivePortfolioRpc.AccountPortfolioBalancesRequest.create();
        request.accountAddress = address;
        try {
            const response = await this.retry(() => this.client.AccountPortfolioBalances(request));
            return IndexerGrpcAccountPortfolioTransformer.accountPortfolioBalancesResponseToAccountPortfolioBalances(response, address);
        }
        catch (e) {
            if (e?.message === 'account address not found') {
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
    }
}
