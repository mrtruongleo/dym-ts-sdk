import { InjectiveExplorerRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
/**
 * @category Indexer Grpc API
 */
export declare class IndexerGrpcExplorerApi extends BaseGrpcConsumer {
    protected module: string;
    protected client: InjectiveExplorerRpc.InjectiveExplorerRPCClientImpl;
    constructor(endpoint: string);
    fetchTxByHash(hash: string): Promise<import("../types").Transaction>;
    fetchAccountTx({ address, limit, type, }: {
        address: string;
        limit?: number;
        type?: string;
    }): Promise<{
        txs: import("../types").Transaction[];
        pagination: import("../../..").ExchangePagination;
    }>;
    fetchValidator(validatorAddress: string): Promise<import("../types").ExplorerValidator>;
    fetchValidatorUptime(validatorAddress: string): Promise<import("../types").ValidatorUptime[]>;
    fetchPeggyDepositTxs({ sender, receiver, limit, skip, }: {
        receiver?: string;
        sender?: string;
        limit?: number;
        skip?: number;
    }): Promise<import("../types").PeggyDepositTx[]>;
    fetchPeggyWithdrawalTxs({ sender, receiver, limit, skip, }: {
        sender?: string;
        receiver?: string;
        limit?: number;
        skip?: number;
    }): Promise<import("../types").PeggyWithdrawalTx[]>;
    fetchBlocks({ before, after, limit, }: {
        before?: number;
        after?: number;
        limit?: number;
    }): Promise<InjectiveExplorerRpc.GetBlocksResponse>;
    fetchBlock(id: string): Promise<InjectiveExplorerRpc.GetBlockResponse>;
    fetchTxs({ before, after, limit, skip, type, module, }: {
        before?: number;
        after?: number;
        limit?: number;
        skip?: number;
        type?: string;
        module?: string;
    }): Promise<InjectiveExplorerRpc.GetTxsResponse>;
    fetchIBCTransferTxs({ sender, receiver, srcChannel, srcPort, destChannel, destPort, limit, skip, }: {
        sender?: string;
        receiver?: string;
        srcChannel?: string;
        srcPort?: string;
        destChannel?: string;
        destPort?: string;
        limit?: number;
        skip?: number;
    }): Promise<import("../types").IBCTransferTx[]>;
}
