import { TypedDataField } from './types';
/**
 * Function used to generate EIP712 types based on a message object
 * and its structure (recursive)
 */
export declare const objectKeysToEip712Types: ({ object, messageType, primaryType, }: {
    object: Record<string, any>;
    messageType?: string | undefined;
    primaryType?: string | undefined;
}) => Map<string, TypedDataField[]>;
/**
 * JavaScript doesn't know the exact number types that
 * we represent these fields on chain so we have to map
 * them in their chain representation from the number value
 * that is available in JavaScript
 */
export declare const numberTypeToReflectionNumberType: (property?: string) => "timeout_timestamp" | "int32" | "uint64" | "uint32" | "int64";
/**
 * JavaScript doesn't know the exact string types that
 * we represent these fields on chain so we have to map
 * them in their chain representation from the string value
 * that is available in JavaScript
 */
export declare const stringTypeToReflectionStringType: (property?: string) => string;
/**
 * We need to represent some of the values in a proper format acceptable by the chain.
 *
 * 1. We need to represent some values from a number to string
 * This needs to be done for every number value except for maps (ex: vote option)
 *
 * 2. We need to convert every `sdk.Dec` value from a raw value to shifted by 1e18 value
 * ex: 0.01 -> 0.01000000000000000000, 1 -> 1.000000000000000000
 *
 * 3. For some fields, like 'amount' in the 'MsgIncreasePositionMargin' we have
 * to also specify the Message type to apply the sdk.Dec conversion because there
 * are other amount fields in other messages as well and we don't want to affect them
 */
export declare const mapValuesToProperValueType: <T extends Record<string, unknown>>(object: T, messageTypeUrl?: string) => T;
export declare const getObjectEip712PropertyType: ({ property, parentProperty, messageType, }: {
    property: string;
    parentProperty: string;
    messageType?: string | undefined;
}) => string;
/**
 * Mapping a path type to amino type for messages
 */
export declare const protoTypeToAminoType: (type: string) => string;
