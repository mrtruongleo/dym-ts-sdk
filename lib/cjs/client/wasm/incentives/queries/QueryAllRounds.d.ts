import { BaseWasmQuery } from '../../BaseWasmQuery';
export declare namespace QueryAllRoundsArg {
    interface Params {
        startAfter?: string;
        limit?: number;
    }
}
export declare class QueryAllRounds extends BaseWasmQuery<QueryAllRoundsArg.Params> {
    toPayload(): string;
}
