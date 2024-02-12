import { ChainErrorModule } from '@injectivelabs/exceptions';
export * from './gov';
export * from './auth';
export * from './bank';
export * from './mint';
export * from './wasm';
export * from './authZ';
export * from './peggy';
export * from './oracle';
export * from './auction';
export * from './staking';
export * from './exchange';
export * from './auth-rest';
export * from './bank-rest';
export * from './insurance';
export * from './distribution';
export * from './tokenfactory';
export * from './tendermint-rest';
export interface RestApiResponse<T> {
    data: T;
}
export declare const ChainModule: {
    Auction: ChainErrorModule.Auction;
    Auth: ChainErrorModule.Auth;
    Authz: ChainErrorModule.Authz;
    Bank: ChainErrorModule.Bank;
    Distribution: ChainErrorModule.Distribution;
    Exchange: ChainErrorModule.Exchange;
    Gov: ChainErrorModule.Gov;
    Ibc: ChainErrorModule.Ibc;
    InsuranceFund: ChainErrorModule.InsuranceFund;
    Mint: ChainErrorModule.Mint;
    Oracle: ChainErrorModule.Oracle;
    Peggy: ChainErrorModule.Peggy;
    Staking: ChainErrorModule.Staking;
    Wasm: ChainErrorModule.Wasm;
    WasmX: ChainErrorModule.WasmX;
    Tendermint: ChainErrorModule.Tendermint;
};
