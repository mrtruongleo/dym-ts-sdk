import { Token, TokenFactory, TokenMeta, TokenMetaUtils } from "@injectivelabs/token-metadata";
import { Network } from "@injectivelabs/networks";
/**
 * This client can be used to fetch token
 * denoms in a fully sync way (without API calls)
 *
 * @category Utility Classes
 *
 * @deprecated use DenomClient instead (they are the same)
 */
export declare class DenomClientSync {
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
