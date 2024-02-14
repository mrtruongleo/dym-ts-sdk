"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitTxBroadcasted = void 0;
const utils_1 = require("@injectivelabs/utils");
const TxGrpcApi_1 = require("./TxGrpcApi");
const TxRestApi_1 = require("./TxRestApi");
const waitTxBroadcasted = (txHash, options) => {
    const timeout = new utils_1.BigNumberInBase((options === null || options === void 0 ? void 0 : options.txTimeout) || utils_1.DEFAULT_BLOCK_TIMEOUT_HEIGHT)
        .times(utils_1.DEFAULT_BLOCK_TIME_IN_SECONDS * 1000)
        .toNumber();
    return options.endpoints.grpc
        ? new TxGrpcApi_1.TxGrpcApi(options.endpoints.grpc).fetchTxPoll(txHash, timeout)
        : new TxRestApi_1.TxRestApi(options.endpoints.rest).fetchTxPoll(txHash, timeout);
};
exports.waitTxBroadcasted = waitTxBroadcasted;
