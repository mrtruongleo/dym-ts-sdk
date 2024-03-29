import { MsgStatus, MsgType } from '@injectivelabs/ts-types';
import BaseRestConsumer from '../../base/BaseRestConsumer';
import { Paging, ExplorerTransaction, ExplorerBlockWithTxs, ExplorerValidatorUptime } from '../types/explorer-rest';
import { Contract, WasmCode, BankTransfer, ContractTransaction, ExplorerCW20BalanceWithToken, ContractTransactionWithMessages } from '../types/explorer';
import { Block, ExplorerValidator } from '../types/explorer';
/**
 * @category Indexer Rest API
 */
export declare class IndexerRestExplorerApi extends BaseRestConsumer {
    constructor(endpoint: string);
    fetchBlock(blockHashHeight: string): Promise<ExplorerBlockWithTxs>;
    fetchBlocks(params?: {
        before?: number;
        limit?: number;
    }): Promise<{
        paging: Paging;
        blocks: Block[];
    }>;
    fetchBlocksWithTx(params?: {
        before?: number;
        limit?: number;
    }): Promise<{
        paging: Paging;
        blocks: ExplorerBlockWithTxs[];
    }>;
    fetchTransactions(params?: {
        fromNumber?: number;
        limit?: number;
        before?: number;
        after?: number;
        toNumber?: number;
        skip?: number;
        startTime?: number;
        endTime?: number;
        status?: MsgStatus;
        type?: MsgType[];
    }): Promise<{
        paging: Paging;
        transactions: ExplorerTransaction[];
    }>;
    fetchAccountTransactions({ account, params, }: {
        account: string;
        params?: {
            skip?: number;
            limit?: number;
            after?: number;
            before?: number;
            type?: MsgType[];
            status?: MsgStatus;
            endTime?: number;
            toNumber?: number;
            fromNumber?: number;
            startTime?: number;
            withClaimId?: boolean;
        };
    }): Promise<{
        paging: Paging;
        transactions: ExplorerTransaction[];
    }>;
    fetchTransaction(hash: string): Promise<ExplorerTransaction>;
    fetchValidators(): Promise<Partial<ExplorerValidator>[]>;
    fetchValidatorUptime(validatorConsensusAddress: string): Promise<ExplorerValidatorUptime[]>;
    fetchContract(contractAddress: string): Promise<Contract>;
    fetchContracts(params?: {
        assetsOnly?: boolean;
        fromNumber?: number;
        codeId?: string | number;
        limit?: number;
        skip?: number;
        label?: string;
    }): Promise<{
        paging: Paging;
        contracts: Contract[];
    }>;
    fetchContractTransactions({ contractAddress, params, }: {
        contractAddress: string;
        params?: {
            fromNumber?: number;
            limit?: number;
            toNumber?: number;
            skip?: number;
        };
    }): Promise<{
        paging: Paging;
        transactions: ContractTransaction[];
    }>;
    fetchContractTransactionsWithMessages({ contractAddress, params, }: {
        contractAddress: string;
        params?: {
            fromNumber?: number;
            limit?: number;
            toNumber?: number;
            skip?: number;
        };
    }): Promise<{
        paging: Paging;
        transactions: ContractTransactionWithMessages[];
    }>;
    fetchWasmCode(codeId: number): Promise<WasmCode>;
    fetchWasmCodes(params?: {
        fromNumber?: number;
        limit?: number;
        toNumber?: number;
    }): Promise<{
        paging: Paging;
        wasmCodes: WasmCode[];
    }>;
    fetchCW20Balances(address: string): Promise<ExplorerCW20BalanceWithToken[]>;
    fetchCW20BalancesNoThrow(address: string): Promise<ExplorerCW20BalanceWithToken[]>;
    fetchBankTransfers(params: {
        limit?: number;
        skip?: number;
        startTime?: number;
        endTime?: number;
        address?: string;
        isCommunitySpendPool?: boolean;
        senders?: string;
        recipients?: string;
    }): Promise<{
        paging: Paging;
        data: BankTransfer[];
    }>;
}
