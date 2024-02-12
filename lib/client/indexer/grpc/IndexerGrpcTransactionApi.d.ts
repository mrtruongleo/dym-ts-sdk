import { AccountAddress, EthereumChainId } from '@injectivelabs/ts-types';
import { InjectiveExchangeRpc } from '@injectivelabs/indexer-proto-ts';
import { CosmosTxV1Beta1Tx } from '@injectivelabs/core-proto-ts';
/**
 * @category Indexer Grpc API
 */
export declare class IndexerGrpcTransactionApi {
    protected module: string;
    protected client: InjectiveExchangeRpc.InjectiveExchangeRPCClientImpl;
    constructor(endpoint: string);
    prepareTxRequest({ address, chainId, message, memo, estimateGas, gasLimit, feeDenom, feePrice, timeoutHeight, }: {
        address: AccountAddress;
        chainId: EthereumChainId;
        message: any;
        estimateGas?: boolean;
        gasLimit?: number;
        memo?: string | number;
        timeoutHeight?: number;
        feeDenom?: string;
        feePrice?: string;
    }): Promise<InjectiveExchangeRpc.PrepareTxResponse>;
    prepareCosmosTxRequest({ memo, address, message, estimateGas, gasLimit, feeDenom, feePrice, timeoutHeight, }: {
        address: string;
        message: any;
        estimateGas?: boolean;
        gasLimit?: number;
        memo?: string | number;
        timeoutHeight?: number;
        feeDenom?: string;
        feePrice?: string;
    }): Promise<InjectiveExchangeRpc.PrepareCosmosTxResponse>;
    prepareExchangeTxRequest({ address, chainId, message, memo, estimateGas, gasLimit, feeDenom, feePrice, timeoutHeight, delegatedFee, }: {
        address: AccountAddress;
        chainId: EthereumChainId;
        message: any;
        estimateGas?: boolean;
        gasLimit?: number;
        memo?: string | number;
        feeDenom?: string;
        feePrice?: string;
        timeoutHeight?: number;
        delegatedFee?: boolean;
    }): Promise<InjectiveExchangeRpc.PrepareTxResponse>;
    /**
     * Keep in mind that the transaction is just added
     * to the mempool, we need to query the transaction hash
     * if we want to ensure that the transaction is included
     * in the block
     */
    broadcastTxRequest({ signature, chainId, message, txResponse, }: {
        signature: string;
        chainId: EthereumChainId;
        useCorrectEIP712Hash?: boolean;
        txResponse: InjectiveExchangeRpc.PrepareTxResponse;
        message: Record<string, any>;
    }): Promise<InjectiveExchangeRpc.BroadcastTxResponse>;
    /**
     * Keep in mind that the transaction is just added
     * to the mempool, we need to query the transaction hash
     * if we want to ensure that the transaction is included
     * in the block
     */
    broadcastCosmosTxRequest({ address, signature, txRaw, pubKey, }: {
        address: string;
        signature: string;
        txRaw: CosmosTxV1Beta1Tx.TxRaw;
        pubKey: {
            type: string;
            value: string;
        };
    }): Promise<InjectiveExchangeRpc.BroadcastCosmosTxResponse>;
    fetchFeePayer(): Promise<InjectiveExchangeRpc.GetFeePayerResponse>;
}
