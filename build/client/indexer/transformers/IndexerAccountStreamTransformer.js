import { IndexerGrpcAccountTransformer } from './IndexerGrpcAccountTransformer';
import { StreamOperation } from '../../../types';
/**
 * @category Indexer Stream Transformer
 */
export class IndexerAccountStreamTransformer {
    static balanceStreamCallback = (response) => {
        const balance = response.balance;
        return {
            balance: balance
                ? IndexerGrpcAccountTransformer.grpcBalanceToBalance(balance)
                : undefined,
            operation: StreamOperation.Update,
            timestamp: response.timestamp,
        };
    };
}
