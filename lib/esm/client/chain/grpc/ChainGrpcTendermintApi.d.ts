import { CosmosBaseTendermintV1Beta1Query } from '@injectivelabs/core-proto-ts';
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer';
/**
 * @category Chain Grpc API
 */
export declare class ChainGrpcTendermintApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: CosmosBaseTendermintV1Beta1Query.ServiceClientImpl;
    constructor(endpoint: string);
    fetchLatestBlock(): Promise<import("@injectivelabs/core-proto-ts/cjs/tendermint/types/block").Block | import("@injectivelabs/core-proto-ts/cjs/cosmos/base/tendermint/v1beta1/types").Block | undefined>;
}
