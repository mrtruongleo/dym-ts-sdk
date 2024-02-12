import { getGrpcTransport } from '../../utils/grpc';
import { GrpcWebImpl } from './IndexerGrpcWebImpl';
export default class BaseIndexerGrpcConsumer extends GrpcWebImpl {
    module = '';
    constructor(endpoint) {
        super(endpoint, {
            transport: getGrpcTransport(),
        });
    }
    getGrpcWebImpl(endpoint) {
        return new BaseIndexerGrpcConsumer(endpoint);
    }
    retry(grpcCall, retries = 3, delay = 1000) {
        const retryGrpcCall = async (attempt = 1) => {
            try {
                return await grpcCall();
            }
            catch (e) {
                if (attempt >= retries) {
                    throw e;
                }
                return new Promise((resolve) => setTimeout(() => resolve(retryGrpcCall(attempt + 1)), delay * attempt));
            }
        };
        return retryGrpcCall();
    }
}
