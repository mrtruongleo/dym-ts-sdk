export var AccessTypeCode;
(function (AccessTypeCode) {
    AccessTypeCode[AccessTypeCode["AccessTypeUnspecified"] = 0] = "AccessTypeUnspecified";
    AccessTypeCode[AccessTypeCode["AccessTypeNobody"] = 1] = "AccessTypeNobody";
    AccessTypeCode[AccessTypeCode["AccessTypeOnlyAddress"] = 2] = "AccessTypeOnlyAddress";
    AccessTypeCode[AccessTypeCode["AccessTypeEverybody"] = 3] = "AccessTypeEverybody";
    AccessTypeCode[AccessTypeCode["AccessTypeAnyOfAddresses"] = 4] = "AccessTypeAnyOfAddresses";
})(AccessTypeCode || (AccessTypeCode = {}));
export var AccessType;
(function (AccessType) {
    AccessType["AccessTypeUnspecified"] = "Unspecified";
    AccessType["AccessTypeNobody"] = "Nobody";
    AccessType["AccessTypeOnlyAddress"] = "Only Address";
    AccessType["AccessTypeEverybody"] = "Everybody";
    AccessType["AccessTypeAnyOfAddresses"] = "Any of Addresses";
})(AccessType || (AccessType = {}));
export var ValidatorUptimeStatus;
(function (ValidatorUptimeStatus) {
    ValidatorUptimeStatus["Proposed"] = "proposed";
    ValidatorUptimeStatus["Signed"] = "signed";
    ValidatorUptimeStatus["Missed"] = "missed";
})(ValidatorUptimeStatus || (ValidatorUptimeStatus = {}));
