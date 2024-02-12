import { BaseWasmQuery } from '../../BaseWasmQuery';
import { toBase64 } from '../../../../utils';
export class QueryInputQuantity extends BaseWasmQuery {
    toPayload() {
        return toBase64({
            get_input_quantity: {
                to_quantity: this.params.toQuantity,
                source_denom: this.params.sourceDenom,
                target_denom: this.params.targetDenom,
            },
        });
    }
}
