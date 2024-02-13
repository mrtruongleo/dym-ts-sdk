# dym-ts-sdk

Dymenstion TypeScript SDK

The Dymenstion TypeScript SDK is a hobbyist-friendly toolkit designed for enthusiasts interested in building decentralized applications (dApps) on the Dymenstion blockchain. Taking inspiration from the Injective TypeScript SDK, it provides an accessible set of tools for hobbyist developers to explore blockchain development.

Contributions and Bug Fixes:

This SDK is a work in progress, and as such, there may be bugs or areas for improvement. Hobbyists are encouraged to contribute to the project by identifying bugs, suggesting enhancements, or submitting fixes. Together, we can improve the SDK and create a more robust and enjoyable development experience for all hobbyists.

Getting Started:

Begin your hobby project by installing the SDK via npm:

`npm install @mrtruongleo/dym-ts-sdk`

Explore the SDK’s modules and start experimenting with blockchain features in your projects.

# example send dym transaction:

```
import {
  EthermintStargateClient,
  EthermintDirectSecp256k1Wallet,
} from "@mrtruongleo/dym-ts-sdk";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";
(async () => {
  const network = {
    rest: "https://dymension-api.lavenderfive.com:443",
    chainId: "dymension_1100-1",
    rpc: "https://rpc.dymension.nodestake.org",
    grpc: "dymension-mainnet-grpc.autostake.com:443",
  };
  const privateKeyHash = "privatekey_without_0x";//config here

  const recipient = "dym16hqmpwzjw4xvm3sna8c6akfnu5qr20lzczuqxx";
  const amount = {
    denom: "adym",
    amount: "1000000000",
  };
  const memo = "test tx";
  const wallet = (await EthermintDirectSecp256k1Wallet.fromKey(
    Buffer.from(privateKeyHash, "hex")
  )) as unknown as OfflineDirectSigner;

  const [signer] = await wallet.getAccounts();
  const client =
    await EthermintStargateClient.EthSigningStargateClient.connectWithSigner(
      network.rpc as string,
      wallet
    );

  const sendMsg = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      fromAddress: signer.address,
      toAddress: recipient,
      amount: [amount],
    },
  };
  const simulate = await client.simulate(signer.address, [sendMsg], memo);
  console.log("simulated gas limit: ", simulate);
  const fee = {
    amount: [
      {
        amount: "5000000000000000",
        denom: "adym",
      },
    ],
    gas: `${simulate}`,
  };
  const txResponse = await client.sendTokens(
    signer.address,
    recipient,
    [amount],
    fee,
    memo
  );
  if (txResponse.code !== 0) {
    console.log(`Transaction failed: ${txResponse.msgResponses}`);
  } else {
    console.log(`Broadcasted transaction hash: ${txResponse.transactionHash}`);
    console.log(`gas used: `, {
      gasUsed: txResponse.gasUsed,
      gasWanted: txResponse.gasWanted,
    });
  }
})();

```
