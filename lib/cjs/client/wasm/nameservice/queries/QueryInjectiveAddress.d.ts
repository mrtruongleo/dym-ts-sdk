import { BaseWasmQuery } from '../../BaseWasmQuery';
export declare namespace QueryInjectiveAddress {
    interface Params {
        node: number[];
    }
}
export declare class QueryInjectiveAddress extends BaseWasmQuery<QueryInjectiveAddress.Params> {
    toPayload(): string;
}
