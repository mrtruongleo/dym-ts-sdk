import { Token, TokenFactory, TokenMeta, TokenMetaUtils } from "@injectivelabs/token-metadata";
import { Network } from "@injectivelabs/networks";
/**
 * This client can be used to fetch token from the existing token-metadata
 * package.
 *
 * If you want to have a mode advanced version of the DenomClient
 * (including the ability to fetch metadata from an API)
 * use the DenomClientAsync from the @injectivelabs/sdk-ui-ts package
 *
 * @category Utility Classes
 */
export declare class DenomClient {
    protected tokenFactory: TokenFactory;
    protected tokenMetaUtils: TokenMetaUtils;
    constructor(network?: Network);
    getDenomToken(denom: string): Token | undefined;
    getDenomsToken(denoms: string[]): Array<Token | undefined>;
    getTokenMetaDataBySymbol(symbol: string): TokenMeta | undefined;
    getTokenMetaDataByAddress(address: string): TokenMeta | undefined;
    getTokenMetaDataByName(name: string): TokenMeta | undefined;
    getCoinGeckoId(denom: string): string;
}
