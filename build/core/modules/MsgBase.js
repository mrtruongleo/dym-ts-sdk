import { mapValuesToProperValueType, objectKeysToEip712Types, } from "./tx/eip712/maps";
import { prepareSignBytes } from "./utils";
/**
 * @category Messages
 */
export class MsgBase {
    params;
    constructor(params) {
        this.params = params;
    }
    toJSON() {
        return JSON.stringify(prepareSignBytes(this.toData()));
    }
    /**
     * Returns the types of the message for EIP712
     */
    toEip712Types() {
        const amino = this.toAmino();
        return objectKeysToEip712Types({
            object: amino.value,
            messageType: amino.type,
        });
    }
    /**
     * Returns the values of the message for EIP712
     */
    toEip712() {
        const amino = this.toAmino();
        const { type, value } = amino;
        return {
            type,
            value: mapValuesToProperValueType(value, type),
        };
    }
    toDirectSignJSON() {
        return JSON.stringify(prepareSignBytes(this.toDirectSign()));
    }
}
