import { BaseWasmQuery } from '../../BaseWasmQuery';
export declare namespace QueryOutputQuantityArg {
    interface Params {
        fromQuantity: string;
        sourceDenom: string;
        targetDenom: string;
    }
}
export declare class QueryOutputQuantity extends BaseWasmQuery<QueryOutputQuantityArg.Params> {
    toPayload(): string;
}
