import { ExecPrivilegedArgBase, ExecDataRepresentation } from '../ExecPrivilegedArgBase';
export declare namespace ExecPrivilegedArgOffChainVaultSubscribe {
    interface Params {
        origin: string;
        args: Record<string, any>;
    }
    interface Data {
        Subscribe: {
            args: Record<string, any>;
        };
    }
}
/**
 * @category Contract Exec Arguments
 */
export default class ExecPrivilegedArgOffChainVaultSubscribe extends ExecPrivilegedArgBase<ExecPrivilegedArgOffChainVaultSubscribe.Params, ExecPrivilegedArgOffChainVaultSubscribe.Data> {
    static fromJSON(params: ExecPrivilegedArgOffChainVaultSubscribe.Params): ExecPrivilegedArgOffChainVaultSubscribe;
    toData(): ExecPrivilegedArgOffChainVaultSubscribe.Data;
    toExecData(): ExecDataRepresentation<ExecPrivilegedArgOffChainVaultSubscribe.Data>;
}
