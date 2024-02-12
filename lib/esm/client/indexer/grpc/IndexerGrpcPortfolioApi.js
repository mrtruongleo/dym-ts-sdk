"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcAccountPortfolioApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcAccountPortfolioApi extends BaseIndexerGrpcConsumer_1.default {
    module = types_1.IndexerModule.Portfolio;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new indexer_proto_ts_1.InjectivePortfolioRpc.InjectivePortfolioRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchAccountPortfolio(address) {
        const request = indexer_proto_ts_1.InjectivePortfolioRpc.AccountPortfolioRequest.create();
        request.accountAddress = address;
        try {
            const response = await this.retry(() => this.client.AccountPortfolio(request));
            return transformers_1.IndexerGrpcAccountPortfolioTransformer.accountPortfolioResponseToAccountPortfolio(response, address);
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
            if (e instanceof indexer_proto_ts_1.InjectivePortfolioRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'AccountPortfolio',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'AccountPortfolio',
                contextModule: this.module,
            });
        }
    }
    async fetchAccountPortfolioBalances(address) {
        const request = indexer_proto_ts_1.InjectivePortfolioRpc.AccountPortfolioBalancesRequest.create();
        request.accountAddress = address;
        try {
            const response = await this.retry(() => this.client.AccountPortfolioBalances(request));
            return transformers_1.IndexerGrpcAccountPortfolioTransformer.accountPortfolioBalancesResponseToAccountPortfolioBalances(response, address);
        }
        catch (e) {
            if (e?.message === 'account address not found') {
                return {
                    accountAddress: address || '',
                    bankBalancesList: [],
                    subaccountsList: [],
                };
            }
            if (e instanceof indexer_proto_ts_1.InjectivePortfolioRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'AccountPortfolio',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'AccountPortfolio',
                contextModule: this.module,
            });
        }
    }
}
exports.IndexerGrpcAccountPortfolioApi = IndexerGrpcAccountPortfolioApi;
//# sourceMappingURL=IndexerGrpcPortfolioApi.js.map