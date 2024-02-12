"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloConsumer = void 0;
const core_1 = require("@apollo/client/core");
const exceptions_1 = require("@injectivelabs/exceptions");
const queries_1 = require("./queries");
/**
 * @hidden
 */
class ApolloConsumer {
    apolloClient;
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
    async fetchUserDeposits(address) {
        const response = (await this.apolloClient.query({
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
    }
    async fetchUserBridgeDeposits(address, timestamp) {
        const response = (await this.apolloClient.query({
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
    }
}
exports.ApolloConsumer = ApolloConsumer;
//# sourceMappingURL=client.js.map