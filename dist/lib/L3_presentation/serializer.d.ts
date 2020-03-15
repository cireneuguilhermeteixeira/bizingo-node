/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare type SerializedValue = SerializedItem | SerializedItem[];
declare type SerializedItem = Primitive | ISerializedObject;
declare type Primitive = boolean | string | number | null;
interface ISerializedObject {
    [typename: string]: SerializedValue;
}
interface ISerializer {
    serialize(value: any): any;
    deserialize(serialized: any): any;
}
export default class Serializer {
    constructor();
    serialize(value: any): SerializedValue;
    deserialize(serialized: SerializedValue): any;
    addHandler(name: string, serializer: ISerializer): void;
    protected addConst(name: string, value: any): void;
    protected handler: Map<string, ISerializer>;
    protected constToValue: Map<string, any>;
    protected valueToConst: Map<any, string>;
}
export {};
