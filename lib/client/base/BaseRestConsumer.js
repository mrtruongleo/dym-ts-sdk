import { HttpRestClient } from '@injectivelabs/utils';
import { HttpRequestException } from '@injectivelabs/exceptions';
import { StatusCodes } from 'http-status-codes';
/**
 * @hidden
 */
export default class BaseRestConsumer extends HttpRestClient {
    retry(httpCall, retries = 3, delay = 1000) {
        const retryHttpCall = async (attempt = 1) => {
            try {
                return (await httpCall());
            }
            catch (e) {
                if (e instanceof HttpRequestException) {
                    if (e.code === StatusCodes.REQUEST_TOO_LONG) {
                        throw e;
                    }
                }
                if (attempt >= retries) {
                    throw e;
                }
                return new Promise((resolve) => setTimeout(() => resolve(retryHttpCall(attempt + 1)), delay * attempt));
            }
        };
        return retryHttpCall();
    }
}
