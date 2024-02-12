"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEip712TypedDataV2 = exports.getEip712TypedData = void 0;
const utils_1 = require("./utils");
const utils_2 = require("./utils");
const getEip712TypedData = ({ msgs, tx, fee, ethereumChainId, }) => {
    const messages = Array.isArray(msgs) ? msgs : [msgs];
    const eip712Msgs = messages.map((m) => m.toEip712());
    const eip712MessageTypes = messages[0].toEip712Types();
    const types = (0, utils_1.getDefaultEip712Types)();
    const typesWithMessageTypes = {
        types: {
            ...types.types,
            ...Object.fromEntries(eip712MessageTypes),
        },
    };
    const typesWithFeePayer = (0, utils_1.getTypesIncludingFeePayer)({
        fee,
        types: typesWithMessageTypes,
    });
    return {
        ...typesWithFeePayer,
        primaryType: 'Tx',
        ...(0, utils_1.getEip712Domain)(ethereumChainId),
        message: {
            ...(0, utils_1.getEipTxDetails)(tx),
            ...(0, utils_1.getEip712Fee)(fee),
            msgs: eip712Msgs,
        },
    };
};
exports.getEip712TypedData = getEip712TypedData;
const getEip712TypedDataV2 = ({ msgs, tx, fee, ethereumChainId, }) => {
    const messages = Array.isArray(msgs) ? msgs : [msgs];
    const eip712Msgs = messages.map((m) => m.toWeb3());
    const types = (0, utils_1.getDefaultEip712TypesV2)();
    return {
        ...types,
        primaryType: 'Tx',
        ...(0, utils_1.getEip712DomainV2)(ethereumChainId),
        message: {
            context: JSON.stringify((0, utils_2.getEipTxContext)({ ...tx, fee })),
            msgs: JSON.stringify(eip712Msgs),
        },
    };
};
exports.getEip712TypedDataV2 = getEip712TypedDataV2;
//# sourceMappingURL=eip712.js.map