"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGasPriceBasedOnMessage = void 0;
const utils_1 = require("@injectivelabs/utils");
const getGasPriceBasedOnMessage = (msgs) => {
    const messages = Array.isArray(msgs) ? msgs : [msgs];
    const messageType = messages[0].toDirectSign().type;
    if (messageType.includes('MsgPrivilegedExecuteContract')) {
        return new utils_1.BigNumberInBase(utils_1.DEFAULT_GAS_LIMIT)
            .times(6)
            .times(messages.length)
            .decimalPlaces(0)
            .toNumber();
    }
    if (messageType.includes('MsgExecuteContract')) {
        return new utils_1.BigNumberInBase(utils_1.DEFAULT_GAS_LIMIT)
            .times(3)
            .times(messages.length)
            .decimalPlaces(0)
            .toNumber();
    }
    if (messageType.includes('wasm')) {
        return new utils_1.BigNumberInBase(utils_1.DEFAULT_GAS_LIMIT)
            .times(1.5)
            .times(messages.length)
            .decimalPlaces(0)
            .toNumber();
    }
    if (messageType.includes('exchange')) {
        return new utils_1.BigNumberInBase(utils_1.DEFAULT_EXCHANGE_LIMIT)
            .times(messages.length)
            .decimalPlaces(0)
            .toNumber();
    }
    if (messageType.includes('gov') &&
        (messageType.includes('MsgDeposit') ||
            messageType.includes('MsgSubmitProposal'))) {
        return new utils_1.BigNumberInBase(utils_1.DEFAULT_GAS_LIMIT)
            .times(15)
            .times(messages.length)
            .decimalPlaces(0)
            .toNumber();
    }
    if (messageType.includes('MsgTransfer')) {
        return new utils_1.BigNumberInBase(utils_1.DEFAULT_IBC_GAS_LIMIT)
            .times(messages.length)
            .toNumber();
    }
    return new utils_1.BigNumberInBase(utils_1.DEFAULT_GAS_LIMIT)
        .times(messages.length)
        .toNumber();
};
exports.getGasPriceBasedOnMessage = getGasPriceBasedOnMessage;
//# sourceMappingURL=msgs.js.map