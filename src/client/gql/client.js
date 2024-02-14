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
exports.ApolloConsumer = void 0;
const core_1 = require("@apollo/client/core");
const exceptions_1 = require("@injectivelabs/exceptions");
const queries_1 = require("./queries");
/**
 * @hidden
 */
class ApolloConsumer {
    constructor(graphQlEndpoint) {
        this.apolloClient = new core_1.ApolloClient({
            uri: graphQlEndpoint,
            cache: new core_1.InMemoryCache(),
            defaultOptions: {
                query: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'all',
                },
            },
        });
    }
    fetchUserDeposits(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield this.apolloClient.query({
                query: queries_1.USER_DEPOSITS,
                variables: {
                    destination: `0x${'0'.repeat(24)}${address
                        .toLowerCase()
                        .replace('0x', '')}`,
                },
            }));
            if (response.errors && response.errors.length > 0) {
                throw new exceptions_1.HttpRequestException(new Error(response.errors[0].message));
            }
            return response.data.deposits;
        });
    }
    fetchUserBridgeDeposits(address, timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield this.apolloClient.query({
                query: queries_1.USER_BRIDGE_DEPOSITS,
                variables: {
                    timestamp,
                    sender: address,
                },
            }));
            if (response.errors && response.errors.length > 0) {
                throw new exceptions_1.HttpRequestException(new Error(response.errors[0].message));
            }
            return response.data.deposits;
        });
    }
}
exports.ApolloConsumer = ApolloConsumer;
