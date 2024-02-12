import { BaseWasmQuery } from '../../BaseWasmQuery';
import { toBase64 } from '../../../../utils';
export class QueryOutputQuantity extends BaseWasmQuery {
    toPayload() {
        return toBase64({
            get_output_quantity: {
                from_quantity: this.params.fromQuantity,
                source_denom: this.params.sourceDenom,
                target_denom: this.params.targetDenom,
            },
        });
    }
}
