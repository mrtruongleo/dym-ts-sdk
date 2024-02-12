"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@injectivelabs/utils");
const exceptions_1 = require("@injectivelabs/exceptions");
const http_status_codes_1 = require("http-status-codes");
/**
 * @hidden
 */
class BaseRestConsumer extends utils_1.HttpRestClient {
    retry(httpCall, retries = 3, delay = 1000) {
        const retryHttpCall = async (attempt = 1) => {
            try {
                return (await httpCall());
            }
            catch (e) {
                if (e instanceof exceptions_1.HttpRequestException) {
                    if (e.code === http_status_codes_1.StatusCodes.REQUEST_TOO_LONG) {
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
exports.default = BaseRestConsumer;
//# sourceMappingURL=BaseRestConsumer.js.map