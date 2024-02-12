import { HttpRestClient } from '@injectivelabs/utils';
/**
 * @hidden
 */
export default class BaseRestConsumer extends HttpRestClient {
    protected retry<TResponse>(httpCall: Function, retries?: number, delay?: number): Promise<TResponse>;
}
