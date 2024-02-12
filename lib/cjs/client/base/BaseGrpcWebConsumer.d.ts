import { GrpcWebImpl } from './GrpcWebImpl';
/**
 * @hidden
 */
export default class BaseGrpcWebConsumer extends GrpcWebImpl {
    protected module: string;
    constructor(endpoint: string);
    static getGrpcWebImpl: (endpoint: string) => BaseGrpcWebConsumer;
}
