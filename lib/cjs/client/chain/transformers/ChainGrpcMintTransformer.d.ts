import { MinModuleParams } from '../types/mint';
import { CosmosMintV1Beta1Query } from '@injectivelabs/core-proto-ts';
/**
 * @category Chain Grpc Transformer
 */
export declare class ChainGrpcMintTransformer {
    static moduleParamsResponseToModuleParams(response: CosmosMintV1Beta1Query.QueryParamsResponse): MinModuleParams;
}
