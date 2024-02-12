"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeAllowance = exports.AllowanceTypes = void 0;
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const exceptions_1 = require("@injectivelabs/exceptions");
var AllowanceTypes;
(function (AllowanceTypes) {
    AllowanceTypes["BasicAllowance"] = "spendLimit";
    AllowanceTypes["PeriodicAllowance"] = "periodSpendLimit";
    AllowanceTypes["AllowedMsgAllowance"] = "allowedMessages";
})(AllowanceTypes || (exports.AllowanceTypes = AllowanceTypes = {}));
function isBasicAllowance(allowance) {
    if (!allowance) {
        return false;
    }
    return AllowanceTypes.BasicAllowance in allowance;
}
function isPeriodicAllowance(allowance) {
    if (!allowance) {
        return false;
    }
    return AllowanceTypes.PeriodicAllowance in allowance;
}
function isAllowedMsgAllowance(allowance) {
    if (!allowance) {
        return false;
    }
    return AllowanceTypes.AllowedMsgAllowance in allowance;
}
function encodeBasicAllowance(allowance) {
    return {
        typeUrl: '/cosmos.feegrant.v1beta1.BasicAllowance',
        value: Buffer.from(core_proto_ts_1.CosmosFeegrantV1Beta1Feegrant.BasicAllowance.encode(allowance).finish()),
    };
}
function encodePeriodicAllowance(allowance) {
    return {
        typeUrl: '/cosmos.feegrant.v1beta1.PeriodicAllowance',
        value: Buffer.from(core_proto_ts_1.CosmosFeegrantV1Beta1Feegrant.PeriodicAllowance.encode(allowance).finish()),
    };
}
function encodeAllowedMsgAllowance(allowance) {
    let internalAllowance;
    if (isBasicAllowance(allowance.allowance)) {
        internalAllowance = encodeBasicAllowance(allowance.allowance);
    }
    else if (isPeriodicAllowance(allowance.allowance)) {
        internalAllowance = encodePeriodicAllowance(allowance.allowance);
    }
    else {
        throw new Error(`AllowedMsgAllowance: Cannot cast allowance into 'BasicAllowance' or 'PeriodicAllowance': ${JSON.stringify(allowance.allowance)}`);
    }
    return {
        typeUrl: '/cosmos.feegrant.v1beta1.AllowedMsgAllowance',
        value: Buffer.from(core_proto_ts_1.CosmosFeegrantV1Beta1Feegrant.AllowedMsgAllowance.encode({
            allowedMessages: allowance.allowedMessages,
            allowance: internalAllowance,
        }).finish()),
    };
}
function encodeAllowance(allowance) {
    if (isBasicAllowance(allowance)) {
        return encodeBasicAllowance(allowance);
    }
    if (isPeriodicAllowance(allowance)) {
        return encodePeriodicAllowance(allowance);
    }
    if (isAllowedMsgAllowance(allowance)) {
        return encodeAllowedMsgAllowance(allowance);
    }
    throw new exceptions_1.GeneralException(new Error(`Cannot cast allowance into 'BasicAllowance', 'PeriodicAllowance' or 'AllowedMsgAllowance': ${JSON.stringify(allowance)}`));
}
exports.encodeAllowance = encodeAllowance;
//# sourceMappingURL=allowance.js.map