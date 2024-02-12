/**
 * @hidden
 */
export declare class ApolloConsumer {
    private apolloClient;
    constructor(graphQlEndpoint: string);
    fetchUserDeposits(address: string): Promise<import("./types").UserDeposit[]>;
    fetchUserBridgeDeposits(address: string, timestamp: number): Promise<import("./types").UserDeposit[]>;
}
