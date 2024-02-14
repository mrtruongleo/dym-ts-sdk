"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecArgBase_1 = require("../ExecArgBase");
const utf8_1 = require("./../../../../utils/utf8");
/**
 * @category Contract Exec Arguments
 */
class ExecArgInitiateTransfer extends ExecArgBase_1.ExecArgBase {
    static fromJSON(params) {
        return new ExecArgInitiateTransfer(params);
    }
    toData() {
        const { params } = this;
        return Object.assign({ nonce: Math.round(Math.random() * 100000), asset: {
                amount: params.amount,
                info: params.info,
            }, recipient_chain: params.recipientChainId, recipient: (0, utf8_1.binaryToBase64)(params.recipient), fee: params.relayerFee || '0' }, (params.payload && { payload: (0, utf8_1.binaryToBase64)(params.payload) }));
    }
    toExecData() {
        const data = this.toData();
        const action = data.payload
            ? 'initiate_transfer_with_payload'
            : 'initiate_transfer';
        return (0, ExecArgBase_1.dataToExecData)(action, this.toData());
    }
}
exports.default = ExecArgInitiateTransfer;
