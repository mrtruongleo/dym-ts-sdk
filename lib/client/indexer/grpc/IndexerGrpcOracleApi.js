import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveOracleRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
import { IndexerGrpcOracleTransformer } from '../transformers/IndexerGrpcOracleTransformer';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcOracleApi extends BaseGrpcConsumer {
    module = IndexerModule.Oracle;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveOracleRpc.InjectiveOracleRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchOracleList() {
        const request = InjectiveOracleRpc.OracleListRequest.create();
        try {
            const response = await this.retry(() => this.client.OracleList(request));
            return IndexerGrpcOracleTransformer.oraclesResponseToOracles(response);
        }
        catch (e) {
            if (e instanceof InjectiveOracleRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'OracleList',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'OracleList',
                contextModule: this.module,
            });
        }
    }
    async fetchOraclePrice({ baseSymbol, quoteSymbol, oracleScaleFactor, oracleType, }) {
        const request = InjectiveOracleRpc.PriceRequest.create();
        request.baseSymbol = baseSymbol;
        request.quoteSymbol = quoteSymbol;
        request.oracleType = oracleType;
        if (oracleScaleFactor) {
            request.oracleScaleFactor = oracleScaleFactor;
        }
        try {
            const response = await this.retry(() => this.client.Price(request));
            return response;
        }
        catch (e) {
            if (e instanceof InjectiveOracleRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Price',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'Price',
                contextModule: this.module,
            });
        }
    }
    async fetchOraclePriceNoThrow({ baseSymbol, quoteSymbol, oracleScaleFactor, oracleType, }) {
        const request = InjectiveOracleRpc.PriceRequest.create();
        request.baseSymbol = baseSymbol;
        request.quoteSymbol = quoteSymbol;
        request.oracleType = oracleType;
        if (oracleScaleFactor) {
            request.oracleScaleFactor = oracleScaleFactor;
        }
        try {
            const response = await this.retry(() => this.client.Price(request));
            return response;
        }
        catch (e) {
            if (e.message.includes('object not found')) {
                return {
                    price: '0',
                };
            }
            if (e instanceof InjectiveOracleRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Price',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'Price',
                contextModule: this.module,
            });
        }
    }
}
