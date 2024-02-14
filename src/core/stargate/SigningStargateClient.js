"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigningStargateClient = exports.createDefaultAminoConverters = void 0;
const amino_1 = require("@cosmjs/amino");
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
const proto_signing_1 = require("@cosmjs/proto-signing");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const utils_1 = require("@cosmjs/utils");
const tx_1 = require("cosmjs-types/cosmos/distribution/v1beta1/tx");
const tx_2 = require("cosmjs-types/cosmos/staking/v1beta1/tx");
const signing_1 = require("cosmjs-types/cosmos/tx/signing/v1beta1/signing");
const tx_3 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const tx_4 = require("cosmjs-types/ibc/applications/transfer/v1/tx");
const stargate_1 = require("@cosmjs/stargate");
const stargate_2 = require("@cosmjs/stargate");
const stargate_3 = require("@cosmjs/stargate");
const stargate_4 = require("@cosmjs/stargate");
const StargateClient_1 = require("./StargateClient");
const modules_1 = require("../modules");
const check_1 = require("../../utils/check");
function createDefaultAminoConverters() {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (0, stargate_3.createAuthzAminoConverters)()), (0, stargate_3.createBankAminoConverters)()), (0, stargate_3.createDistributionAminoConverters)()), (0, stargate_3.createGovAminoConverters)()), (0, stargate_3.createStakingAminoConverters)()), (0, stargate_3.createIbcAminoConverters)()), (0, stargate_3.createFeegrantAminoConverters)()), (0, stargate_3.createVestingAminoConverters)());
}
exports.createDefaultAminoConverters = createDefaultAminoConverters;
class SigningStargateClient extends StargateClient_1.StargateClient {
    /**
     * Creates an instance by connecting to the given Tendermint RPC endpoint.
     *
     * For now this uses the Tendermint 0.34 client. If you need Tendermint 0.37
     * support, see `createWithSigner`.
     */
    static connectWithSigner(endpoint, signer, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const tmClient = yield tendermint_rpc_1.Tendermint37Client.connect(endpoint);
            return SigningStargateClient.createWithSigner(tmClient, signer, options);
        });
    }
    /**
     * Creates an instance from a manually created Tendermint client.
     * Use this to use `Tendermint37Client` instead of `Tendermint37Client`.
     */
    static createWithSigner(tmClient, signer, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new SigningStargateClient(tmClient, signer, options);
        });
    }
    /**
     * Creates a client in offline mode.
     *
     * This should only be used in niche cases where you know exactly what you're doing,
     * e.g. when building an offline signing application.
     *
     * When you try to use online functionality with such a signer, an
     * exception will be raised.
     */
    static offline(signer, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new SigningStargateClient(undefined, signer, options);
        });
    }
    constructor(tmClient, signer, options) {
        super(tmClient, options);
        const { registry = new proto_signing_1.Registry(stargate_4.defaultRegistryTypes), aminoTypes = new stargate_1.AminoTypes(createDefaultAminoConverters()), } = options;
        this.registry = registry;
        this.aminoTypes = aminoTypes;
        this.signer = signer;
        this.broadcastTimeoutMs = options.broadcastTimeoutMs;
        this.broadcastPollIntervalMs = options.broadcastPollIntervalMs;
        this.gasPrice = options.gasPrice;
    }
    simulate(signerAddress, messages, memo) {
        return __awaiter(this, void 0, void 0, function* () {
            const anyMsgs = messages.map((m) => this.registry.encodeAsAny(m));
            const accountFromSigner = (yield this.signer.getAccounts()).find((account) => account.address === signerAddress);
            if (!accountFromSigner) {
                throw new Error("Failed to retrieve account from signer");
            }
            const pubkey = (0, amino_1.encodeSecp256k1Pubkey)(accountFromSigner.pubkey);
            const { sequence } = yield this.getSequence(signerAddress);
            const { gasInfo } = yield this.forceGetQueryClient().tx.simulate(anyMsgs, memo, pubkey, sequence);
            (0, utils_1.assertDefined)(gasInfo);
            return math_1.Uint53.fromString(gasInfo.gasUsed.toString()).toNumber();
        });
    }
    sendTokens(senderAddress, recipientAddress, amount, fee, memo = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const sendMsg = {
                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                value: {
                    fromAddress: senderAddress,
                    toAddress: recipientAddress,
                    amount: [...amount],
                },
            };
            return this.signAndBroadcast(senderAddress, [sendMsg], fee, memo);
        });
    }
    delegateTokens(delegatorAddress, validatorAddress, amount, fee, memo = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const delegateMsg = {
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: tx_2.MsgDelegate.fromPartial({
                    delegatorAddress: delegatorAddress,
                    validatorAddress: validatorAddress,
                    amount: amount,
                }),
            };
            return this.signAndBroadcast(delegatorAddress, [delegateMsg], fee, memo);
        });
    }
    undelegateTokens(delegatorAddress, validatorAddress, amount, fee, memo = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const undelegateMsg = {
                typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
                value: tx_2.MsgUndelegate.fromPartial({
                    delegatorAddress: delegatorAddress,
                    validatorAddress: validatorAddress,
                    amount: amount,
                }),
            };
            return this.signAndBroadcast(delegatorAddress, [undelegateMsg], fee, memo);
        });
    }
    withdrawRewards(delegatorAddress, validatorAddress, fee, memo = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const withdrawMsg = {
                typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
                value: tx_1.MsgWithdrawDelegatorReward.fromPartial({
                    delegatorAddress: delegatorAddress,
                    validatorAddress: validatorAddress,
                }),
            };
            return this.signAndBroadcast(delegatorAddress, [withdrawMsg], fee, memo);
        });
    }
    sendIbcTokens(senderAddress, recipientAddress, transferAmount, sourcePort, sourceChannel, timeoutHeight, 
    /** timeout in seconds */
    timeoutTimestamp, fee, memo = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const timeoutTimestampNanoseconds = timeoutTimestamp
                ? BigInt(timeoutTimestamp) * BigInt(1000000000)
                : undefined;
            const transferMsg = {
                typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                value: tx_4.MsgTransfer.fromPartial({
                    sourcePort: sourcePort,
                    sourceChannel: sourceChannel,
                    sender: senderAddress,
                    receiver: recipientAddress,
                    token: transferAmount,
                    timeoutHeight: timeoutHeight,
                    timeoutTimestamp: timeoutTimestampNanoseconds,
                }),
            };
            return this.signAndBroadcast(senderAddress, [transferMsg], fee, memo);
        });
    }
    signAndBroadcast(signerAddress, messages, fee, memo = "") {
        return __awaiter(this, void 0, void 0, function* () {
            let usedFee;
            if (fee == "auto" || typeof fee === "number") {
                (0, utils_1.assertDefined)(this.gasPrice, "Gas price must be set in the client options when auto gas is used.");
                const gasEstimation = yield this.simulate(signerAddress, messages, memo);
                const multiplier = typeof fee === "number" ? fee : 1.3;
                usedFee = (0, stargate_2.calculateFee)(Math.round(gasEstimation * multiplier), this.gasPrice);
            }
            else {
                usedFee = fee;
            }
            const txRaw = yield this.sign(signerAddress, messages, usedFee, memo);
            const txBytes = tx_3.TxRaw.encode(txRaw).finish();
            return this.broadcastTx(txBytes, this.broadcastTimeoutMs, this.broadcastPollIntervalMs);
        });
    }
    /**
     * Gets account number and sequence from the API, creates a sign doc,
     * creates a single signature and assembles the signed transaction.
     *
     * The sign mode (SIGN_MODE_DIRECT or SIGN_MODE_LEGACY_AMINO_JSON) is determined by this client's signer.
     *
     * You can pass signer data (account number, sequence and chain ID) explicitly instead of querying them
     * from the chain. This is needed when signing for a multisig account, but it also allows for offline signing
     * (See the SigningStargateClient.offline constructor).
     */
    sign(signerAddress, messages, fee, memo, explicitSignerData) {
        return __awaiter(this, void 0, void 0, function* () {
            let signerData;
            if (explicitSignerData) {
                signerData = explicitSignerData;
            }
            else {
                const { accountNumber, sequence } = yield this.getSequence(signerAddress);
                const chainId = yield this.getChainId();
                signerData = {
                    accountNumber: accountNumber,
                    sequence: sequence,
                    chainId: chainId,
                };
            }
            return (0, proto_signing_1.isOfflineDirectSigner)(this.signer)
                ? this.signDirect(signerAddress, messages, fee, memo, signerData)
                : this.signAmino(signerAddress, messages, fee, memo, signerData);
        });
    }
    signAmino(signerAddress, messages, fee, memo, { accountNumber, sequence, chainId }) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, utils_1.assert)(!(0, proto_signing_1.isOfflineDirectSigner)(this.signer));
            const accountFromSigner = (yield this.signer.getAccounts()).find((account) => account.address === signerAddress);
            if (!accountFromSigner) {
                throw new Error("Failed to retrieve account from signer");
            }
            const pubkey = (0, check_1.startWithChainIdPrefix)(chainId)
                ? (0, modules_1.getPublicKey)({
                    chainId,
                    key: Buffer.from(accountFromSigner.pubkey).toString("base64"),
                })
                : (0, proto_signing_1.encodePubkey)((0, amino_1.encodeSecp256k1Pubkey)(accountFromSigner.pubkey));
            const signMode = signing_1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
            const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
            const signDoc = (0, amino_1.makeSignDoc)(msgs, fee, chainId, memo, accountNumber, sequence);
            const { signature, signed } = yield this.signer.signAmino(signerAddress, signDoc);
            const signedTxBody = {
                messages: signed.msgs.map((msg) => this.aminoTypes.fromAmino(msg)),
                memo: signed.memo,
            };
            const signedTxBodyEncodeObject = {
                typeUrl: "/cosmos.tx.v1beta1.TxBody",
                value: signedTxBody,
            };
            const signedTxBodyBytes = this.registry.encode(signedTxBodyEncodeObject);
            const signedGasLimit = math_1.Int53.fromString(signed.fee.gas).toNumber();
            const signedSequence = math_1.Int53.fromString(signed.sequence).toNumber();
            const signedAuthInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey, sequence: signedSequence }], signed.fee.amount, signedGasLimit, signed.fee.granter, signed.fee.payer, signMode);
            return tx_3.TxRaw.fromPartial({
                bodyBytes: signedTxBodyBytes,
                authInfoBytes: signedAuthInfoBytes,
                signatures: [(0, encoding_1.fromBase64)(signature.signature)],
            });
        });
    }
    signDirect(signerAddress, messages, fee, memo, { accountNumber, sequence, chainId }) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, utils_1.assert)((0, proto_signing_1.isOfflineDirectSigner)(this.signer));
            const accountFromSigner = (yield this.signer.getAccounts()).find((account) => account.address === signerAddress);
            if (!accountFromSigner) {
                throw new Error("Failed to retrieve account from signer");
            }
            const pubkey = (0, check_1.startWithChainIdPrefix)(chainId)
                ? (0, modules_1.getPublicKey)({
                    chainId,
                    key: Buffer.from(accountFromSigner.pubkey).toString("base64"),
                })
                : (0, proto_signing_1.encodePubkey)((0, amino_1.encodeSecp256k1Pubkey)(accountFromSigner.pubkey));
            const txBodyEncodeObject = {
                typeUrl: "/cosmos.tx.v1beta1.TxBody",
                value: {
                    messages: messages,
                    memo: memo,
                },
            };
            const txBodyBytes = this.registry.encode(txBodyEncodeObject);
            const gasLimit = math_1.Int53.fromString(fee.gas).toNumber();
            const authInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey, sequence }], fee.amount, gasLimit, fee.granter, fee.payer);
            const signDoc = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes, chainId, accountNumber);
            const { signature, signed } = yield this.signer.signDirect(signerAddress, signDoc);
            return tx_3.TxRaw.fromPartial({
                bodyBytes: signed.bodyBytes,
                authInfoBytes: signed.authInfoBytes,
                signatures: [(0, encoding_1.fromBase64)(signature.signature)],
            });
        });
    }
}
exports.SigningStargateClient = SigningStargateClient;
