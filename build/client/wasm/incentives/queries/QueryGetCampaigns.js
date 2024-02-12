import { BaseWasmQuery } from '../../BaseWasmQuery';
import { toBase64 } from '../../../../utils';
export class QueryGetCampaigns extends BaseWasmQuery {
    toPayload() {
        const payload = {
            get_campaigns: {
                campaigns: this.params.campaigns,
            },
        };
        return toBase64(payload);
    }
}
