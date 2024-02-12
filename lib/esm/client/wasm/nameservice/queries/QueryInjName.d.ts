import { BaseWasmQuery } from '../../BaseWasmQuery';
export declare namespace QueryInjName {
    interface Params {
        address: string;
    }
}
export declare class QueryInjName extends BaseWasmQuery<QueryInjName.Params> {
    toPayload(): string;
}
