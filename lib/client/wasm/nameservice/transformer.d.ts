import { WasmContractQueryResponse } from '../types';
export declare class InjNameServiceQueryTransformer {
    static resolverAddressResponseToResolverAddress(response: WasmContractQueryResponse): any;
    static injectiveAddressResponseToInjectiveAddress(response: WasmContractQueryResponse): any;
    static injectiveNameResponseToInjectiveName(response: WasmContractQueryResponse): any;
}
