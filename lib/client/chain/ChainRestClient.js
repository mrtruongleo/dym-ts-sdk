import { ChainRestAuthApi } from './rest/ChainRestAuthApi';
/**
 * @category Chain Rest API
 * @hidden
 */
export class ChainRestClient {
    constructor(endpoint) {
        this.auth = new ChainRestAuthApi(endpoint);
    }
}
