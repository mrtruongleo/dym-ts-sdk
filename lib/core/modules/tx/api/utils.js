import { BigNumberInBase, DEFAULT_BLOCK_TIMEOUT_HEIGHT, DEFAULT_BLOCK_TIME_IN_SECONDS, } from '@injectivelabs/utils';
import { TxGrpcApi } from './TxGrpcApi';
import { TxRestApi } from './TxRestApi';
export const waitTxBroadcasted = (txHash, options) => {
    const timeout = new BigNumberInBase((options === null || options === void 0 ? void 0 : options.txTimeout) || DEFAULT_BLOCK_TIMEOUT_HEIGHT)
        .times(DEFAULT_BLOCK_TIME_IN_SECONDS * 1000)
        .toNumber();
    return options.endpoints.grpc
        ? new TxGrpcApi(options.endpoints.grpc).fetchTxPoll(txHash, timeout)
        : new TxRestApi(options.endpoints.rest).fetchTxPoll(txHash, timeout);
};
