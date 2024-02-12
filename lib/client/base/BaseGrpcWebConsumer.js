import { getGrpcTransport } from '../../utils/grpc';
import { GrpcWebImpl } from './GrpcWebImpl';
/**
 * @hidden
 */
class BaseGrpcWebConsumer extends GrpcWebImpl {
    constructor(endpoint) {
        super(endpoint, {
            transport: getGrpcTransport(),
            setCookieMetadata: true
        });
        this.module = '';
    }
}
BaseGrpcWebConsumer.getGrpcWebImpl = (endpoint) => new BaseGrpcWebConsumer(endpoint);
export default BaseGrpcWebConsumer;
