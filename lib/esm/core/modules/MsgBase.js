"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgBase = void 0;
const maps_1 = require("./tx/eip712/maps");
const utils_1 = require("./utils");
/**
 * @category Messages
 */
class MsgBase {
    params;
    constructor(params) {
        this.params = params;
    }
    toJSON() {
        return JSON.stringify((0, utils_1.prepareSignBytes)(this.toData()));
    }
    /**
     * Returns the types of the message for EIP712
     */
    toEip712Types() {
        const amino = this.toAmino();
        return (0, maps_1.objectKeysToEip712Types)({
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
            value: (0, maps_1.mapValuesToProperValueType)(value, type),
        };
    }
    toDirectSignJSON() {
        return JSON.stringify((0, utils_1.prepareSignBytes)(this.toDirectSign()));
    }
}
exports.MsgBase = MsgBase;
//# sourceMappingURL=MsgBase.js.map