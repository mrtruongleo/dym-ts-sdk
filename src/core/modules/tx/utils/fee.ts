import BigNumber from "bignumber.js";
import {
  DEFAULT_STD_FEE,
  DEFAULT_GAS_LIMIT,
  DEFAULT_GAS_PRICE,
  AddressPrefix,
} from "../../../../";
import { BigNumberInBase, BigNumberInWei } from "@injectivelabs/utils";

export const getStdFeeForToken = (
  token: {
    denom: string;
    decimals: number;
  } = { denom: AddressPrefix, decimals: 18 },
  gasPrice?: string,
  gasLimit?: string
) => {
  const gasPriceInBase =
    gasPrice || new BigNumberInWei(DEFAULT_GAS_PRICE).toBase();
  const gasPriceScaled = new BigNumberInBase(gasPriceInBase)
    .toWei(token.decimals)
    .toFixed(0);
  const gasNormalized = new BigNumber(gasLimit || DEFAULT_GAS_LIMIT).toFixed(0);

  return {
    amount: [
      {
        denom: token.denom,
        amount: new BigNumberInBase(gasPriceScaled)
          .times(gasNormalized)
          .toFixed(),
      },
    ],
    gas: gasNormalized,
  };
};

export const getStdFeeFromObject = (args?: {
  gas?: string | number;
  payer?: string;
  granter?: string;
  gasPrice?: string | number;
  feePayer?: string;
}) => {
  if (!args) {
    return DEFAULT_STD_FEE;
  }

  const {
    gas = DEFAULT_GAS_LIMIT.toString(),
    gasPrice = DEFAULT_GAS_PRICE,
    payer,
    granter,
    feePayer,
  } = args;
  const gasNormalized = new BigNumber(gas).toFixed(0);
  const gasPriceNormalized = new BigNumber(gasPrice).toFixed(0);

  return {
    amount: [
      {
        denom: AddressPrefix,
        amount: new BigNumber(gasNormalized)
          .times(gasPriceNormalized)
          .toFixed(),
      },
    ],
    gas: new BigNumber(gasNormalized).toFixed(),
    payer /** for Web3Gateway fee delegation */,
    granter,
    feePayer,
  };
};

export const getDefaultStdFee = () => DEFAULT_STD_FEE;

export const getStdFeeFromString = (gasPrice: string) => {
  const matchResult = gasPrice.match(/^([0-9.]+)([a-zA-Z][a-zA-Z0-9/:._-]*)$/);

  if (!matchResult) {
    throw new Error("Invalid gas price string");
  }

  const [_, amount] = matchResult;
  const gas = new BigNumberInBase(amount)
    .toWei()
    .dividedBy(DEFAULT_GAS_PRICE)
    .toFixed(0);

  return getStdFeeFromObject({ gas, gasPrice: DEFAULT_GAS_PRICE });
};

export const getStdFee = (
  args?:
    | string
    | {
        gas?: string | number;
        payer?: string;
        granter?: string;
        gasPrice?: string | number;
        feePayer?: string;
      }
) => {
  if (!args) {
    return DEFAULT_STD_FEE;
  }

  if (typeof args === "string") {
    return getStdFeeFromString(args);
  }

  return getStdFeeFromObject({ ...args });
};
