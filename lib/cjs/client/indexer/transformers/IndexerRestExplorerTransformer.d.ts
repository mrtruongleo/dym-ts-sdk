import { Block, ContractTransactionWithMessages, ExplorerValidator } from "../types/explorer";
import { BaseTransaction, BlockFromExplorerApiResponse, ContractExplorerApiResponse, ContractTransactionExplorerApiResponse, CW20BalanceExplorerApiResponse, ExplorerBlockWithTxs, ExplorerTransaction, ExplorerValidatorUptime, TransactionFromExplorerApiResponse, ValidatorUptimeFromExplorerApiResponse, WasmCodeExplorerApiResponse } from "../types/explorer-rest";
import { Contract, WasmCode, BankTransfer, ContractTransaction, ExplorerCW20BalanceWithToken, BankTransferFromExplorerApiResponse } from "../types/explorer";
/**
 * @category Indexer Rest Transformer
 */
export declare class IndexerRestExplorerTransformer {
    static blockToBlock(block: BlockFromExplorerApiResponse): Block;
    static blocksToBlocks(blocks: BlockFromExplorerApiResponse[]): Block[];
    static transactionToTransaction(transaction: TransactionFromExplorerApiResponse): ExplorerTransaction;
    static transactionsToTransactions(transactions: TransactionFromExplorerApiResponse[]): ExplorerTransaction[];
    static blockWithTxToBlockWithTx(block: BlockFromExplorerApiResponse): ExplorerBlockWithTxs;
    static blocksWithTxsToBlocksWithTxs(blocks: BlockFromExplorerApiResponse[]): ExplorerBlockWithTxs[];
    static baseTransactionToTransaction(transaction: BaseTransaction): ExplorerTransaction;
    static validatorExplorerToValidator(validators: any[]): Partial<ExplorerValidator>[];
    static validatorUptimeToExplorerValidatorUptime(validatorUptimeList: ValidatorUptimeFromExplorerApiResponse[]): ExplorerValidatorUptime[];
    static contractToExplorerContract(contract: ContractExplorerApiResponse): Contract;
    static contractTransactionToExplorerContractTransaction(transaction: ContractTransactionExplorerApiResponse): ContractTransaction;
    static contractTransactionToExplorerContractTransactionWithMessages(transaction: ContractTransactionExplorerApiResponse): ContractTransactionWithMessages;
    static wasmCodeToExplorerWasmCode(wasmCode: WasmCodeExplorerApiResponse): WasmCode;
    static CW20BalanceToExplorerCW20Balance(balance: CW20BalanceExplorerApiResponse): ExplorerCW20BalanceWithToken;
    static bankTransferToBankTransfer(transfer: BankTransferFromExplorerApiResponse): BankTransfer;
    static bankTransfersToBankTransfers(transfers: BankTransferFromExplorerApiResponse[]): BankTransfer[];
}
