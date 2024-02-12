import { GrpcWebImpl } from './IndexerGrpcWebImpl';
export default class BaseIndexerGrpcConsumer extends GrpcWebImpl {
    protected module: string;
    constructor(endpoint: string);
    getGrpcWebImpl(endpoint: string): BaseIndexerGrpcConsumer;
    protected retry<TResponse>(grpcCall: Function, retries?: number, delay?: number): Promise<TResponse>;
}
