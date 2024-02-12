import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveExplorerRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
import { IndexerGrpcExplorerTransformer } from '../transformers';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcExplorerApi extends BaseGrpcConsumer {
    module = IndexerModule.Explorer;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new InjectiveExplorerRpc.InjectiveExplorerRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchTxByHash(hash) {
        const request = InjectiveExplorerRpc.GetTxByTxHashRequest.create();
        request.hash = hash;
        try {
            const response = await this.client.GetTxByTxHash(request);
            return IndexerGrpcExplorerTransformer.getTxByTxHashResponseToTx(response);
        }
        catch (e) {
            if (e instanceof InjectiveExplorerRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetTxByTxHash',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'GetTxByTxHash',
                contextModule: this.module,
            });
        }
    }
    async fetchAccountTx({ address, limit, type, }) {
        const request = InjectiveExplorerRpc.GetAccountTxsRequest.create();
        request.address = address;
        if (limit) {
            request.limit = limit;
        }
        if (type) {
            request.type = type;
        }
        try {
            const response = await this.retry(() => this.client.GetAccountTxs(request));
            return IndexerGrpcExplorerTransformer.getAccountTxsResponseToAccountTxs(response);
        }
        catch (e) {
            if (e instanceof InjectiveExplorerRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetAccountTxs',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'GetAccountTxs',
                contextModule: this.module,
            });
        }
    }
    async fetchValidator(validatorAddress) {
        const request = InjectiveExplorerRpc.GetValidatorRequest.create();
        request.address = validatorAddress;
        try {
            const response = await this.retry(() => this.client.GetValidator(request));
            return IndexerGrpcExplorerTransformer.validatorResponseToValidator(response);
        }
        catch (e) {
            if (e instanceof InjectiveExplorerRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetValidator',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'GetValidator',
                contextModule: this.module,
            });
        }
    }
    async fetchValidatorUptime(validatorAddress) {
        const request = InjectiveExplorerRpc.GetValidatorUptimeRequest.create();
        request.address = validatorAddress;
        try {
            const response = await this.retry(() => this.client.GetValidatorUptime(request));
            return IndexerGrpcExplorerTransformer.getValidatorUptimeResponseToValidatorUptime(response);
        }
        catch (e) {
            if (e instanceof InjectiveExplorerRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetValidatorUptime',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'GetValidatorUptime',
                contextModule: this.module,
            });
        }
    }
    async fetchPeggyDepositTxs({ sender, receiver, limit, skip, }) {
        const request = InjectiveExplorerRpc.GetPeggyDepositTxsRequest.create();
        if (sender) {
            request.sender = sender;
        }
        if (receiver) {
            request.receiver = receiver;
        }
        if (limit) {
            request.limit = limit;
        }
        if (skip) {
            request.skip = skip.toString();
        }
        try {
            const response = await this.retry(() => this.client.GetPeggyDepositTxs(request));
            return IndexerGrpcExplorerTransformer.getPeggyDepositTxsResponseToPeggyDepositTxs(response);
        }
        catch (e) {
            if (e instanceof InjectiveExplorerRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetPeggyDepositTxs',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'GetPeggyDepositTxs',
                contextModule: this.module,
            });
        }
    }
    async fetchPeggyWithdrawalTxs({ sender, receiver, limit, skip, }) {
        const request = InjectiveExplorerRpc.GetPeggyWithdrawalTxsRequest.create();
        if (sender) {
            request.sender = sender;
        }
        if (receiver) {
            request.receiver = receiver;
        }
        if (limit) {
            request.limit = limit;
        }
        if (skip) {
            request.skip = skip.toString();
        }
        try {
            const response = await this.retry(() => this.client.GetPeggyWithdrawalTxs(request));
            return IndexerGrpcExplorerTransformer.getPeggyWithdrawalTxsResponseToPeggyWithdrawalTxs(response);
        }
        catch (e) {
            if (e instanceof InjectiveExplorerRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetPeggyWithdrawalTxs',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'GetPeggyWithdrawalTxs',
                contextModule: this.module,
            });
        }
    }
    async fetchBlocks({ before, after, limit, }) {
        const request = InjectiveExplorerRpc.GetBlocksRequest.create();
        if (before) {
            request.before = before.toString();
        }
        if (after) {
            request.after = after.toString();
        }
        if (limit) {
            request.limit = limit;
        }
        try {
            const response = await this.retry(() => this.client.GetBlocks(request));
            return response;
        }
        catch (e) {
            if (e instanceof InjectiveExplorerRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetBlocks',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'GetBlocks',
                contextModule: this.module,
            });
        }
    }
    async fetchBlock(id) {
        const request = InjectiveExplorerRpc.GetBlockRequest.create();
        request.id = id;
        try {
            const response = await this.retry(() => this.client.GetBlock(request));
            return response;
        }
        catch (e) {
            if (e instanceof InjectiveExplorerRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetBlock',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'GetBlock',
                contextModule: this.module,
            });
        }
    }
    async fetchTxs({ before, after, limit, skip, type, module, }) {
        const request = InjectiveExplorerRpc.GetTxsRequest.create();
        if (before) {
            request.before = before.toString();
        }
        if (after) {
            request.after = after.toString();
        }
        if (limit) {
            request.limit = limit;
        }
        if (skip) {
            request.skip = skip.toString();
        }
        if (type) {
            request.type = type;
        }
        if (module) {
            request.module = module;
        }
        try {
            const response = await this.retry(() => this.client.GetTxs(request));
            return response;
        }
        catch (e) {
            if (e instanceof InjectiveExplorerRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetTxs',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'GetTxs',
                contextModule: this.module,
            });
        }
    }
    async fetchIBCTransferTxs({ sender, receiver, srcChannel, srcPort, destChannel, destPort, limit, skip, }) {
        const request = InjectiveExplorerRpc.GetIBCTransferTxsRequest.create();
        if (sender) {
            request.sender = sender;
        }
        if (receiver) {
            request.receiver = receiver;
        }
        if (limit) {
            request.limit = limit;
        }
        if (skip) {
            request.skip = skip.toString();
        }
        if (srcChannel) {
            request.srcChannel = srcChannel;
        }
        if (srcPort) {
            request.srcPort = srcPort;
        }
        if (destChannel) {
            request.destChannel = destChannel;
        }
        if (destPort) {
            request.destPort = destPort;
        }
        try {
            const response = await this.retry(() => this.client.GetIBCTransferTxs(request));
            return IndexerGrpcExplorerTransformer.getIBCTransferTxsResponseToIBCTransferTxs(response);
        }
        catch (e) {
            if (e instanceof InjectiveExplorerRpc.GrpcWebError) {
                throw new GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'GetIBCTransferTxs',
                    contextModule: this.module,
                });
            }
            throw new GrpcUnaryRequestException(e, {
                code: UnspecifiedErrorCode,
                context: 'GetIBCTransferTxs',
                contextModule: this.module,
            });
        }
    }
}
