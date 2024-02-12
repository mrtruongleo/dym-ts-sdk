import { BaseWasmQuery } from '../../BaseWasmQuery';
import { toBase64 } from '../../../../utils';
export class QueryResolverAddress extends BaseWasmQuery {
    toPayload() {
        return toBase64({
            resolver: {
                node: this.params.node,
            },
        });
    }
}
