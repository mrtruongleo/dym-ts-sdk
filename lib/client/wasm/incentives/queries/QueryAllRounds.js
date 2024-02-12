import { BaseWasmQuery } from '../../BaseWasmQuery';
import { toBase64 } from '../../../../utils';
export class QueryAllRounds extends BaseWasmQuery {
    toPayload() {
        const payload = {
            all_rounds: {
                ...(this.params.limit ? { limit: this.params.limit } : {}),
                ...(this.params.startAfter
                    ? {
                        start_after: this.params.startAfter,
                    }
                    : {}),
            },
        };
        return toBase64(payload);
    }
}
