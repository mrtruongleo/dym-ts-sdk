import { Account } from "@cosmjs/stargate";
import { InjectiveTypesV1Beta1Account } from "@injectivelabs/core-proto-ts";

import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";

export const accountParser = (ethAccount: any): Account => {
  let account: any = undefined,
    pubkey: any = undefined,
    address: string = "",
    accountNumber: any = 0,
    sequence: any = 0;
  if (ethAccount.typeUrl === "/cosmos.auth.v1beta1.BaseAccount") {
    //console.log("cosmos base");
    account = BaseAccount.decode(ethAccount.value);
    address = account.address;
    pubkey = account.pubKey;
    sequence = parseInt(account.sequence);
    accountNumber = parseInt(account.accountNumber);
  } else {
    //console.log("eth base");
    account = InjectiveTypesV1Beta1Account.EthAccount.decode(ethAccount.value);
    const baseAccount = account.baseAccount;
    address = baseAccount.address;
    pubkey = baseAccount.pubKey;
    sequence = parseInt(baseAccount.sequence);
    accountNumber = parseInt(baseAccount.accountNumber);
  }

  //console.log("decode account: ", account);
  return {
    address: address,
    pubkey: pubkey
      ? {
          type: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
          value: Buffer.from(pubkey.value).toString("base64"),
        }
      : null,
    accountNumber: parseInt(accountNumber, 10),
    sequence: parseInt(sequence, 10),
  };
  // const account = InjectiveTypesV1Beta1Account.EthAccount.decode(
  //   ethAccount.value as Uint8Array
  // );
  // const baseAccount = account.baseAccount!;
  // const pubKey = baseAccount.pubKey;

  // return {
  //   address: baseAccount.address,
  //   pubkey: pubKey
  //     ? {
  //         type: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
  //         value: Buffer.from(pubKey.value).toString("base64"),
  //       }
  //     : null,
  //   accountNumber: parseInt(baseAccount.accountNumber, 10),
  //   sequence: parseInt(baseAccount.sequence, 10),
  // };
};
