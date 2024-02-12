import { ChainGrpcAuctionApi } from './grpc/ChainGrpcAuctionApi';
import { ChainGrpcBankApi } from './grpc/ChainGrpcBankApi';
import { ChainGrpcAuthApi } from './grpc/ChainGrpcAuthApi';
import { ChainGrpcDistributionApi } from './grpc/ChainGrpcDistributionApi';
import { ChainGrpcExchangeApi } from './grpc/ChainGrpcExchangeApi';
import { ChainGrpcGovApi } from './grpc/ChainGrpcGovApi';
import { ChainGrpcIbcApi } from './grpc/ChainGrpcIbcApi';
import { ChainGrpcInsuranceFundApi } from './grpc/ChainGrpcInsuranceFundApi';
import { ChainGrpcMintApi } from './grpc/ChainGrpcMintApi';
import { ChainGrpcOracleApi } from './grpc/ChainGrpcOracleApi';
import { ChainGrpcPeggyApi } from './grpc/ChainGrpcPeggyApi';
import { ChainGrpcStakingApi } from './grpc/ChainGrpcStakingApi';
import { ChainGrpcTokenFactoryApi } from './grpc/ChainGrpcTokenFactoryApi';
import { ChainGrpcWasmApi } from './grpc/ChainGrpcWasmApi';
import { ChainGrpcWasmXApi } from './grpc/ChainGrpcWasmXApi';
/**
 * @category Chain Grpc API
 * @hidden
 */
export declare class ChainGrpcClient {
    auction: ChainGrpcAuctionApi;
    auth: ChainGrpcAuthApi;
    bank: ChainGrpcBankApi;
    distribution: ChainGrpcDistributionApi;
    exchange: ChainGrpcExchangeApi;
    gov: ChainGrpcGovApi;
    ibc: ChainGrpcIbcApi;
    insuranceFund: ChainGrpcInsuranceFundApi;
    mint: ChainGrpcMintApi;
    oracle: ChainGrpcOracleApi;
    peggy: ChainGrpcPeggyApi;
    staking: ChainGrpcStakingApi;
    tokenfactory: ChainGrpcTokenFactoryApi;
    wasm: ChainGrpcWasmApi;
    wasmX: ChainGrpcWasmXApi;
    constructor(endpoint: string);
}
