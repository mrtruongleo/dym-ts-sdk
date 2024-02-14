"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcExplorerTransformer = void 0;
const utils_1 = require("../../../utils");
/**
 * @category Indexer Grpc Transformer
 */
class IndexerGrpcExplorerTransformer {
    static getTxByTxHashResponseToTx(tx) {
        return IndexerGrpcExplorerTransformer.grpcTransactionToTransaction(tx);
    }
    static getAccountTxsResponseToAccountTxs(response) {
        const txs = response.data;
        const pagination = response.paging;
        return {
            txs: IndexerGrpcExplorerTransformer.grpcTransactionsToTransactionsFromDetail(txs),
            pagination: (0, utils_1.grpcPagingToPaging)(pagination),
        };
    }
    static getValidatorUptimeResponseToValidatorUptime(response) {
        const data = response.data;
        return data.map((field) => IndexerGrpcExplorerTransformer.grpcValidatorUptimeToValidatorUptime(field));
    }
    static getPeggyDepositTxsResponseToPeggyDepositTxs(response) {
        return response.field.map((field) => IndexerGrpcExplorerTransformer.grpcPeggyDepositTx(field));
    }
    static getPeggyWithdrawalTxsResponseToPeggyWithdrawalTxs(response) {
        return response.field.map((field) => IndexerGrpcExplorerTransformer.grpcPeggyWithdrawalTx(field));
    }
    static getIBCTransferTxsResponseToIBCTransferTxs(response) {
        return response.field.map((field) => IndexerGrpcExplorerTransformer.grpcIBCTransferTxToIBCTransferTx(field));
    }
    static validatorResponseToValidator(validator) {
        const data = validator.data;
        return {
            id: data.id,
            moniker: data.moniker,
            operatorAddress: data.operatorAddress,
            consensusAddress: data.consensusAddress,
            jailed: data.jailed,
            status: data.status,
            tokens: data.tokens,
            delegatorShares: data.delegatorShares,
            description: IndexerGrpcExplorerTransformer.grpcValidatorDescriptionToValidatorDescription(data.description),
            unbondingHeight: parseInt(data.unbondingHeight, 10),
            unbondingTime: data.unbondingTime,
            commissionRate: data.commissionRate,
            commissionMaxRate: data.commissionMaxRate,
            commissionMaxChangeRate: data.commissionMaxChangeRate,
            commissionUpdateTime: data.commissionUpdateTime,
            proposed: parseInt(data.proposed, 10),
            signed: parseInt(data.signed, 10),
            missed: parseInt(data.missed, 10),
            uptimePercentage: data.uptimePercentage,
            imageUrl: data.imageUrl,
            timestamp: data.timestamp,
            uptimesList: data.uptimes.map(IndexerGrpcExplorerTransformer.grpcValidatorUptimeToValidatorUptime),
            slashingEventsList: data.slashingEvents.map(IndexerGrpcExplorerTransformer.grpcValidatorSlashingEventToValidatorSlashingEvent),
        };
    }
    static streamTxResponseToTxs(response) {
        return {
            id: response.id,
            blockNumber: parseInt(response.blockNumber, 10),
            blockTimestamp: response.blockTimestamp,
            hash: response.hash,
            codespace: response.codespace,
            messages: response.messages,
            txNumber: parseInt(response.txNumber, 10),
            errorLog: response.errorLog,
            code: response.code,
        };
    }
    static grpcGasFeeToGasFee(gasFee) {
        const amounts = gasFee.amount.map((amount) => ({
            amount: amount.amount,
            denom: amount.denom,
        }));
        return {
            amounts,
            gasLimit: parseInt(gasFee.gasLimit, 10),
            payer: gasFee.payer,
            granter: gasFee.granter,
        };
    }
    static grpcTransactionToBankMsgSendTransaction(tx) {
        const data = tx.data;
        const [message] = JSON.parse(Buffer.from(data.messages).toString());
        return {
            blockNumber: parseInt(data.blockNumber, 10),
            blockTimestamp: data.blockTimestamp,
            hash: data.hash,
            amount: message.value.amount[0].amount,
            denom: message.value.amount[0].denom,
            sender: message.value.from_address,
            receiver: message.value.to_address,
        };
    }
    static grpcTransactionToTransaction(tx) {
        const data = tx.data;
        return {
            id: data.id,
            blockNumber: parseInt(data.blockNumber, 10),
            blockTimestamp: data.blockTimestamp,
            hash: data.hash,
            code: data.code,
            info: data.info,
            gasWanted: parseInt(data.gasWanted, 10),
            gasUsed: parseInt(data.gasUsed, 10),
            codespace: data.codespace,
            data: data.data,
            gasFee: IndexerGrpcExplorerTransformer.grpcGasFeeToGasFee(data.gasFee),
            txType: data.txType,
            signatures: data.signatures.map((signature) => ({
                pubkey: signature.pubkey,
                address: signature.address,
                sequence: parseInt(signature.sequence, 10),
                signature: signature.signature,
            })),
            events: data.events.map((event) => ({
                type: event.type,
                attributes: event.attributes,
            })),
            messages: JSON.parse(Buffer.from(data.messages).toString()),
        };
    }
    static grpcTransactionsToTransactions(txs) {
        return txs.map((tx) => IndexerGrpcExplorerTransformer.grpcTransactionToTransaction(tx));
    }
    static grpcTransactionToTransactionFromDetail(tx) {
        const messages = JSON.parse(Buffer.from(tx.messages).toString('utf8'));
        return Object.assign(Object.assign({}, tx), { gasWanted: parseInt(tx.gasWanted, 10), gasUsed: parseInt(tx.gasUsed, 10), blockNumber: parseInt(tx.blockNumber, 10), signatures: tx.signatures.map((signature) => ({
                pubkey: signature.pubkey,
                address: signature.address,
                sequence: parseInt(signature.sequence, 10),
                signature: signature.signature,
            })), gasFee: tx.gasFee
                ? IndexerGrpcExplorerTransformer.grpcGasFeeToGasFee(tx.gasFee)
                : {
                    gasLimit: 0,
                    payer: '',
                    granter: '',
                    amounts: [],
                }, events: tx.events.map((event) => ({
                type: event.type,
                attributes: event.attributes,
            })), messages });
    }
    static grpcTransactionsToTransactionsFromDetail(txs) {
        return txs.map(IndexerGrpcExplorerTransformer.grpcTransactionToTransactionFromDetail);
    }
    static grpcBlockToBlock(block) {
        return {
            height: parseInt(block.height, 10),
            proposer: block.proposer,
            moniker: block.moniker,
            blockHash: block.blockHash,
            parentHash: block.parentHash,
            numPreCommits: parseInt(block.numPreCommits, 10),
            numTxs: parseInt(block.numTxs, 10),
            timestamp: block.timestamp,
        };
    }
    static grpcBlockToBlockWithTxs(block) {
        return {
            height: parseInt(block.height, 10),
            proposer: block.proposer,
            moniker: block.moniker,
            blockHash: block.blockHash,
            parentHash: block.parentHash,
            numPreCommits: parseInt(block.numPreCommits, 10),
            numTxs: parseInt(block.numTxs, 10),
            timestamp: block.timestamp,
        };
    }
    static grpcBlocksToBlocks(blocks) {
        return blocks.map((block) => IndexerGrpcExplorerTransformer.grpcBlockToBlock(block));
    }
    static grpcBlocksToBlocksWithTxs(blocks) {
        return blocks.map((block) => IndexerGrpcExplorerTransformer.grpcBlockToBlockWithTxs(block));
    }
    static grpcValidatorDescriptionToValidatorDescription(validatorDescription) {
        return {
            moniker: validatorDescription.moniker,
            identity: validatorDescription.identity,
            website: validatorDescription.website,
            securityContact: validatorDescription.securityContact,
            details: validatorDescription.details,
        };
    }
    static grpcValidatorUptimeToValidatorUptime(validatorUptime) {
        return {
            blockNumber: parseInt(validatorUptime.blockNumber, 10),
            status: validatorUptime.status,
        };
    }
    static grpcValidatorSlashingEventToValidatorSlashingEvent(validatorUptime) {
        return {
            blockNumber: parseInt(validatorUptime.blockNumber, 10),
            blockTimestamp: validatorUptime.blockTimestamp,
            address: validatorUptime.address,
            power: parseInt(validatorUptime.power, 10),
            reason: validatorUptime.reason,
            jailed: validatorUptime.jailed,
            missedBlocks: parseInt(validatorUptime.missedBlocks, 10),
        };
    }
    static grpcIBCTransferTxToIBCTransferTx(grpcIBCTransferTx) {
        return {
            sender: grpcIBCTransferTx.sender,
            receiver: grpcIBCTransferTx.receiver,
            sourcePort: grpcIBCTransferTx.sourcePort,
            sourceChannel: grpcIBCTransferTx.sourceChannel,
            destinationPort: grpcIBCTransferTx.destinationPort,
            destinationChannel: grpcIBCTransferTx.destinationChannel,
            amount: grpcIBCTransferTx.amount,
            denom: grpcIBCTransferTx.denom,
            timeoutHeight: grpcIBCTransferTx.timeoutHeight,
            timeoutTimestamp: parseInt(grpcIBCTransferTx.timeoutTimestamp, 10),
            packetSequence: parseInt(grpcIBCTransferTx.packetSequence, 10),
            dataHex: grpcIBCTransferTx.dataHex,
            state: grpcIBCTransferTx.state,
            txHashesList: grpcIBCTransferTx.txHashes,
            createdAt: grpcIBCTransferTx.createdAt,
            updatedAt: grpcIBCTransferTx.updatedAt,
        };
    }
    static grpcPeggyDepositTx(grpcPeggyDepositTx) {
        return {
            sender: grpcPeggyDepositTx.sender,
            receiver: grpcPeggyDepositTx.receiver,
            eventNonce: parseInt(grpcPeggyDepositTx.eventNonce, 10),
            eventHeight: parseInt(grpcPeggyDepositTx.eventHeight, 10),
            amount: grpcPeggyDepositTx.amount,
            denom: grpcPeggyDepositTx.denom,
            orchestratorAddress: grpcPeggyDepositTx.orchestratorAddress,
            state: grpcPeggyDepositTx.state,
            claimType: grpcPeggyDepositTx.claimType,
            txHashesList: grpcPeggyDepositTx.txHashes,
            createdAt: grpcPeggyDepositTx.createdAt,
            updatedAt: grpcPeggyDepositTx.updatedAt,
        };
    }
    static grpcPeggyWithdrawalTx(grpcPeggyWithdrawalTx) {
        return {
            sender: grpcPeggyWithdrawalTx.sender,
            receiver: grpcPeggyWithdrawalTx.receiver,
            amount: grpcPeggyWithdrawalTx.amount,
            denom: grpcPeggyWithdrawalTx.denom,
            bridgeFee: grpcPeggyWithdrawalTx.bridgeFee,
            outgoingTxId: parseInt(grpcPeggyWithdrawalTx.outgoingTxId, 10),
            batchTimeout: parseInt(grpcPeggyWithdrawalTx.batchTimeout, 10),
            batchNonce: parseInt(grpcPeggyWithdrawalTx.batchNonce, 10),
            eventNonce: parseInt(grpcPeggyWithdrawalTx.eventNonce, 10),
            eventHeight: parseInt(grpcPeggyWithdrawalTx.eventHeight, 10),
            orchestratorAddress: grpcPeggyWithdrawalTx.orchestratorAddress,
            state: grpcPeggyWithdrawalTx.state,
            claimType: grpcPeggyWithdrawalTx.claimType,
            txHashesList: grpcPeggyWithdrawalTx.txHashes,
            createdAt: grpcPeggyWithdrawalTx.createdAt,
            updatedAt: grpcPeggyWithdrawalTx.updatedAt,
        };
    }
}
exports.IndexerGrpcExplorerTransformer = IndexerGrpcExplorerTransformer;
