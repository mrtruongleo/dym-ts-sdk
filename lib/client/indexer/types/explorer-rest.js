"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorUptimeStatus = exports.AccessType = exports.AccessTypeCode = void 0;
var AccessTypeCode;
(function (AccessTypeCode) {
    AccessTypeCode[AccessTypeCode["AccessTypeUnspecified"] = 0] = "AccessTypeUnspecified";
    AccessTypeCode[AccessTypeCode["AccessTypeNobody"] = 1] = "AccessTypeNobody";
    AccessTypeCode[AccessTypeCode["AccessTypeOnlyAddress"] = 2] = "AccessTypeOnlyAddress";
    AccessTypeCode[AccessTypeCode["AccessTypeEverybody"] = 3] = "AccessTypeEverybody";
    AccessTypeCode[AccessTypeCode["AccessTypeAnyOfAddresses"] = 4] = "AccessTypeAnyOfAddresses";
})(AccessTypeCode || (exports.AccessTypeCode = AccessTypeCode = {}));
var AccessType;
(function (AccessType) {
    AccessType["AccessTypeUnspecified"] = "Unspecified";
    AccessType["AccessTypeNobody"] = "Nobody";
    AccessType["AccessTypeOnlyAddress"] = "Only Address";
    AccessType["AccessTypeEverybody"] = "Everybody";
    AccessType["AccessTypeAnyOfAddresses"] = "Any of Addresses";
})(AccessType || (exports.AccessType = AccessType = {}));
var ValidatorUptimeStatus;
(function (ValidatorUptimeStatus) {
    ValidatorUptimeStatus["Proposed"] = "proposed";
    ValidatorUptimeStatus["Signed"] = "signed";
    ValidatorUptimeStatus["Missed"] = "missed";
})(ValidatorUptimeStatus || (exports.ValidatorUptimeStatus = ValidatorUptimeStatus = {}));
