export * from './exchange';
export * from './pagination';
export var StreamOperation;
(function (StreamOperation) {
    StreamOperation["Insert"] = "insert";
    StreamOperation["Delete"] = "delete";
    StreamOperation["Replace"] = "replace";
    StreamOperation["Update"] = "update";
    StreamOperation["Invalidate"] = "invalidate";
})(StreamOperation || (StreamOperation = {}));
