import { WasmContractQueryResponse } from '../types';
export declare class IncentivesQueryTransformer {
    static contractRoundResponseToContractRound(response: WasmContractQueryResponse): {
        id: number;
        name: string;
        endDate: number;
        campaigns: string[];
        startDate: number;
    }[];
    static contractCampaignResponseToContractCampaign(response: WasmContractQueryResponse): {
        id: number;
        name: string;
        rewards: import("@injectivelabs/ts-types").Coin[];
        inRound: number;
        marketId: string;
        isFunded: boolean;
        description: string;
        isFinalized: boolean;
        totalRewards: string;
        subaccountIdSuffix: string;
    }[];
}
