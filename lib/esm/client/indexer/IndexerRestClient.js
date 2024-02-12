"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerRestClient = void 0;
const IndexerRestDerivativesChronosApi_1 = require("./rest/IndexerRestDerivativesChronosApi");
const IndexerRestExplorerApi_1 = require("./rest/IndexerRestExplorerApi");
const IndexerRestSpotChronosApi_1 = require("./rest/IndexerRestSpotChronosApi");
/**
 * @category Indexer Grpc API
 * @hidden
 */
class IndexerRestClient {
    derivativesChronos;
    spotChronos;
    explorer;
    constructor(endpoints) {
        const chronosBase = `${endpoints.chronosApi
            ? `${endpoints.chronosApi}/api/v1`
            : `${endpoints.indexerApi}/api/chronos/v1`}`;
        this.explorer = new IndexerRestExplorerApi_1.IndexerRestExplorerApi(`${chronosBase}/api/explorer/v1`);
        this.derivativesChronos = new IndexerRestDerivativesChronosApi_1.IndexerRestDerivativesChronosApi(`${chronosBase}/derivative`);
        this.spotChronos = new IndexerRestSpotChronosApi_1.IndexerRestSpotChronosApi(`${chronosBase}/spot`);
    }
}
exports.IndexerRestClient = IndexerRestClient;
//# sourceMappingURL=IndexerRestClient.js.map