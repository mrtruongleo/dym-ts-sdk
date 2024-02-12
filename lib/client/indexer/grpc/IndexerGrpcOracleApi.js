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
import { InjectiveOracleRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
import { IndexerGrpcOracleTransformer } from '../transformers/IndexerGrpcOracleTransformer';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcOracleApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = IndexerModule.Oracle;
        this.client = new InjectiveOracleRpc.InjectiveOracleRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchOracleList() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveOracleRpc.OracleListRequest.create();
            try {
                const response = yield this.retry(() => this.client.OracleList(request));
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
        });
    }
    fetchOraclePrice({ baseSymbol, quoteSymbol, oracleScaleFactor, oracleType, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveOracleRpc.PriceRequest.create();
            request.baseSymbol = baseSymbol;
            request.quoteSymbol = quoteSymbol;
            request.oracleType = oracleType;
            if (oracleScaleFactor) {
                request.oracleScaleFactor = oracleScaleFactor;
            }
            try {
                const response = yield this.retry(() => this.client.Price(request));
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
        });
    }
    fetchOraclePriceNoThrow({ baseSymbol, quoteSymbol, oracleScaleFactor, oracleType, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveOracleRpc.PriceRequest.create();
            request.baseSymbol = baseSymbol;
            request.quoteSymbol = quoteSymbol;
            request.oracleType = oracleType;
            if (oracleScaleFactor) {
                request.oracleScaleFactor = oracleScaleFactor;
            }
            try {
                const response = yield this.retry(() => this.client.Price(request));
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
        });
    }
}
