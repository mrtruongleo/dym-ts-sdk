var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GrpcUnaryRequestException, UnspecifiedErrorCode, } from '@injectivelabs/exceptions';
import { InjectiveMetaRpc } from '@injectivelabs/indexer-proto-ts';
import BaseGrpcConsumer from '../../base/BaseIndexerGrpcConsumer';
import { IndexerModule } from '../types';
/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcMetaApi extends BaseGrpcConsumer {
    constructor(endpoint) {
        super(endpoint);
        this.module = IndexerModule.Meta;
        this.client = new InjectiveMetaRpc.InjectiveMetaRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    fetchPing() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveMetaRpc.PingRequest.create();
            try {
                const response = yield this.retry(() => this.client.Ping(request));
                return response;
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Ping',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Ping',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveMetaRpc.VersionRequest.create();
            try {
                const response = yield this.retry(() => this.client.Version(request));
                return response;
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Version',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Version',
                    contextModule: this.module,
                });
            }
        });
    }
    fetchInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = InjectiveMetaRpc.InfoRequest.create();
            request.timestamp = Date.now().toString();
            try {
                const response = yield this.retry(() => this.client.Info(request));
                return response;
            }
            catch (e) {
                if (e instanceof InjectiveMetaRpc.GrpcWebError) {
                    throw new GrpcUnaryRequestException(new Error(e.toString()), {
                        code: e.code,
                        context: 'Info',
                        contextModule: this.module,
                    });
                }
                throw new GrpcUnaryRequestException(e, {
                    code: UnspecifiedErrorCode,
                    context: 'Info',
                    contextModule: this.module,
                });
            }
        });
    }
}
