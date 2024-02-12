import { BaseWasmQuery } from '../../BaseWasmQuery';
import { toBase64 } from '../../../../utils';
export class QueryInjectiveAddress extends BaseWasmQuery {
    toPayload() {
        return toBase64({
            address: {
                node: this.params.node,
            },
        });
    }
}
