import { BaseWasmQuery } from '../../BaseWasmQuery';
export declare namespace QueryRouteArg {
    interface Params {
        sourceDenom: string;
        targetDenom: string;
    }
}
export declare class QueryRoute extends BaseWasmQuery<QueryRouteArg.Params> {
    toPayload(): string;
}
