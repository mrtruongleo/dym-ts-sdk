"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxGrpcClient = exports.TxRestClient = void 0;
const TxRestApi_1 = require("../api/TxRestApi");
Object.defineProperty(exports, "TxRestClient", { enumerable: true, get: function () { return TxRestApi_1.TxRestApi; } });
const TxGrpcApi_1 = require("../api/TxGrpcApi");
Object.defineProperty(exports, "TxGrpcClient", { enumerable: true, get: function () { return TxGrpcApi_1.TxGrpcApi; } });
__exportStar(require("./TxGrpcApi"), exports);
__exportStar(require("./TxRestApi"), exports);
__exportStar(require("./utils"), exports);
//# sourceMappingURL=index.js.map