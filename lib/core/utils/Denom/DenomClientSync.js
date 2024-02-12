import { TokenFactory, TokenMetaUtilsFactory, } from "@injectivelabs/token-metadata";
import { Network } from "@injectivelabs/networks";
/**
 * This client can be used to fetch token
 * denoms in a fully sync way (without API calls)
 *
 * @category Utility Classes
 *
 * @deprecated use DenomClient instead (they are the same)
 */
export class DenomClientSync {
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
