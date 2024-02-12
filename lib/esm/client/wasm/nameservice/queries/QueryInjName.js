import { BaseWasmQuery } from '../../BaseWasmQuery';
import { toBase64 } from '../../../../utils';
export class QueryInjName extends BaseWasmQuery {
    toPayload() {
        return toBase64({
            name: {
                address: this.params.address,
            },
        });
    }
}
