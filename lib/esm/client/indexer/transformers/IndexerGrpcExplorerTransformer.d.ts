import { BankMsgSendTransaction, Block, BlockWithTxs, GasFee, GrpcGasFee, GrpcIndexerValidatorDescription, GrpcValidatorSlashingEvent, GrpcValidatorUptime, Transaction, ExplorerValidator, ExplorerValidatorDescription, ValidatorSlashingEvent, ValidatorUptime, IBCTransferTx, PeggyDepositTx, PeggyWithdrawalTx, GrpcIBCTransferTx, GrpcPeggyDepositTx, GrpcPeggyWithdrawalTx, IndexerStreamTransaction } from '../types/explorer';
import { InjectiveExplorerRpc } from '@injectivelabs/indexer-proto-ts';
/**
 * @category Indexer Grpc Transformer
 */
export declare class IndexerGrpcExplorerTransformer {
    static getTxByTxHashResponseToTx(tx: InjectiveExplorerRpc.GetTxByTxHashResponse): Transaction;
    static getAccountTxsResponseToAccountTxs(response: InjectiveExplorerRpc.GetAccountTxsResponse): {
        txs: Transaction[];
        pagination: import("../../..").ExchangePagination;
    };
    static getValidatorUptimeResponseToValidatorUptime(response: InjectiveExplorerRpc.GetValidatorUptimeResponse): ValidatorUptime[];
    static getPeggyDepositTxsResponseToPeggyDepositTxs(response: InjectiveExplorerRpc.GetPeggyDepositTxsResponse): PeggyDepositTx[];
    static getPeggyWithdrawalTxsResponseToPeggyWithdrawalTxs(response: InjectiveExplorerRpc.GetPeggyWithdrawalTxsResponse): PeggyWithdrawalTx[];
    static getIBCTransferTxsResponseToIBCTransferTxs(response: InjectiveExplorerRpc.GetIBCTransferTxsResponse): IBCTransferTx[];
    static validatorResponseToValidator(validator: InjectiveExplorerRpc.GetValidatorResponse): ExplorerValidator;
    static streamTxResponseToTxs(response: InjectiveExplorerRpc.StreamTxsResponse): IndexerStreamTransaction;
    static grpcGasFeeToGasFee(gasFee: GrpcGasFee): GasFee;
    static grpcTransactionToBankMsgSendTransaction(tx: InjectiveExplorerRpc.GetTxByTxHashResponse): BankMsgSendTransaction;
    static grpcTransactionToTransaction(tx: InjectiveExplorerRpc.GetTxByTxHashResponse): Transaction;
    static grpcTransactionsToTransactions(txs: Array<InjectiveExplorerRpc.GetTxByTxHashResponse>): Array<Transaction>;
    static grpcTransactionToTransactionFromDetail(tx: InjectiveExplorerRpc.TxDetailData): Transaction;
    static grpcTransactionsToTransactionsFromDetail(txs: InjectiveExplorerRpc.TxDetailData[]): Array<Transaction>;
    static grpcBlockToBlock(block: InjectiveExplorerRpc.BlockInfo): Block;
    static grpcBlockToBlockWithTxs(block: InjectiveExplorerRpc.BlockInfo): BlockWithTxs;
    static grpcBlocksToBlocks(blocks: Array<InjectiveExplorerRpc.BlockInfo>): Array<Block>;
    static grpcBlocksToBlocksWithTxs(blocks: Array<InjectiveExplorerRpc.BlockInfo>): Array<BlockWithTxs>;
    static grpcValidatorDescriptionToValidatorDescription(validatorDescription: GrpcIndexerValidatorDescription): ExplorerValidatorDescription;
    static grpcValidatorUptimeToValidatorUptime(validatorUptime: GrpcValidatorUptime): ValidatorUptime;
    static grpcValidatorSlashingEventToValidatorSlashingEvent(validatorUptime: GrpcValidatorSlashingEvent): ValidatorSlashingEvent;
    static grpcIBCTransferTxToIBCTransferTx(grpcIBCTransferTx: GrpcIBCTransferTx): IBCTransferTx;
    static grpcPeggyDepositTx(grpcPeggyDepositTx: GrpcPeggyDepositTx): PeggyDepositTx;
    static grpcPeggyWithdrawalTx(grpcPeggyWithdrawalTx: GrpcPeggyWithdrawalTx): PeggyWithdrawalTx;
}
