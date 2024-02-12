import { ExecArgBase, ExecDataRepresentation } from '../ExecArgBase';
import { ExitType, ExitConfig, StrategyType } from '../types';
export declare namespace ExecArgCreateSpotGridStrategy {
    interface Params {
        subaccountId: string;
        lowerBound: string;
        upperBound: string;
        levels: number;
        slippage?: string;
        stopLoss?: ExitConfig;
        takeProfit?: ExitConfig;
        exitType?: ExitType;
        strategyType?: StrategyType;
    }
    interface Data {
        subaccount_id: string;
        bounds: [string, string];
        levels: number;
        slippage?: string;
        stop_loss?: {
            exit_type: ExitType;
            exit_price: string;
        };
        take_profit?: {
            exit_type: ExitType;
            exit_price: string;
        };
        exit_type?: ExitType;
        strategy_type?: StrategyType;
    }
}
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgCreateSpotGridStrategy extends ExecArgBase<ExecArgCreateSpotGridStrategy.Params, ExecArgCreateSpotGridStrategy.Data> {
    static fromJSON(params: ExecArgCreateSpotGridStrategy.Params): ExecArgCreateSpotGridStrategy;
    toData(): ExecArgCreateSpotGridStrategy.Data;
    toExecData(): ExecDataRepresentation<ExecArgCreateSpotGridStrategy.Data>;
}
