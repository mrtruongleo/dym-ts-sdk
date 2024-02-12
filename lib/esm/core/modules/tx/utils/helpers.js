"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEthereumSignerAddress = exports.getInjectiveSignerAddress = exports.createAny = exports.createAnyMessage = void 0;
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const utils_1 = require("../../../../utils");
const check_1 = require("../../../../utils/check");
const createAnyMessage = (msg) => {
    const message = core_proto_ts_1.GoogleProtobufAny.Any.create();
    message.typeUrl = `${msg.type.startsWith("/") ? "" : "/"}${msg.type}`;
    message.value = msg.value;
    return message;
};
exports.createAnyMessage = createAnyMessage;
const createAny = (value, type) => {
    const message = core_proto_ts_1.GoogleProtobufAny.Any.create();
    message.typeUrl = type;
    message.value = value;
    return message;
};
exports.createAny = createAny;
const getInjectiveSignerAddress = (address) => {
    if (!address) {
        return "";
    }
    if ((0, check_1.startWithPrefix)(address)) {
        return address;
    }
    if (address.startsWith("0x")) {
        return (0, utils_1.getInjectiveAddress)(address);
    }
    return "";
};
exports.getInjectiveSignerAddress = getInjectiveSignerAddress;
const getEthereumSignerAddress = (address) => {
    if (!address) {
        return "";
    }
    if (address.startsWith("0x")) {
        return address;
    }
    if ((0, check_1.startWithPrefix)(address)) {
        return (0, utils_1.getEthereumAddress)(address);
    }
    return "";
};
exports.getEthereumSignerAddress = getEthereumSignerAddress;
//# sourceMappingURL=helpers.js.map