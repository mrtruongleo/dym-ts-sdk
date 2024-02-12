import { prepareSignBytes } from '../utils';
export const dataToExecData = (data, execParams) => {
    return {
        origin: execParams.origin,
        name: execParams.name,
        args: data,
    };
};
export const dataToExecDataWithInjectiveExec = (data, execParams) => {
    return {
        injective_exec: {
            origin: execParams.origin,
            name: execParams.name,
            args: data,
        },
    };
};
/** Executing Messages with injective_exec */
export class ExecPrivilegedArgBase {
    constructor(params) {
        this.params = params;
    }
    toJSON() {
        return JSON.stringify(prepareSignBytes(this.toData()));
    }
    toExecJSON() {
        return JSON.stringify(prepareSignBytes(this.toExecData()));
    }
}
export class MsgExecPrivilegedArgBase {
    constructor(params) {
        this.params = params;
    }
    toJSON() {
        return JSON.stringify(prepareSignBytes(this.toData()));
    }
}
