import { getGrpcTransport } from '../../utils/grpc';
import { GrpcWebImpl } from './IndexerGrpcWebImpl';
/**
 * @hidden
 */
export default class BaseIndexerGrpcWebConsumer extends GrpcWebImpl {
    constructor(endpoint) {
        super(endpoint, { transport: getGrpcTransport() });
        this.module = '';
    }
}
export const getGrpcIndexerWebImpl = (endpoint) => new BaseIndexerGrpcWebConsumer(endpoint);
