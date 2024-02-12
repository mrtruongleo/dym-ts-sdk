import { grpc } from '@injectivelabs/grpc-web';
interface UnaryMethodDefinitionR extends grpc.UnaryMethodDefinition<any, any> {
    requestStream: any;
    responseStream: any;
}
type UnaryMethodDefinition = UnaryMethodDefinitionR;
export interface Rpc {
    unary<T extends UnaryMethodDefinition>(methodDesc: T, request: any, metadata: grpc.Metadata | undefined): Promise<any>;
}
export declare class GrpcWebError extends Error {
    code: grpc.Code;
    metadata: grpc.Metadata;
    constructor(message: string, code: grpc.Code, metadata: grpc.Metadata);
}
export declare class GrpcWebImpl {
    private host;
    private options;
    constructor(host: string, options: {
        transport?: grpc.TransportFactory;
        debug?: boolean;
        setCookieMetadata?: boolean;
        metadata?: grpc.Metadata;
        upStreamRetryCodes?: number[];
    });
    unary<T extends UnaryMethodDefinition>(methodDesc: T, _request: any, metadata: grpc.Metadata | undefined): Promise<any>;
}
export {};
