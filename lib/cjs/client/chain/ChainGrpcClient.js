"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcClient = void 0;
const ChainGrpcAuctionApi_1 = require("./grpc/ChainGrpcAuctionApi");
const ChainGrpcBankApi_1 = require("./grpc/ChainGrpcBankApi");
const ChainGrpcAuthApi_1 = require("./grpc/ChainGrpcAuthApi");
const ChainGrpcDistributionApi_1 = require("./grpc/ChainGrpcDistributionApi");
const ChainGrpcExchangeApi_1 = require("./grpc/ChainGrpcExchangeApi");
const ChainGrpcGovApi_1 = require("./grpc/ChainGrpcGovApi");
const ChainGrpcIbcApi_1 = require("./grpc/ChainGrpcIbcApi");
const ChainGrpcInsuranceFundApi_1 = require("./grpc/ChainGrpcInsuranceFundApi");
const ChainGrpcMintApi_1 = require("./grpc/ChainGrpcMintApi");
const ChainGrpcOracleApi_1 = require("./grpc/ChainGrpcOracleApi");
const ChainGrpcPeggyApi_1 = require("./grpc/ChainGrpcPeggyApi");
const ChainGrpcStakingApi_1 = require("./grpc/ChainGrpcStakingApi");
const ChainGrpcTokenFactoryApi_1 = require("./grpc/ChainGrpcTokenFactoryApi");
const ChainGrpcWasmApi_1 = require("./grpc/ChainGrpcWasmApi");
const ChainGrpcWasmXApi_1 = require("./grpc/ChainGrpcWasmXApi");
/**
 * @category Chain Grpc API
 * @hidden
 */
class ChainGrpcClient {
    auction;
    auth;
    bank;
    distribution;
    exchange;
    gov;
    ibc;
    insuranceFund;
    mint;
    oracle;
    peggy;
    staking;
    tokenfactory;
    wasm;
    wasmX;
    constructor(endpoint) {
        this.auction = new ChainGrpcAuctionApi_1.ChainGrpcAuctionApi(endpoint);
        this.auth = new ChainGrpcAuthApi_1.ChainGrpcAuthApi(endpoint);
        this.bank = new ChainGrpcBankApi_1.ChainGrpcBankApi(endpoint);
        this.distribution = new ChainGrpcDistributionApi_1.ChainGrpcDistributionApi(endpoint);
        this.exchange = new ChainGrpcExchangeApi_1.ChainGrpcExchangeApi(endpoint);
        this.gov = new ChainGrpcGovApi_1.ChainGrpcGovApi(endpoint);
        this.ibc = new ChainGrpcIbcApi_1.ChainGrpcIbcApi(endpoint);
        this.insuranceFund = new ChainGrpcInsuranceFundApi_1.ChainGrpcInsuranceFundApi(endpoint);
        this.mint = new ChainGrpcMintApi_1.ChainGrpcMintApi(endpoint);
        this.oracle = new ChainGrpcOracleApi_1.ChainGrpcOracleApi(endpoint);
        this.peggy = new ChainGrpcPeggyApi_1.ChainGrpcPeggyApi(endpoint);
        this.staking = new ChainGrpcStakingApi_1.ChainGrpcStakingApi(endpoint);
        this.tokenfactory = new ChainGrpcTokenFactoryApi_1.ChainGrpcTokenFactoryApi(endpoint);
        this.wasm = new ChainGrpcWasmApi_1.ChainGrpcWasmApi(endpoint);
        this.wasmX = new ChainGrpcWasmXApi_1.ChainGrpcWasmXApi(endpoint);
    }
}
exports.ChainGrpcClient = ChainGrpcClient;
//# sourceMappingURL=ChainGrpcClient.js.map