import BaseRestConsumer from '../../base/BaseRestConsumer';
import { BlockLatestRestResponse, NodeInfoRestResponse } from './../types/tendermint-rest';
/**
 * @category Chain Rest API
 */
export declare class ChainRestTendermintApi extends BaseRestConsumer {
    fetchLatestBlock(params?: Record<string, any>): Promise<BlockLatestRestResponse['block']>;
    fetchNodeInfo(params?: Record<string, any>): Promise<{
        nodeInfo: NodeInfoRestResponse['default_node_info'];
        applicationVersion: NodeInfoRestResponse['application_version'];
    }>;
}
