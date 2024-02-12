import { PrivateKey } from '../../../accounts';
import { Msgs } from '../../msgs';
import { ChainId, EthereumChainId } from '@injectivelabs/ts-types';
import { Network, NetworkEndpoints } from '@injectivelabs/networks';
interface MsgBroadcasterTxOptions {
    msgs: Msgs | Msgs[];
    memo?: string;
    gas?: {
        gasPrice?: string;
        gas?: number; /** gas limit */
        feePayer?: string;
        granter?: string;
    };
}
interface MsgBroadcasterWithPkOptions {
    network: Network;
    /**
     * Only used if we want to override the default
     * endpoints taken from the network param
     */
    endpoints?: {
        indexer: string;
        grpc: string;
        rest: string;
    };
    privateKey: string | PrivateKey;
    ethereumChainId?: EthereumChainId;
    simulateTx?: boolean;
    loggingEnabled?: boolean;
    txTimeout?: number;
    gasBufferCoefficient?: number;
}
/**
 * This class is used to broadcast transactions
 * using a privateKey as a signer
 * for the transactions and broadcasting
 * the transactions directly to the node
 *
 * Mainly used for working in a Node Environment
 */
export declare class MsgBroadcasterWithPk {
    endpoints: NetworkEndpoints;
    chainId: ChainId;
    ethereumChainId?: EthereumChainId;
    privateKey: PrivateKey;
    simulateTx: boolean;
    gasBufferCoefficient: number;
    txTimeout: number;
    constructor(options: MsgBroadcasterWithPkOptions);
    /**
     * Broadcasting the transaction using the client
     *
     * @param tx
     * @returns {string} transaction hash
     */
    broadcast(transaction: MsgBroadcasterTxOptions): Promise<import("../types").TxResponse>;
    /**
     * Broadcasting the transaction with fee delegation services
     *
     * @param tx
     * @returns {string} transaction hash
     */
    broadcastWithFeeDelegation(transaction: MsgBroadcasterTxOptions): Promise<import("../types").TxResponse>;
    /**
     * Broadcasting the transaction using the client
     *
     * @param tx
     * @returns {string} transaction hash
     */
    simulate(transaction: MsgBroadcasterTxOptions): Promise<{
        result: {
            data: string | Uint8Array;
            log: string;
            eventsList: import("@injectivelabs/core-proto-ts/cjs/tendermint/abci/types").Event[];
            events?: import("@injectivelabs/core-proto-ts/cjs/tendermint/abci/types").Event[] | undefined;
            msgResponses?: import("@injectivelabs/core-proto-ts/cjs/google/protobuf/any").Any[] | undefined;
        };
        gasInfo: {
            gasWanted: number;
            gasUsed: number;
        };
    }>;
    /**
     * In case we don't want to simulate the transaction
     * we get the gas limit based on the message type.
     *
     * If we want to simulate the transaction we set the
     * gas limit based on the simulation and add a small multiplier
     * to be safe (factor of 1.1 (or user specified))
     */
    private getTxWithStdFee;
    /**
     * Create TxRaw and simulate it
     */
    private simulateTxRaw;
    private prepareTxForBroadcast;
    private getAccountDetails;
    private broadcastTxRaw;
}
export {};
