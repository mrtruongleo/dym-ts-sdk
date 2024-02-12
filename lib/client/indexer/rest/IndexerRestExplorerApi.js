var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseRestConsumer from '../../base/BaseRestConsumer';
import { HttpRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { IndexerRestExplorerTransformer } from '../transformers';
import { IndexerModule } from '../types';
const explorerEndpointSuffix = 'api/explorer/v1';
/**
 * @category Indexer Rest API
 */
export class IndexerRestExplorerApi extends BaseRestConsumer {
    constructor(endpoint) {
        super(endpoint.includes(explorerEndpointSuffix)
            ? endpoint
            : `${endpoint}/${explorerEndpointSuffix}`);
    }
    fetchBlock(blockHashHeight) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `blocks/${blockHashHeight}`;
            try {
                const response = yield this.retry(() => this.get(`blocks/${blockHashHeight}`));
                return IndexerRestExplorerTransformer.blockWithTxToBlockWithTx(response.data.data);
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchBlocks(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = 'blocks';
            try {
                const { before, limit } = params || { limit: 12 };
                const response = yield this.retry(() => this.get(endpoint, {
                    before,
                    limit,
                }));
                const { paging, data } = response.data;
                return {
                    paging,
                    blocks: IndexerRestExplorerTransformer.blocksToBlocks(data),
                };
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchBlocksWithTx(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = 'blocks';
            try {
                const { before, limit } = params || { limit: 12 };
                const response = yield this.retry(() => this.get(endpoint, {
                    before,
                    limit,
                }));
                const { paging, data } = response.data;
                return {
                    paging,
                    blocks: data
                        ? IndexerRestExplorerTransformer.blocksWithTxsToBlocksWithTxs(data)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchTransactions(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = 'txs';
            try {
                const { type, skip, after, limit, before, status, endTime, toNumber, startTime, fromNumber, } = params || {
                    limit: 12,
                };
                const response = yield this.retry(() => this.get(endpoint, {
                    skip,
                    limit,
                    after,
                    before,
                    status,
                    end_time: endTime,
                    to_number: toNumber,
                    start_time: startTime,
                    from_number: fromNumber,
                    type: type ? type.join(',') : undefined,
                }));
                const { paging, data } = response.data;
                return {
                    paging,
                    transactions: data
                        ? IndexerRestExplorerTransformer.transactionsToTransactions(data)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchAccountTransactions({ account, params, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `accountTxs/${account}`;
            try {
                const { type, skip, limit, after, before, status, endTime, toNumber, startTime, fromNumber, withClaimId, } = params || {
                    limit: 12,
                };
                const response = yield this.retry(() => this.get(endpoint, {
                    skip,
                    limit,
                    after,
                    before,
                    status,
                    end_time: endTime,
                    to_number: toNumber,
                    start_time: startTime,
                    from_number: fromNumber,
                    type: type ? type.join(',') : undefined,
                    with_claim_id: withClaimId,
                }));
                const { paging, data } = response.data;
                return {
                    paging,
                    transactions: data
                        ? IndexerRestExplorerTransformer.transactionsToTransactions(data)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchTransaction(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `txs/${hash}`;
            try {
                const response = yield this.retry(() => this.get(endpoint));
                return IndexerRestExplorerTransformer.transactionToTransaction(response.data.data);
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchValidators() {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = 'validators';
            try {
                const response = yield this.retry(() => this.get(endpoint));
                if (!response.data || !response.data.data) {
                    return [];
                }
                return IndexerRestExplorerTransformer.validatorExplorerToValidator(response.data.data);
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchValidatorUptime(validatorConsensusAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `validator_uptime/${validatorConsensusAddress}`;
            try {
                const response = yield this.retry(() => this.get(endpoint));
                if (!response.data || !response.data.data) {
                    return [];
                }
                return IndexerRestExplorerTransformer.validatorUptimeToExplorerValidatorUptime(response.data.data);
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchContract(contractAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `/wasm/contracts/${contractAddress}`;
            try {
                const response = yield this.retry(() => this.get(endpoint));
                return IndexerRestExplorerTransformer.contractToExplorerContract(response.data);
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchContracts(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `/wasm/contracts`;
            try {
                const { assetsOnly, fromNumber, limit, skip, label, codeId } = params || {
                    limit: 12,
                };
                const response = yield this.retry(() => this.get(endpoint, {
                    skip,
                    limit,
                    label,
                    code_id: codeId === null || codeId === void 0 ? void 0 : codeId.toString(),
                    assets_only: assetsOnly,
                    from_number: fromNumber,
                }));
                const { paging, data } = response.data;
                return {
                    paging,
                    contracts: data
                        ? data.map(IndexerRestExplorerTransformer.contractToExplorerContract)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchContractTransactions({ contractAddress, params, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `/contractTxs/${contractAddress}`;
            try {
                const { fromNumber, limit, skip, toNumber } = params || { limit: 12 };
                const response = yield this.retry(() => this.get(endpoint, {
                    skip,
                    limit,
                    to_number: toNumber,
                    from_number: fromNumber,
                }));
                const { paging, data } = response.data;
                return {
                    paging,
                    transactions: data
                        ? data.map(IndexerRestExplorerTransformer.contractTransactionToExplorerContractTransaction)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchContractTransactionsWithMessages({ contractAddress, params, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `/contractTxs/${contractAddress}`;
            try {
                const { fromNumber, limit, skip, toNumber } = params || { limit: 12 };
                const response = yield this.retry(() => this.get(endpoint, {
                    skip,
                    limit,
                    to_number: toNumber,
                    from_number: fromNumber,
                }));
                const { paging, data } = response.data;
                return {
                    paging,
                    transactions: data
                        ? data.map(IndexerRestExplorerTransformer.contractTransactionToExplorerContractTransactionWithMessages)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchWasmCode(codeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `/wasm/codes/${codeId}`;
            try {
                const response = yield this.retry(() => this.get(endpoint));
                return IndexerRestExplorerTransformer.wasmCodeToExplorerWasmCode(response.data);
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchWasmCodes(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `/wasm/codes`;
            try {
                const { fromNumber, limit, toNumber } = params || { limit: 12 };
                const response = yield this.retry(() => this.get(endpoint, {
                    limit,
                    from_number: fromNumber,
                    to_number: toNumber,
                }));
                const { paging, data } = response.data;
                return {
                    paging,
                    wasmCodes: data
                        ? data.map(IndexerRestExplorerTransformer.wasmCodeToExplorerWasmCode)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchCW20Balances(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `/wasm/${address}/cw20-balance`;
            try {
                const response = yield this.retry(() => this.get(endpoint));
                if (response.data.length === 0) {
                    return [];
                }
                return response.data.map(IndexerRestExplorerTransformer.CW20BalanceToExplorerCW20Balance);
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchCW20BalancesNoThrow(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `/wasm/${address}/cw20-balance`;
            try {
                const response = yield this.retry(() => this.get(endpoint));
                if (response.data.length === 0) {
                    return [];
                }
                return response.data.map(IndexerRestExplorerTransformer.CW20BalanceToExplorerCW20Balance);
            }
            catch (e) {
                const error = e;
                if (error.message.includes(404) || error.message.includes(500)) {
                    return [];
                }
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
    fetchBankTransfers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `/bank/transfers`;
            const { endTime, limit, skip, startTime, address, recipients, senders } = params || { limit: 10 };
            try {
                const response = yield this.retry(() => this.get(endpoint, {
                    skip,
                    limit,
                    senders,
                    address,
                    recipients,
                    end_time: endTime,
                    start_time: startTime,
                    is_community_pool_related: params.isCommunitySpendPool,
                }));
                const { data, paging } = response.data;
                return {
                    paging,
                    data: IndexerRestExplorerTransformer.bankTransfersToBankTransfers(data || []),
                };
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                throw new HttpRequestException(new Error(e.message), {
                    code: UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: IndexerModule.Explorer,
                });
            }
        });
    }
}
