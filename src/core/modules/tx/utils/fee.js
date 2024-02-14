"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStdFee = exports.getStdFeeFromString = exports.getDefaultStdFee = exports.getStdFeeFromObject = exports.getStdFeeForToken = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const __1 = require("../../../../");
const utils_1 = require("@injectivelabs/utils");
const getStdFeeForToken = (token = { denom: __1.AddressPrefix, decimals: 18 }, gasPrice, gasLimit) => {
    const gasPriceInBase = gasPrice || new utils_1.BigNumberInWei(__1.DEFAULT_GAS_PRICE).toBase();
    const gasPriceScaled = new utils_1.BigNumberInBase(gasPriceInBase)
        .toWei(token.decimals)
        .toFixed(0);
    const gasNormalized = new bignumber_js_1.default(gasLimit || __1.DEFAULT_GAS_LIMIT).toFixed(0);
    return {
        amount: [
            {
                denom: token.denom,
                amount: new utils_1.BigNumberInBase(gasPriceScaled)
                    .times(gasNormalized)
                    .toFixed(),
            },
        ],
        gas: gasNormalized,
    };
};
exports.getStdFeeForToken = getStdFeeForToken;
const getStdFeeFromObject = (args) => {
    if (!args) {
        return __1.DEFAULT_STD_FEE;
    }
    const { gas = __1.DEFAULT_GAS_LIMIT.toString(), gasPrice = __1.DEFAULT_GAS_PRICE, payer, granter, feePayer, } = args;
    const gasNormalized = new bignumber_js_1.default(gas).toFixed(0);
    const gasPriceNormalized = new bignumber_js_1.default(gasPrice).toFixed(0);
    return {
        amount: [
            {
                denom: __1.AddressPrefix,
                amount: new bignumber_js_1.default(gasNormalized)
                    .times(gasPriceNormalized)
                    .toFixed(),
            },
        ],
        gas: new bignumber_js_1.default(gasNormalized).toFixed(),
        payer /** for Web3Gateway fee delegation */,
        granter,
        feePayer,
    };
};
exports.getStdFeeFromObject = getStdFeeFromObject;
const getDefaultStdFee = () => __1.DEFAULT_STD_FEE;
exports.getDefaultStdFee = getDefaultStdFee;
const getStdFeeFromString = (gasPrice) => {
    const matchResult = gasPrice.match(/^([0-9.]+)([a-zA-Z][a-zA-Z0-9/:._-]*)$/);
    if (!matchResult) {
        throw new Error("Invalid gas price string");
    }
    const [_, amount] = matchResult;
    const gas = new utils_1.BigNumberInBase(amount)
        .toWei()
        .dividedBy(__1.DEFAULT_GAS_PRICE)
        .toFixed(0);
    return (0, exports.getStdFeeFromObject)({ gas, gasPrice: __1.DEFAULT_GAS_PRICE });
};
exports.getStdFeeFromString = getStdFeeFromString;
const getStdFee = (args) => {
    if (!args) {
        return __1.DEFAULT_STD_FEE;
    }
    if (typeof args === "string") {
        return (0, exports.getStdFeeFromString)(args);
    }
    return (0, exports.getStdFeeFromObject)(Object.assign({}, args));
};
exports.getStdFee = getStdFee;
