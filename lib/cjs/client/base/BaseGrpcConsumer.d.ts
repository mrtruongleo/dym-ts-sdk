import { GrpcWebImpl } from './GrpcWebImpl';
export default class BaseGrpcConsumer extends GrpcWebImpl {
    protected module: string;
    constructor(endpoint: string);
    getGrpcWebImpl(endpoint: string): BaseGrpcConsumer;
    protected retry<TResponse>(grpcCall: Function, retries?: number, delay?: number): Promise<TResponse>;
}
