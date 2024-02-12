import { BaseWasmQuery } from '../../BaseWasmQuery';
export declare namespace QueryGetCampaignsArg {
    interface Params {
        campaigns: string[];
    }
}
export declare class QueryGetCampaigns extends BaseWasmQuery<QueryGetCampaignsArg.Params> {
    toPayload(): string;
}
