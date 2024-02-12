"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxClient = void 0;
const crypto_1 = require("../../../../../utils/crypto");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
class TxClient {
    /**
     * Encode a transaction to base64-encoded protobuf
     * @param tx transaction to encode
     */
    static encode(tx) {
        return Buffer.from(core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.encode(tx).finish()).toString('base64');
    }
    /**
     * Decode a transaction from base64-encoded protobuf
     * @param tx transaction string to decode
     */
    static decode(encodedTx) {
        return core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.decode(Buffer.from(encodedTx, 'base64'));
    }
    /**
     * Get the transaction's hash
     * @param tx transaction to hash
     */
    static hash(tx) {
        return (0, crypto_1.hashToHex)(TxClient.encode(tx));
    }
}
exports.TxClient = TxClient;
//# sourceMappingURL=TxClient.js.map