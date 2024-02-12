import MsgExec from './msgs/MsgExec';
export const msgsOrMsgExecMsgs = (msgs, grantee) => {
    const actualMsgs = Array.isArray(msgs) ? msgs : [msgs];
    if (!grantee) {
        return actualMsgs;
    }
    return actualMsgs.map((msg) => MsgExec.fromJSON({ grantee, msgs: msg }));
};
