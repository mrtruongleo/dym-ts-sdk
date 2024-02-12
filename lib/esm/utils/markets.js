"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpotMarketDecimals = exports.getDerivativeMarketDecimals = exports.getSpotMarketTensMultiplier = exports.getDerivativeMarketTensMultiplier = void 0;
const utils_1 = require("@injectivelabs/utils");
const numbers_1 = require("./numbers");
const getDerivativeMarketTensMultiplier = ({ quoteDecimals, minPriceTickSize, minQuantityTickSize, }) => {
    return {
        quantityTensMultiplier: (0, numbers_1.getTensMultiplier)(minQuantityTickSize),
        priceTensMultiplier: (0, numbers_1.getTensMultiplier)(new utils_1.BigNumber(minPriceTickSize).shiftedBy(-quoteDecimals).toFixed()),
    };
};
exports.getDerivativeMarketTensMultiplier = getDerivativeMarketTensMultiplier;
const getSpotMarketTensMultiplier = ({ baseDecimals, quoteDecimals, minPriceTickSize, minQuantityTickSize, }) => {
    return {
        priceTensMultiplier: (0, numbers_1.getTensMultiplier)(new utils_1.BigNumber(minPriceTickSize)
            .shiftedBy(baseDecimals - quoteDecimals)
            .toFixed()),
        quantityTensMultiplier: (0, numbers_1.getTensMultiplier)(new utils_1.BigNumber(minQuantityTickSize).shiftedBy(-baseDecimals).toFixed()),
    };
};
exports.getSpotMarketTensMultiplier = getSpotMarketTensMultiplier;
const getDerivativeMarketDecimals = ({ minPriceTickSize, minQuantityTickSize, quoteDecimals, }) => {
    return {
        quantityDecimals: (0, numbers_1.getExactDecimalsFromNumber)(minQuantityTickSize),
        priceDecimals: (0, numbers_1.getExactDecimalsFromNumber)(new utils_1.BigNumber(minPriceTickSize).shiftedBy(-quoteDecimals).toFixed()),
    };
};
exports.getDerivativeMarketDecimals = getDerivativeMarketDecimals;
const getSpotMarketDecimals = ({ minPriceTickSize, minQuantityTickSize, baseDecimals, quoteDecimals, }) => {
    return {
        priceDecimals: (0, numbers_1.getExactDecimalsFromNumber)(new utils_1.BigNumber(minPriceTickSize)
            .shiftedBy(baseDecimals - quoteDecimals)
            .toFixed()),
        quantityDecimals: (0, numbers_1.getExactDecimalsFromNumber)(new utils_1.BigNumber(minQuantityTickSize).shiftedBy(-baseDecimals).toFixed()),
    };
};
exports.getSpotMarketDecimals = getSpotMarketDecimals;
//# sourceMappingURL=markets.js.map