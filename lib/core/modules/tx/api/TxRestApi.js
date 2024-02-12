var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpClient, DEFAULT_BLOCK_TIME_IN_SECONDS, DEFAULT_TX_BLOCK_INCLUSION_TIMEOUT_IN_MS, BigNumberInBase, DEFAULT_BLOCK_TIMEOUT_HEIGHT, } from '@injectivelabs/utils';
import { BroadcastMode, } from '../types/tx-rest-client';
import { TxClient } from '../utils/classes/TxClient';
import { HttpRequestMethod, HttpRequestException, TransactionException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getErrorMessage } from '../../../../utils/helpers';
import { CosmosTxV1Beta1Tx } from '@injectivelabs/core-proto-ts';
/**
 * It is recommended to use TxGrpcClient instead of TxRestApi
 */
export class TxRestApi {
    constructor(endpoint, options) {
        this.httpClient = new HttpClient(endpoint, {
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
                    throw new HttpRequestException(new Error(`The transaction with ${txHash} is not found`), {
                        context: 'TxRestApi',
                        contextModule: 'fetch-tx',
                    });
                }
                if (parseInt(txResponse.code.toString(), 10) !== 0) {
                    throw new TransactionException(new Error(txResponse.raw_log), {
                        contextCode: txResponse.code,
                        contextModule: txResponse.codespace,
                    });
                }
                return Object.assign(Object.assign({}, txResponse), { rawLog: txResponse.raw_log, gasWanted: parseInt(txResponse.gas_wanted, 10), gasUsed: parseInt(txResponse.gas_used, 10), height: parseInt(txResponse.height, 10), txHash: txResponse.txhash });
            }
            catch (e) {
                // Transaction has failed on the chain
                if (e instanceof TransactionException) {
                    throw e;
                }
                // Failed to query the transaction on the chain
                if (e instanceof HttpRequestException) {
                    throw e;
                }
                // The response itself failed
                throw new HttpRequestException(new Error('There was an issue while fetching transaction details'), {
                    context: 'TxRestApi',
                    contextModule: 'fetch-tx',
                });
            }
        });
    }
    fetchTxPoll(txHash, timeout = DEFAULT_TX_BLOCK_INCLUSION_TIMEOUT_IN_MS || 60000) {
        return __awaiter(this, void 0, void 0, function* () {
            const POLL_INTERVAL = DEFAULT_BLOCK_TIME_IN_SECONDS * 1000;
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
                    if (e instanceof TransactionException) {
                        throw e;
                    }
                }
                yield new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
            }
            throw new HttpRequestException(new Error(`Transaction was not included in a block before timeout of ${timeout}ms`), {
                context: 'TxRestApi',
                contextModule: 'fetch-tx-poll',
            });
        });
    }
    simulate(txRaw) {
        return __awaiter(this, void 0, void 0, function* () {
            const txRawClone = CosmosTxV1Beta1Tx.TxRaw.fromPartial(Object.assign({}, txRaw));
            if (txRawClone.signatures.length === 0) {
                txRawClone.signatures = [new Uint8Array(0)];
            }
            try {
                const response = yield this.postRaw('/cosmos/tx/v1beta1/simulate', {
                    tx_bytes: TxClient.encode(txRawClone),
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
                throw new TransactionException(new Error(e.message));
            }
        });
    }
    broadcast(tx, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeout = (options === null || options === void 0 ? void 0 : options.timeout) ||
                new BigNumberInBase((options === null || options === void 0 ? void 0 : options.txTimeout) || DEFAULT_BLOCK_TIMEOUT_HEIGHT)
                    .times(DEFAULT_BLOCK_TIME_IN_SECONDS * 1000)
                    .toNumber();
            try {
                const { tx_response: txResponse } = yield this.broadcastTx(tx, BroadcastMode.Sync);
                if (txResponse.code !== 0) {
                    throw new TransactionException(new Error(txResponse.raw_log), {
                        contextCode: txResponse.code,
                        contextModule: txResponse.codespace,
                    });
                }
                return this.fetchTxPoll(txResponse.txhash, timeout);
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    if (e.code !== StatusCodes.OK) {
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
            const response = yield this.broadcastTx(tx, BroadcastMode.Block);
            try {
                const { tx_response: txResponse } = response;
                if (txResponse.code !== 0) {
                    throw new TransactionException(new Error(txResponse.raw_log), {
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
                if (e instanceof TransactionException) {
                    throw e;
                }
                throw new TransactionException(new Error(e.message));
            }
        });
    }
    broadcastTx(txRaw, mode = BroadcastMode.Sync) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.postRaw('cosmos/tx/v1beta1/txs', {
                tx_bytes: TxClient.encode(txRaw),
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
                if (axios.isAxiosError(error)) {
                    if (error.code === 'ECONNABORTED') {
                        throw new HttpRequestException(new Error(error.message), {
                            code: StatusCodes.REQUEST_TOO_LONG,
                            context: endpoint,
                            method: HttpRequestMethod.Get,
                        });
                    }
                    const message = getErrorMessage(error, endpoint);
                    throw new HttpRequestException(new Error(message), {
                        context: endpoint,
                        code: error.response
                            ? error.response.status
                            : StatusCodes.BAD_REQUEST,
                        method: HttpRequestMethod.Get,
                    });
                }
                throw new HttpRequestException(new Error(error.message), {
                    context: endpoint,
                    code: UnspecifiedErrorCode,
                    contextModule: HttpRequestMethod.Get,
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
                if (axios.isAxiosError(error)) {
                    const message = getErrorMessage(error, endpoint);
                    throw new HttpRequestException(new Error(message), {
                        code: error.response
                            ? error.response.status
                            : StatusCodes.BAD_REQUEST,
                        context: endpoint,
                        contextModule: HttpRequestMethod.Post,
                    });
                }
                throw new HttpRequestException(new Error(error.message), {
                    code: UnspecifiedErrorCode,
                    context: endpoint,
                    contextModule: HttpRequestMethod.Post,
                });
            }
        });
    }
}
