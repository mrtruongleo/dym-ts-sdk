import { ChainRestAuthApi } from './rest/ChainRestAuthApi';
/**
 * @category Chain Rest API
 * @hidden
 */
export class ChainRestClient {
    auth;
    constructor(endpoint) {
        this.auth = new ChainRestAuthApi(endpoint);
    }
}
