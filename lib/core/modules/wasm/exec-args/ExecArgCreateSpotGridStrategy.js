import { dataToExecData, ExecArgBase, } from '../ExecArgBase';
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgCreateSpotGridStrategy extends ExecArgBase {
    static fromJSON(params) {
        return new ExecArgCreateSpotGridStrategy(params);
    }
    toData() {
        const { params } = this;
        return {
            subaccount_id: params.subaccountId,
            levels: params.levels,
            bounds: [params.lowerBound, params.upperBound],
            slippage: params.slippage,
            exit_type: params.exitType,
            stop_loss: params.stopLoss
                ? {
                    exit_type: params.stopLoss.exitType,
                    exit_price: params.stopLoss.exitPrice,
                }
                : undefined,
            take_profit: params.takeProfit
                ? {
                    exit_type: params.takeProfit.exitType,
                    exit_price: params.takeProfit.exitPrice,
                }
                : undefined,
            strategy_type: params.strategyType,
        };
    }
    toExecData() {
        return dataToExecData('create_strategy', this.toData());
    }
}
