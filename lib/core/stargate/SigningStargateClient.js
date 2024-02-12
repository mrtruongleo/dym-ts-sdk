var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { encodeSecp256k1Pubkey, makeSignDoc as makeSignDocAmino, } from "@cosmjs/amino";
import { fromBase64 } from "@cosmjs/encoding";
import { Int53, Uint53 } from "@cosmjs/math";
import { encodePubkey, isOfflineDirectSigner, makeAuthInfoBytes, makeSignDoc, Registry, } from "@cosmjs/proto-signing";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";
import { assert, assertDefined } from "@cosmjs/utils";
import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import { MsgDelegate, MsgUndelegate, } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import { AminoTypes } from "@cosmjs/stargate";
import { calculateFee } from "@cosmjs/stargate";
import { createAuthzAminoConverters, createBankAminoConverters, createDistributionAminoConverters, createFeegrantAminoConverters, createGovAminoConverters, createIbcAminoConverters, createStakingAminoConverters, createVestingAminoConverters, } from "@cosmjs/stargate";
import { defaultRegistryTypes, } from "@cosmjs/stargate";
import { StargateClient } from "./StargateClient";
import { getPublicKey } from "../modules";
import { startWithChainIdPrefix } from "../../utils/check";
export function createDefaultAminoConverters() {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, createAuthzAminoConverters()), createBankAminoConverters()), createDistributionAminoConverters()), createGovAminoConverters()), createStakingAminoConverters()), createIbcAminoConverters()), createFeegrantAminoConverters()), createVestingAminoConverters());
}
export class SigningStargateClient extends StargateClient {
    /**
     * Creates an instance by connecting to the given Tendermint RPC endpoint.
     *
     * For now this uses the Tendermint 0.34 client. If you need Tendermint 0.37
     * support, see `createWithSigner`.
     */
    static connectWithSigner(endpoint, signer, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const tmClient = yield Tendermint37Client.connect(endpoint);
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
        const { registry = new Registry(defaultRegistryTypes), aminoTypes = new AminoTypes(createDefaultAminoConverters()), } = options;
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
            const pubkey = encodeSecp256k1Pubkey(accountFromSigner.pubkey);
            const { sequence } = yield this.getSequence(signerAddress);
            const { gasInfo } = yield this.forceGetQueryClient().tx.simulate(anyMsgs, memo, pubkey, sequence);
            assertDefined(gasInfo);
            return Uint53.fromString(gasInfo.gasUsed.toString()).toNumber();
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
                value: MsgDelegate.fromPartial({
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
                value: MsgUndelegate.fromPartial({
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
                value: MsgWithdrawDelegatorReward.fromPartial({
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
                value: MsgTransfer.fromPartial({
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
                assertDefined(this.gasPrice, "Gas price must be set in the client options when auto gas is used.");
                const gasEstimation = yield this.simulate(signerAddress, messages, memo);
                const multiplier = typeof fee === "number" ? fee : 1.3;
                usedFee = calculateFee(Math.round(gasEstimation * multiplier), this.gasPrice);
            }
            else {
                usedFee = fee;
            }
            const txRaw = yield this.sign(signerAddress, messages, usedFee, memo);
            const txBytes = TxRaw.encode(txRaw).finish();
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
            return isOfflineDirectSigner(this.signer)
                ? this.signDirect(signerAddress, messages, fee, memo, signerData)
                : this.signAmino(signerAddress, messages, fee, memo, signerData);
        });
    }
    signAmino(signerAddress, messages, fee, memo, { accountNumber, sequence, chainId }) {
        return __awaiter(this, void 0, void 0, function* () {
            assert(!isOfflineDirectSigner(this.signer));
            const accountFromSigner = (yield this.signer.getAccounts()).find((account) => account.address === signerAddress);
            if (!accountFromSigner) {
                throw new Error("Failed to retrieve account from signer");
            }
            const pubkey = startWithChainIdPrefix(chainId)
                ? getPublicKey({
                    chainId,
                    key: Buffer.from(accountFromSigner.pubkey).toString("base64"),
                })
                : encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey));
            const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
            const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
            const signDoc = makeSignDocAmino(msgs, fee, chainId, memo, accountNumber, sequence);
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
            const signedGasLimit = Int53.fromString(signed.fee.gas).toNumber();
            const signedSequence = Int53.fromString(signed.sequence).toNumber();
            const signedAuthInfoBytes = makeAuthInfoBytes([{ pubkey, sequence: signedSequence }], signed.fee.amount, signedGasLimit, signed.fee.granter, signed.fee.payer, signMode);
            return TxRaw.fromPartial({
                bodyBytes: signedTxBodyBytes,
                authInfoBytes: signedAuthInfoBytes,
                signatures: [fromBase64(signature.signature)],
            });
        });
    }
    signDirect(signerAddress, messages, fee, memo, { accountNumber, sequence, chainId }) {
        return __awaiter(this, void 0, void 0, function* () {
            assert(isOfflineDirectSigner(this.signer));
            const accountFromSigner = (yield this.signer.getAccounts()).find((account) => account.address === signerAddress);
            if (!accountFromSigner) {
                throw new Error("Failed to retrieve account from signer");
            }
            const pubkey = startWithChainIdPrefix(chainId)
                ? getPublicKey({
                    chainId,
                    key: Buffer.from(accountFromSigner.pubkey).toString("base64"),
                })
                : encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey));
            const txBodyEncodeObject = {
                typeUrl: "/cosmos.tx.v1beta1.TxBody",
                value: {
                    messages: messages,
                    memo: memo,
                },
            };
            const txBodyBytes = this.registry.encode(txBodyEncodeObject);
            const gasLimit = Int53.fromString(fee.gas).toNumber();
            const authInfoBytes = makeAuthInfoBytes([{ pubkey, sequence }], fee.amount, gasLimit, fee.granter, fee.payer);
            const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
            const { signature, signed } = yield this.signer.signDirect(signerAddress, signDoc);
            return TxRaw.fromPartial({
                bodyBytes: signed.bodyBytes,
                authInfoBytes: signed.authInfoBytes,
                signatures: [fromBase64(signature.signature)],
            });
        });
    }
}
