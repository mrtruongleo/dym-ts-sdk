import { SnakeCaseKeys } from "snakecase-keys";
import { TypedDataField } from "./tx/eip712/types";
/**
 * @category Messages
 */
export declare abstract class MsgBase<Params, ProtoRepresentation extends Object, ObjectRepresentation extends Record<string, unknown> = {}> {
    params: Params;
    constructor(params: Params);
    abstract toProto(): ProtoRepresentation;
    abstract toData(): ProtoRepresentation & {
        "@type": string;
    };
    abstract toDirectSign(): {
        type: string;
        message: ProtoRepresentation;
    };
    abstract toAmino(): {
        type: string;
        value: ObjectRepresentation | SnakeCaseKeys<ProtoRepresentation>;
    };
    abstract toBinary(): Uint8Array;
    abstract toWeb3(): ObjectRepresentation | (SnakeCaseKeys<ProtoRepresentation> & {
        "@type": string;
    });
    toJSON(): string;
    /**
     * Returns the types of the message for EIP712
     */
    toEip712Types(): Map<string, TypedDataField[]>;
    /**
     * Returns the values of the message for EIP712
     */
    toEip712(): {
        type: string;
        value: Record<string, unknown /** TODO */>;
    };
    toDirectSignJSON(): string;
}
