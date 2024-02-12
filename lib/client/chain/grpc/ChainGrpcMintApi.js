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
import { CosmosMintV1Beta1Query } from '@injectivelabs/core-proto-ts';
import { cosmosSdkDecToBigNumber, uint8ArrayToString } from '../../../utils';
import { BigNumberInBase } from '@injectivelabs/utils';
import { ChainGrpcMintTransformer } from './../transformers/ChainGrpcMintTransformer';
import { ChainModule } from '../types';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
/**
 * @category Chain Grpc API
 */
export class ChainGrpcMintApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = ChainModule.Mint;
        this.client = new CosmosMintV1Beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchModuleParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosMintV1Beta1Query.QueryParamsRequest.create();
            try {
                const response = yield this.retry(() => this.client.Params(request));
                return ChainGrpcMintTransformer.moduleParamsResponseToModuleParams(response);
            }
            catch (e) {
                if (e instanceof CosmosMintV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Params',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Params',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchInflation() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosMintV1Beta1Query.QueryInflationRequest.create();
            try {
                const response = yield this.retry(() => this.client.Inflation(request));
                return {
                    inflation: cosmosSdkDecToBigNumber(new BigNumberInBase(uint8ArrayToString(response.inflation))).toFixed(),
                };
            }
            catch (e) {
                if (e instanceof CosmosMintV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Inflation',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Inflation',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchAnnualProvisions() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = CosmosMintV1Beta1Query.QueryAnnualProvisionsRequest.create();
            try {
                const response = yield this.retry(() => this.client.AnnualProvisions(request));
                return {
                    annualProvisions: cosmosSdkDecToBigNumber(new BigNumberInBase(uint8ArrayToString(response.annualProvisions))).toFixed(),
                };
            }
            catch (e) {
                if (e instanceof CosmosMintV1Beta1Query.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'AnnualProvisions',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'AnnualProvisions',
                    contextModule: this.module,
                });
            }
        });
    }
}
