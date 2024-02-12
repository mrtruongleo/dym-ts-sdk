import { dataToExecData, ExecPrivilegedArgBase, } from '../ExecPrivilegedArgBase';
/**
 * @category Contract Exec Arguments
 */
export default class ExecPrivilegedArgOffChainVaultRedeem extends ExecPrivilegedArgBase {
    static fromJSON(params) {
        return new ExecPrivilegedArgOffChainVaultRedeem(params);
    }
    toData() {
        const { params } = this;
        return {
            Redeem: { args: params.args },
        };
    }
    toExecData() {
        const { params } = this;
        return dataToExecData(this.toData(), {
            origin: params.origin,
            name: 'VaultRedeem',
        });
    }
}
