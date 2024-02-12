import { MsgBase } from "../../MsgBase";
import { CosmosBaseV1Beta1Coin, InjectiveInsuranceV1Beta1Tx, InjectiveOracleV1Beta1Oracle } from "@injectivelabs/core-proto-ts";
export declare namespace MsgCreateInsuranceFund {
    interface Params {
        fund: {
            ticker: string;
            quoteDenom: string;
            oracleBase: string;
            oracleQuote: string;
            oracleType: InjectiveOracleV1Beta1Oracle.OracleType;
            expiry?: number;
        };
        deposit: {
            amount: string;
            denom: string;
        };
        injectiveAddress: string;
    }
    type Proto = InjectiveInsuranceV1Beta1Tx.MsgCreateInsuranceFund;
}
/**
 * @category Messages
 */
export default class MsgCreateInsuranceFund extends MsgBase<MsgCreateInsuranceFund.Params, MsgCreateInsuranceFund.Proto> {
    static fromJSON(params: MsgCreateInsuranceFund.Params): MsgCreateInsuranceFund;
    toProto(): InjectiveInsuranceV1Beta1Tx.MsgCreateInsuranceFund;
    toData(): {
        sender: string;
        ticker: string;
        quoteDenom: string;
        oracleBase: string;
        oracleQuote: string;
        oracleType: InjectiveOracleV1Beta1Oracle.OracleType;
        expiry: string;
        initialDeposit: CosmosBaseV1Beta1Coin.Coin | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveInsuranceV1Beta1Tx.MsgCreateInsuranceFund;
    };
    toBinary(): Uint8Array;
}
