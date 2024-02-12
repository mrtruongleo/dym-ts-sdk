import { BaseWasmQuery } from '../../BaseWasmQuery';
import { toBase64 } from '../../../../utils';
export class QueryAllRounds extends BaseWasmQuery {
    toPayload() {
        const payload = {
            all_rounds: Object.assign(Object.assign({}, (this.params.limit ? { limit: this.params.limit } : {})), (this.params.startAfter
                ? {
                    start_after: this.params.startAfter,
                }
                : {})),
        };
        return toBase64(payload);
    }
}
