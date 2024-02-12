import BaseRestConsumer from '../../base/BaseRestConsumer';
import { BalancesResponse, DenomBalance } from './../types/bank-rest';
/**
 * @category Chain Rest API
 */
export declare class ChainRestBankApi extends BaseRestConsumer {
    /**
     * Get address's balance
     *
     * @param address address of account to look up
     */
    fetchBalances(address: string, params?: Record<string, any>): Promise<BalancesResponse>;
    /**
     * Get address's balances
     *
     * @param address address of account to look up
     */
    fetchBalance(address: string, denom: string, params?: Record<string, any>): Promise<DenomBalance>;
}
