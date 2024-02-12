"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgsOrMsgExecMsgs = void 0;
const MsgExec_1 = __importDefault(require("./msgs/MsgExec"));
const msgsOrMsgExecMsgs = (msgs, grantee) => {
    const actualMsgs = Array.isArray(msgs) ? msgs : [msgs];
    if (!grantee) {
        return actualMsgs;
    }
    return actualMsgs.map((msg) => MsgExec_1.default.fromJSON({ grantee, msgs: msg }));
};
exports.msgsOrMsgExecMsgs = msgsOrMsgExecMsgs;
//# sourceMappingURL=utils.js.map