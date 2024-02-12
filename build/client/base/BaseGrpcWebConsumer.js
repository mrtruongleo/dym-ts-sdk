import { getGrpcTransport } from '../../utils/grpc';
import { GrpcWebImpl } from './GrpcWebImpl';
/**
 * @hidden
 */
export default class BaseGrpcWebConsumer extends GrpcWebImpl {
    module = '';
    constructor(endpoint) {
        super(endpoint, {
            transport: getGrpcTransport(),
            setCookieMetadata: true
        });
    }
    static getGrpcWebImpl = (endpoint) => new BaseGrpcWebConsumer(endpoint);
}
