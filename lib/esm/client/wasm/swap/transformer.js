"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapQueryTransformer = void 0;
const utils_1 = require("../../../utils");
class SwapQueryTransformer {
    static contractRouteResponseToContractRoute(response) {
        const data = JSON.parse((0, utils_1.toUtf8)(response.data));
        return {
            steps: data.steps,
            sourceDenom: data.source_denom,
            targetDenom: data.target_denom,
        };
    }
    static contractAllRoutesResponseToContractAllRoutes(response) {
        const data = JSON.parse((0, utils_1.toUtf8)(response.data));
        return data.map((route) => ({
            steps: route.steps,
            sourceDenom: route.source_denom,
            targetDenom: route.target_denom,
        }));
    }
    static contractQuantityResponseToContractQuantity(response) {
        const data = JSON.parse((0, utils_1.toUtf8)(response.data));
        return {
            expectedFees: data.expected_fees,
            resultQuantity: data.result_quantity,
        };
    }
}
exports.SwapQueryTransformer = SwapQueryTransformer;
//# sourceMappingURL=transformer.js.map