import { BaseWasmQuery } from '../../BaseWasmQuery';
export declare namespace QueryResolverAddress {
    interface Params {
        node: number[];
    }
}
export declare class QueryResolverAddress extends BaseWasmQuery<QueryResolverAddress.Params> {
    toPayload(): string;
}
