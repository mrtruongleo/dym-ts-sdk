import { GrpcWebImpl } from './IndexerGrpcWebImpl';
/**
 * @hidden
 */
export default class BaseIndexerGrpcWebConsumer extends GrpcWebImpl {
    protected module: string;
    constructor(endpoint: string);
}
export declare const getGrpcIndexerWebImpl: (endpoint: string) => BaseIndexerGrpcWebConsumer;
