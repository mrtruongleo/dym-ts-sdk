import { getGrpcTransport } from '../../utils/grpc';
import { GrpcWebImpl } from './IndexerGrpcWebImpl';
/**
 * @hidden
 */
export default class BaseIndexerGrpcWebConsumer extends GrpcWebImpl {
    module = '';
    constructor(endpoint) {
        super(endpoint, { transport: getGrpcTransport() });
    }
}
export const getGrpcIndexerWebImpl = (endpoint) => new BaseIndexerGrpcWebConsumer(endpoint);
