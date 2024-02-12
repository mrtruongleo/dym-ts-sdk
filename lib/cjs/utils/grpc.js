"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGrpcTransport = void 0;
const grpc_web_1 = require("@injectivelabs/grpc-web");
const grpc_web_node_http_transport_1 = require("@injectivelabs/grpc-web-node-http-transport");
const grpc_web_react_native_transport_1 = require("@injectivelabs/grpc-web-react-native-transport");
const helpers_1 = require("./helpers");
const getGrpcTransport = () => {
    if ((0, helpers_1.isReactNative)()) {
        return (0, grpc_web_react_native_transport_1.ReactNativeTransport)({ withCredentials: true });
    }
    if ((0, helpers_1.isNode)()) {
        return (0, grpc_web_node_http_transport_1.NodeHttpTransport)();
    }
    return grpc_web_1.grpc.CrossBrowserHttpTransport({ withCredentials: false });
};
exports.getGrpcTransport = getGrpcTransport;
//# sourceMappingURL=grpc.js.map