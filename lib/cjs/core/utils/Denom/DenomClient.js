"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DenomClient = void 0;
const token_metadata_1 = require("@injectivelabs/token-metadata");
const networks_1 = require("@injectivelabs/networks");
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
class DenomClient {
    tokenFactory;
    tokenMetaUtils;
    constructor(network = networks_1.Network.Mainnet) {
        this.tokenFactory = token_metadata_1.TokenFactory.make(network);
        this.tokenMetaUtils = token_metadata_1.TokenMetaUtilsFactory.make(network);
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
exports.DenomClient = DenomClient;
//# sourceMappingURL=DenomClient.js.map