import { TokenFactory, TokenMetaUtilsFactory, } from "@injectivelabs/token-metadata";
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
export class DenomClient {
    tokenFactory;
    tokenMetaUtils;
    constructor(network = Network.Mainnet) {
        this.tokenFactory = TokenFactory.make(network);
        this.tokenMetaUtils = TokenMetaUtilsFactory.make(network);
    }
    getDenomToken(denom) {
        return this.tokenFactory.toToken(denom);
    }
    getDenomsToken(denoms) {
        return denoms.map((denom) => this.getDenomToken(denom));
    }
    getTokenMetaDataBySymbol(symbol) {
        return this.tokenMetaUtils.getMetaBySymbol(symbol);
    }
    getTokenMetaDataByAddress(address) {
        return this.tokenMetaUtils.getMetaByAddress(address);
    }
    getTokenMetaDataByName(name) {
        return this.tokenMetaUtils.getMetaByName(name);
    }
    getCoinGeckoId(denom) {
        return this.tokenMetaUtils.getCoinGeckoIdFromSymbol(denom);
    }
}
