"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEipTxContext = exports.getEipTxDetails = exports.getTypesIncludingFeePayer = exports.getEip712FeeV2 = exports.getEip712Fee = exports.getDefaultEip712TypesV2 = exports.getDefaultEip712Types = exports.getEip712DomainV2 = exports.getEip712Domain = void 0;
const utils_1 = require("@injectivelabs/utils");
const getEip712Domain = (ethereumChainId) => {
    return {
        domain: {
            name: 'Injective Web3',
            version: '1.0.0',
            chainId: '0x' + new utils_1.BigNumberInBase(ethereumChainId).toString(16),
            salt: '0',
            verifyingContract: 'cosmos',
        },
    };
};
exports.getEip712Domain = getEip712Domain;
const getEip712DomainV2 = (ethereumChainId) => {
    return {
        domain: {
            name: 'Injective Web3',
            version: '1.0.0',
            chainId: '0x' + new utils_1.BigNumberInBase(ethereumChainId).toString(16),
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
            salt: '0',
        },
    };
};
exports.getEip712DomainV2 = getEip712DomainV2;
const getDefaultEip712Types = () => {
    return {
        types: {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'string' },
                { name: 'salt', type: 'string' },
            ],
            Tx: [
                { name: 'account_number', type: 'string' },
                { name: 'chain_id', type: 'string' },
                { name: 'fee', type: 'Fee' },
                { name: 'memo', type: 'string' },
                { name: 'msgs', type: 'Msg[]' },
                { name: 'sequence', type: 'string' },
                { name: 'timeout_height', type: 'string' },
            ],
            Fee: [
                { name: 'amount', type: 'Coin[]' },
                { name: 'gas', type: 'string' },
            ],
            Coin: [
                { name: 'denom', type: 'string' },
                { name: 'amount', type: 'string' },
            ],
            Msg: [
                { name: 'type', type: 'string' },
                { name: 'value', type: 'MsgValue' },
            ],
        },
    };
};
exports.getDefaultEip712Types = getDefaultEip712Types;
const getDefaultEip712TypesV2 = () => {
    return {
        types: {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
                { name: 'salt', type: 'string' },
            ],
            Tx: [
                { name: 'context', type: 'string' },
                { name: 'msgs', type: 'string' },
            ],
        },
    };
};
exports.getDefaultEip712TypesV2 = getDefaultEip712TypesV2;
const getEip712Fee = (params) => {
    if (!params) {
        return {
            fee: utils_1.DEFAULT_STD_FEE,
        };
    }
    const { amount, gas, feePayer } = {
        amount: params.amount || utils_1.DEFAULT_STD_FEE.amount,
        gas: params.gas || utils_1.DEFAULT_GAS_LIMIT.toFixed(),
        feePayer: params.feePayer,
    };
    return {
        fee: {
            feePayer: feePayer,
            gas,
            amount,
        },
    };
};
exports.getEip712Fee = getEip712Fee;
const getEip712FeeV2 = (params) => {
    if (!params) {
        return {
            fee: {
                amount: [
                    {
                        denom: utils_1.DEFAULT_STD_FEE.amount[0].denom,
                        amount: utils_1.DEFAULT_STD_FEE.amount[0].amount,
                    },
                ],
                gas: Number(utils_1.DEFAULT_STD_FEE.gas),
            },
        };
    }
    const amountFromParams = (params.amount || utils_1.DEFAULT_STD_FEE.amount)[0];
    const { amount, gas, payer } = {
        amount: [
            {
                denom: amountFromParams.denom,
                amount: amountFromParams.amount,
            },
        ],
        gas: Number(params.gas || utils_1.DEFAULT_GAS_LIMIT.toFixed()),
        payer: params.feePayer,
    };
    return {
        fee: {
            amount,
            gas,
            payer: payer,
        },
    };
};
exports.getEip712FeeV2 = getEip712FeeV2;
const getTypesIncludingFeePayer = ({ fee, types, }) => {
    if (!fee) {
        return types;
    }
    if (!fee.feePayer) {
        return types;
    }
    types.types['Fee'].unshift({ name: 'feePayer', type: 'string' });
    return types;
};
exports.getTypesIncludingFeePayer = getTypesIncludingFeePayer;
const getEipTxDetails = ({ accountNumber, sequence, timeoutHeight, chainId, memo, }) => {
    return {
        account_number: accountNumber,
        chain_id: chainId,
        timeout_height: timeoutHeight,
        memo: memo || '',
        sequence,
    };
};
exports.getEipTxDetails = getEipTxDetails;
const getEipTxContext = ({ accountNumber, sequence, fee, timeoutHeight, chainId, memo, }) => {
    return Object.assign(Object.assign({ account_number: Number(accountNumber), chain_id: chainId }, (0, exports.getEip712FeeV2)(fee)), { memo: memo || '', sequence: Number(sequence), timeout_height: Number(timeoutHeight) });
};
exports.getEipTxContext = getEipTxContext;
