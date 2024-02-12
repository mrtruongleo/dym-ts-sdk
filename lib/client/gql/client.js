var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApolloClient, InMemoryCache, } from '@apollo/client/core';
import { HttpRequestException } from '@injectivelabs/exceptions';
import { USER_DEPOSITS, USER_BRIDGE_DEPOSITS } from './queries';
/**
 * @hidden
 */
export class ApolloConsumer {
    constructor(graphQlEndpoint) {
        this.apolloClient = new ApolloClient({
            uri: graphQlEndpoint,
            cache: new InMemoryCache(),
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
                query: USER_DEPOSITS,
                variables: {
                    destination: `0x${'0'.repeat(24)}${address
                        .toLowerCase()
                        .replace('0x', '')}`,
                },
            }));
            if (response.errors && response.errors.length > 0) {
                throw new HttpRequestException(new Error(response.errors[0].message));
            }
            return response.data.deposits;
        });
    }
    fetchUserBridgeDeposits(address, timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield this.apolloClient.query({
                query: USER_BRIDGE_DEPOSITS,
                variables: {
                    timestamp,
                    sender: address,
                },
            }));
            if (response.errors && response.errors.length > 0) {
                throw new HttpRequestException(new Error(response.errors[0].message));
            }
            return response.data.deposits;
        });
    }
}
