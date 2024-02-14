"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerRestExplorerApi = void 0;
const BaseRestConsumer_1 = __importDefault(require("../../base/BaseRestConsumer"));
const exceptions_1 = require("@injectivelabs/exceptions");
const transformers_1 = require("../transformers");
const types_1 = require("../types");
const explorerEndpointSuffix = 'api/explorer/v1';
/**
 * @category Indexer Rest API
 */
class IndexerRestExplorerApi extends BaseRestConsumer_1.default {
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
                return transformers_1.IndexerRestExplorerTransformer.blockWithTxToBlockWithTx(response.data.data);
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                    blocks: transformers_1.IndexerRestExplorerTransformer.blocksToBlocks(data),
                };
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                        ? transformers_1.IndexerRestExplorerTransformer.blocksWithTxsToBlocksWithTxs(data)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                        ? transformers_1.IndexerRestExplorerTransformer.transactionsToTransactions(data)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                        ? transformers_1.IndexerRestExplorerTransformer.transactionsToTransactions(data)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
                });
            }
        });
    }
    fetchTransaction(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `txs/${hash}`;
            try {
                const response = yield this.retry(() => this.get(endpoint));
                return transformers_1.IndexerRestExplorerTransformer.transactionToTransaction(response.data.data);
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    contextModule: types_1.IndexerModule.Explorer,
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
                return transformers_1.IndexerRestExplorerTransformer.validatorExplorerToValidator(response.data.data);
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                return transformers_1.IndexerRestExplorerTransformer.validatorUptimeToExplorerValidatorUptime(response.data.data);
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
                });
            }
        });
    }
    fetchContract(contractAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `/wasm/contracts/${contractAddress}`;
            try {
                const response = yield this.retry(() => this.get(endpoint));
                return transformers_1.IndexerRestExplorerTransformer.contractToExplorerContract(response.data);
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                        ? data.map(transformers_1.IndexerRestExplorerTransformer.contractToExplorerContract)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                        ? data.map(transformers_1.IndexerRestExplorerTransformer.contractTransactionToExplorerContractTransaction)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                        ? data.map(transformers_1.IndexerRestExplorerTransformer.contractTransactionToExplorerContractTransactionWithMessages)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
                });
            }
        });
    }
    fetchWasmCode(codeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `/wasm/codes/${codeId}`;
            try {
                const response = yield this.retry(() => this.get(endpoint));
                return transformers_1.IndexerRestExplorerTransformer.wasmCodeToExplorerWasmCode(response.data);
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                        ? data.map(transformers_1.IndexerRestExplorerTransformer.wasmCodeToExplorerWasmCode)
                        : [],
                };
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                return response.data.map(transformers_1.IndexerRestExplorerTransformer.CW20BalanceToExplorerCW20Balance);
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                return response.data.map(transformers_1.IndexerRestExplorerTransformer.CW20BalanceToExplorerCW20Balance);
            }
            catch (e) {
                const error = e;
                if (error.message.includes(404) || error.message.includes(500)) {
                    return [];
                }
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
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
                    data: transformers_1.IndexerRestExplorerTransformer.bankTransfersToBankTransfers(data || []),
                };
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                throw new exceptions_1.HttpRequestException(new Error(e.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: `${this.endpoint}/${endpoint}`,
                    contextModule: types_1.IndexerModule.Explorer,
                });
            }
        });
    }
}
exports.IndexerRestExplorerApi = IndexerRestExplorerApi;
