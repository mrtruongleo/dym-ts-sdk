import { BaseWasmQuery } from '../../BaseWasmQuery';
export declare namespace QueryAllRoutesArg {
    interface Params {
    }
}
export declare class QueryAllRoutes extends BaseWasmQuery<QueryAllRoutesArg.Params> {
    toPayload(): string;
}
