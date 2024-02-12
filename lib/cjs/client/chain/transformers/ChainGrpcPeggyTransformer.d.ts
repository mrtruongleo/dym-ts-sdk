import { PeggyModuleParams } from '../types/peggy';
import { InjectivePeggyV1Beta1Query } from '@injectivelabs/core-proto-ts';
/**
 * @category Chain Grpc Transformer
 */
export declare class ChainGrpcPeggyTransformer {
    static moduleParamsResponseToModuleParams(response: InjectivePeggyV1Beta1Query.QueryParamsResponse): PeggyModuleParams;
}
