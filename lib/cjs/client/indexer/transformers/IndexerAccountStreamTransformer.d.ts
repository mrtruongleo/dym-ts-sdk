import { StreamOperation } from '../../../types';
import { InjectiveAccountRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Stream Transformer
 */
export declare class IndexerAccountStreamTransformer {
    static balanceStreamCallback: (response: InjectiveAccountRpc.StreamSubaccountBalanceResponse) => {
        balance: import("..").SubaccountBalance | undefined;
        operation: StreamOperation;
        timestamp: string;
    };
}
