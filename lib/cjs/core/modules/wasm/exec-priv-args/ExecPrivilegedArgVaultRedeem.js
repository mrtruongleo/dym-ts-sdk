"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExecPrivilegedArgBase_1 = require("../ExecPrivilegedArgBase");
/**
 * @category Contract Exec Arguments
 */
class ExecPrivilegedArgVaultRedeem extends ExecPrivilegedArgBase_1.ExecPrivilegedArgBase {
    static fromJSON(params) {
        return new ExecPrivilegedArgVaultRedeem(params);
    }
    toData() {
        const { params } = this;
        return {
            vault_subaccount_id: params.vaultSubaccountId,
            trader_subaccount_id: params.traderSubaccountId,
            msg: {
                redeem: params.args,
            },
        };
    }
    toExecData() {
        const { params } = this;
        return (0, ExecPrivilegedArgBase_1.dataToExecData)(this.toData(), {
            origin: params.origin,
            name: 'VaultRedeem',
        });
    }
}
exports.default = ExecPrivilegedArgVaultRedeem;
//# sourceMappingURL=ExecPrivilegedArgVaultRedeem.js.map