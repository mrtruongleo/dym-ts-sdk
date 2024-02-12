import { IndexerRestDerivativesChronosApi } from './rest/IndexerRestDerivativesChronosApi';
import { IndexerRestExplorerApi } from './rest/IndexerRestExplorerApi';
import { IndexerRestSpotChronosApi } from './rest/IndexerRestSpotChronosApi';
/**
 * @category Indexer Grpc API
 * @hidden
 */
export declare class IndexerRestClient {
    derivativesChronos: IndexerRestDerivativesChronosApi;
    spotChronos: IndexerRestSpotChronosApi;
    explorer: IndexerRestExplorerApi;
    constructor(endpoints: {
        indexerApi: string;
        chronosApi?: string;
    });
}
