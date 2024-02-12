import { dataToExecData, ExecPrivilegedArgBase, } from '../ExecPrivilegedArgBase';
/**
 * @category Contract Exec Arguments
 */
export default class ExecPrivilegedArgOffChainVaultSubscribe extends ExecPrivilegedArgBase {
    static fromJSON(params) {
        return new ExecPrivilegedArgOffChainVaultSubscribe(params);
    }
    toData() {
        const { params } = this;
        return {
            Subscribe: { args: params.args },
        };
    }
    toExecData() {
        const { params } = this;
        return dataToExecData(this.toData(), {
            origin: params.origin,
            name: 'VaultSubscribe',
        });
    }
}
