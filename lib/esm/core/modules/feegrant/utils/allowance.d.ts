import { GoogleProtobufAny, CosmosFeegrantV1Beta1Feegrant } from '@injectivelabs/core-proto-ts';
export type AllowedMsgAllowance = Omit<CosmosFeegrantV1Beta1Feegrant.AllowedMsgAllowance, 'allowance'> & {
    allowance: CosmosFeegrantV1Beta1Feegrant.BasicAllowance | CosmosFeegrantV1Beta1Feegrant.PeriodicAllowance;
};
export type Allowance = CosmosFeegrantV1Beta1Feegrant.BasicAllowance | CosmosFeegrantV1Beta1Feegrant.PeriodicAllowance | AllowedMsgAllowance | undefined;
export declare enum AllowanceTypes {
    BasicAllowance = "spendLimit",
    PeriodicAllowance = "periodSpendLimit",
    AllowedMsgAllowance = "allowedMessages"
}
export declare function encodeAllowance(allowance: Allowance): GoogleProtobufAny.Any | undefined;
