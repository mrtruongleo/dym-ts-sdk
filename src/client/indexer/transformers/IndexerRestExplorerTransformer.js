"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerRestExplorerTransformer = void 0;
const utils_1 = require("@injectivelabs/utils");
const token_metadata_1 = require("@injectivelabs/token-metadata");
const ZERO_IN_BASE = new utils_1.BigNumberInBase(0);
const getContractTransactionAmount = (ApiTransaction) => {
    const { type, value: { msg }, } = ApiTransaction.messages[0];
    if (!type.includes("MsgExecuteContract")) {
        return ZERO_IN_BASE;
    }
    const msgObj = typeof msg === "string" ? JSON.parse(msg) : msg;
    if (!msgObj.transfer) {
        return ZERO_IN_BASE;
    }
    return new utils_1.BigNumberInWei(msgObj.transfer.amount).toBase();
};
const parseCW20Message = (jsonObject) => {
    if (!jsonObject) {
        return undefined;
    }
    return JSON.parse(jsonObject);
};
/**
 * @category Indexer Rest Transformer
 */
class IndexerRestExplorerTransformer {
    static blockToBlock(block) {
        return {
            height: block.height,
            proposer: block.proposer,
            moniker: block.moniker,
            blockHash: block.block_hash,
            parentHash: block.parent_hash,
            numPreCommits: block.num_pre_commits,
            numTxs: block.num_txs,
            timestamp: block.timestamp,
        };
    }
    static blocksToBlocks(blocks) {
        return blocks.map(IndexerRestExplorerTransformer.blockToBlock);
    }
    static transactionToTransaction(transaction) {
        var _a, _b, _c, _d;
        return {
            id: transaction.id,
            blockNumber: transaction.block_number,
            blockTimestamp: transaction.block_timestamp,
            hash: transaction.hash,
            code: transaction.code,
            info: transaction.info,
            memo: transaction.memo || "",
            gasWanted: transaction.gas_wanted,
            gasFee: {
                amounts: (_a = transaction.gas_fee) === null || _a === void 0 ? void 0 : _a.amount,
                gasLimit: (_b = transaction.gas_fee) === null || _b === void 0 ? void 0 : _b.gas_limit,
                payer: (_c = transaction.gas_fee) === null || _c === void 0 ? void 0 : _c.payer,
                granter: (_d = transaction.gas_fee) === null || _d === void 0 ? void 0 : _d.granter,
            },
            gasUsed: transaction.gas_used,
            codespace: transaction.codespace,
            signatures: transaction.signatures,
            txType: transaction.tx_type,
            data: transaction.data,
            events: transaction.events || [],
            messages: (transaction.messages || [])
                .filter((m) => m)
                .map((message) => ({
                type: message.type,
                message: message.value,
            })),
            logs: transaction.logs,
            errorLog: transaction.error_log,
            claimIds: transaction.claim_id || [],
        };
    }
    static transactionsToTransactions(transactions) {
        return transactions.map(IndexerRestExplorerTransformer.transactionToTransaction);
    }
    static blockWithTxToBlockWithTx(block) {
        return {
            height: block.height,
            proposer: block.proposer,
            moniker: block.moniker,
            blockHash: block.block_hash,
            parentHash: block.parent_hash,
            numPreCommits: block.num_pre_commits,
            numTxs: block.num_txs,
            timestamp: block.timestamp,
            txs: block.txs
                ? IndexerRestExplorerTransformer.transactionsToTransactions(block.txs)
                : [],
        };
    }
    static blocksWithTxsToBlocksWithTxs(blocks) {
        return blocks.map(IndexerRestExplorerTransformer.blockWithTxToBlockWithTx);
    }
    static baseTransactionToTransaction(transaction) {
        return Object.assign(Object.assign({}, transaction), { messages: (transaction.messages || [])
                .filter((m) => m)
                .map((message) => ({
                type: message.type,
                message: message.value,
            })), memo: transaction.memo || "" });
    }
    static validatorExplorerToValidator(validators) {
        return validators.map((validator) => {
            return {
                id: validator.id,
                moniker: validator.moniker,
                consensusAddress: validator.consensus_address,
                operatorAddress: validator.operator_address,
                proposed: validator.proposed,
                signed: validator.signed,
                missed: validator.missed,
                uptimePercentage: validator.uptime_percentage,
                imageUrl: validator.imageURL,
            };
        });
    }
    static validatorUptimeToExplorerValidatorUptime(validatorUptimeList) {
        return validatorUptimeList.map((validatorUptime) => ({
            blockNumber: validatorUptime.block_number,
            status: validatorUptime.status,
        }));
    }
    static contractToExplorerContract(contract) {
        return {
            label: contract.label,
            address: contract.address,
            txHash: contract.tx_hash,
            creator: contract.creator,
            executes: contract.executes,
            instantiatedAt: contract.instantiated_at,
            lastExecutedAt: contract.last_executed_at,
            funds: contract.funds,
            codeId: contract.code_id,
            admin: contract.admin,
            cw20_metadata: contract.cw20_metadata,
            initMessage: parseCW20Message(contract.init_message),
            currentMigrateMessage: parseCW20Message(contract.current_migrate_message),
        };
    }
    static contractTransactionToExplorerContractTransaction(transaction) {
        return {
            txHash: transaction.hash,
            code: transaction.code,
            data: transaction.data,
            memo: transaction.memo,
            tx_number: transaction.tx_number,
            error_log: transaction.error_log,
            height: transaction.block_number,
            time: transaction.block_unix_timestamp,
            type: transaction.messages[0].type,
            fee: transaction.gas_fee.amount
                ? new utils_1.BigNumberInWei(transaction.gas_fee.amount[0].amount).toBase()
                : ZERO_IN_BASE,
            amount: getContractTransactionAmount(transaction),
        };
    }
    static contractTransactionToExplorerContractTransactionWithMessages(transaction) {
        return Object.assign(Object.assign({}, IndexerRestExplorerTransformer.contractTransactionToExplorerContractTransaction(transaction)), { messages: (transaction.messages || []).map((message) => {
                return {
                    type: message.type,
                    value: Object.assign(Object.assign({}, message.value), { msg: typeof message.value.msg === "string"
                            ? JSON.parse(message.value.msg)
                            : message.value.msg }),
                };
            }) });
    }
    static wasmCodeToExplorerWasmCode(wasmCode) {
        return {
            id: wasmCode.code_id,
            txHash: wasmCode.tx_hash,
            creator: wasmCode.creator,
            contractType: wasmCode.contract_type,
            version: wasmCode.version,
            instantiates: wasmCode.instantiates,
            creationDate: wasmCode.created_at,
            checksum: wasmCode.checksum,
            permission: wasmCode.permission,
            proposalId: wasmCode.proposal_id,
        };
    }
    static CW20BalanceToExplorerCW20Balance(balance) {
        const { marketing_info, token_info: { name, symbol, decimals }, } = balance.cw20_metadata || { token_info: {} };
        return {
            contractAddress: balance.contract_address,
            account: balance.account,
            balance: balance.balance,
            updatedAt: balance.updated_at,
            token: {
                decimals,
                name,
                symbol,
                logo: marketing_info ? marketing_info.logo || "" : "",
                cw20: {
                    decimals,
                    symbol,
                    address: balance.contract_address,
                },
                coinGeckoId: name,
                tokenType: token_metadata_1.TokenType.Cw20,
                denom: "",
            },
        };
    }
    static bankTransferToBankTransfer(transfer) {
        return {
            sender: transfer.sender,
            recipient: transfer.recipient,
            amounts: transfer.amounts,
            blockNumber: transfer.block_number,
            blockTimestamp: new Date(transfer.block_timestamp).getTime(),
        };
    }
    static bankTransfersToBankTransfers(transfers) {
        return transfers.map(IndexerRestExplorerTransformer.bankTransferToBankTransfer);
    }
}
exports.IndexerRestExplorerTransformer = IndexerRestExplorerTransformer;
