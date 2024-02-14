"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@injectivelabs/utils");
const exceptions_1 = require("@injectivelabs/exceptions");
const http_status_codes_1 = require("http-status-codes");
/**
 * @hidden
 */
class BaseRestConsumer extends utils_1.HttpRestClient {
    retry(httpCall, retries = 3, delay = 1000) {
        const retryHttpCall = (attempt = 1) => __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield httpCall());
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
        });
        return retryHttpCall();
    }
}
exports.default = BaseRestConsumer;
