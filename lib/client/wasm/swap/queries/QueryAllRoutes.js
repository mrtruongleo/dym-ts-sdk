import { BaseWasmQuery } from '../../BaseWasmQuery';
import { toBase64 } from '../../../../utils';
export class QueryAllRoutes extends BaseWasmQuery {
    toPayload() {
        return toBase64({ get_all_routes: {} });
    }
}
