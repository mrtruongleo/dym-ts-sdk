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
exports.TxRestApi = void 0;
const utils_1 = require("@injectivelabs/utils");
const tx_rest_client_1 = require("../types/tx-rest-client");
const TxClient_1 = require("../utils/classes/TxClient");
const exceptions_1 = require("@injectivelabs/exceptions");
const axios_1 = __importDefault(require("axios"));
const http_status_codes_1 = require("http-status-codes");
const helpers_1 = require("../../../../utils/helpers");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
/**
 * It is recommended to use TxGrpcClient instead of TxRestApi
 */
class TxRestApi {
    constructor(endpoint, options) {
        this.httpClient = new utils_1.HttpClient(endpoint, {
            headers: {
                Accept: 'application/json',
            },
            timeout: (options === null || options === void 0 ? void 0 : options.timeout) || 15000,
        });
    }
    fetchTx(txHash, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.getRaw(`/cosmos/tx/v1beta1/txs/${txHash}`, params);
                const { tx_response: txResponse } = response;
                if (!txResponse) {
                    throw new exceptions_1.HttpRequestException(new Error(`The transaction with ${txHash} is not found`), {
                        context: 'TxRestApi',
                        contextModule: 'fetch-tx',
                    });
                }
                if (parseInt(txResponse.code.toString(), 10) !== 0) {
                    throw new exceptions_1.TransactionException(new Error(txResponse.raw_log), {
                        contextCode: txResponse.code,
                        contextModule: txResponse.codespace,
                    });
                }
                return Object.assign(Object.assign({}, txResponse), { rawLog: txResponse.raw_log, gasWanted: parseInt(txResponse.gas_wanted, 10), gasUsed: parseInt(txResponse.gas_used, 10), height: parseInt(txResponse.height, 10), txHash: txResponse.txhash });
            }
            catch (e) {
                // Transaction has failed on the chain
                if (e instanceof exceptions_1.TransactionException) {
                    throw e;
                }
                // Failed to query the transaction on the chain
                if (e instanceof exceptions_1.HttpRequestException) {
                    throw e;
                }
                // The response itself failed
                throw new exceptions_1.HttpRequestException(new Error('There was an issue while fetching transaction details'), {
                    context: 'TxRestApi',
                    contextModule: 'fetch-tx',
                });
            }
        });
    }
    fetchTxPoll(txHash, timeout = utils_1.DEFAULT_TX_BLOCK_INCLUSION_TIMEOUT_IN_MS || 60000) {
        return __awaiter(this, void 0, void 0, function* () {
            const POLL_INTERVAL = utils_1.DEFAULT_BLOCK_TIME_IN_SECONDS * 1000;
            for (let i = 0; i <= timeout / POLL_INTERVAL; i += 1) {
                try {
                    const txInfo = yield this.fetchTx(txHash);
                    const txResponse = txInfo;
                    if (txResponse) {
                        return txResponse;
                    }
                }
                catch (e) {
                    // We throw only if the transaction failed on chain
                    if (e instanceof exceptions_1.TransactionException) {
                        throw e;
                    }
                }
                yield new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
            }
            throw new exceptions_1.HttpRequestException(new Error(`Transaction was not included in a block before timeout of ${timeout}ms`), {
                context: 'TxRestApi',
                contextModule: 'fetch-tx-poll',
            });
        });
    }
    simulate(txRaw) {
        return __awaiter(this, void 0, void 0, function* () {
            const txRawClone = core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.fromPartial(Object.assign({}, txRaw));
            if (txRawClone.signatures.length === 0) {
                txRawClone.signatures = [new Uint8Array(0)];
            }
            try {
                const response = yield this.postRaw('/cosmos/tx/v1beta1/simulate', {
                    tx_bytes: TxClient_1.TxClient.encode(txRawClone),
                });
                return {
                    result: {
                        data: response.result.data,
                        log: response.result.log,
                        eventsList: response.result.events,
                    },
                    gasInfo: {
                        gasWanted: parseInt(response.gas_info.gas_wanted, 10),
                        gasUsed: parseInt(response.gas_info.gas_used, 10),
                    },
                };
            }
            catch (e) {
                throw new exceptions_1.TransactionException(new Error(e.message));
            }
        });
    }
    broadcast(tx, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeout = (options === null || options === void 0 ? void 0 : options.timeout) ||
                new utils_1.BigNumberInBase((options === null || options === void 0 ? void 0 : options.txTimeout) || utils_1.DEFAULT_BLOCK_TIMEOUT_HEIGHT)
                    .times(utils_1.DEFAULT_BLOCK_TIME_IN_SECONDS * 1000)
                    .toNumber();
            try {
                const { tx_response: txResponse } = yield this.broadcastTx(tx, tx_rest_client_1.BroadcastMode.Sync);
                if (txResponse.code !== 0) {
                    throw new exceptions_1.TransactionException(new Error(txResponse.raw_log), {
                        contextCode: txResponse.code,
                        contextModule: txResponse.codespace,
                    });
                }
                return this.fetchTxPoll(txResponse.txhash, timeout);
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    if (e.code !== http_status_codes_1.StatusCodes.OK) {
                        throw e;
                    }
                }
                throw e;
            }
        });
    }
    /**
     * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
     * @param tx transaction to broadcast
     */
    broadcastBlock(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.broadcastTx(tx, tx_rest_client_1.BroadcastMode.Block);
            try {
                const { tx_response: txResponse } = response;
                if (txResponse.code !== 0) {
                    throw new exceptions_1.TransactionException(new Error(txResponse.raw_log), {
                        contextCode: txResponse.code,
                        contextModule: txResponse.codespace,
                    });
                }
                return {
                    txHash: txResponse.txhash,
                    rawLog: txResponse.raw_log,
                    gasWanted: parseInt(txResponse.gas_wanted || '0', 10),
                    gasUsed: parseInt(txResponse.gas_used || '0', 10),
                    height: parseInt(txResponse.height || '0', 10),
                    logs: txResponse.logs || [],
                    code: txResponse.code,
                    codespace: txResponse.codespace,
                    data: txResponse.data,
                    info: txResponse.info,
                    timestamp: txResponse.timestamp || '0',
                };
            }
            catch (e) {
                if (e instanceof exceptions_1.TransactionException) {
                    throw e;
                }
                throw new exceptions_1.TransactionException(new Error(e.message));
            }
        });
    }
    broadcastTx(txRaw, mode = tx_rest_client_1.BroadcastMode.Sync) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.postRaw('cosmos/tx/v1beta1/txs', {
                tx_bytes: TxClient_1.TxClient.encode(txRaw),
                mode,
            });
            return response;
        });
    }
    getRaw(endpoint, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.httpClient
                    .get(endpoint, params)
                    .then((d) => d.data);
            }
            catch (e) {
                const error = e;
                if (axios_1.default.isAxiosError(error)) {
                    if (error.code === 'ECONNABORTED') {
                        throw new exceptions_1.HttpRequestException(new Error(error.message), {
                            code: http_status_codes_1.StatusCodes.REQUEST_TOO_LONG,
                            context: endpoint,
                            method: exceptions_1.HttpRequestMethod.Get,
                        });
                    }
                    const message = (0, helpers_1.getErrorMessage)(error, endpoint);
                    throw new exceptions_1.HttpRequestException(new Error(message), {
                        context: endpoint,
                        code: error.response
                            ? error.response.status
                            : http_status_codes_1.StatusCodes.BAD_REQUEST,
                        method: exceptions_1.HttpRequestMethod.Get,
                    });
                }
                throw new exceptions_1.HttpRequestException(new Error(error.message), {
                    context: endpoint,
                    code: exceptions_1.UnspecifiedErrorCode,
                    contextModule: exceptions_1.HttpRequestMethod.Get,
                });
            }
        });
    }
    postRaw(endpoint, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.httpClient
                    .post(endpoint, params)
                    .then((d) => d.data);
            }
            catch (e) {
                const error = e;
                if (axios_1.default.isAxiosError(error)) {
                    const message = (0, helpers_1.getErrorMessage)(error, endpoint);
                    throw new exceptions_1.HttpRequestException(new Error(message), {
                        code: error.response
                            ? error.response.status
                            : http_status_codes_1.StatusCodes.BAD_REQUEST,
                        context: endpoint,
                        contextModule: exceptions_1.HttpRequestMethod.Post,
                    });
                }
                throw new exceptions_1.HttpRequestException(new Error(error.message), {
                    code: exceptions_1.UnspecifiedErrorCode,
                    context: endpoint,
                    contextModule: exceptions_1.HttpRequestMethod.Post,
                });
            }
        });
    }
}
exports.TxRestApi = TxRestApi;
