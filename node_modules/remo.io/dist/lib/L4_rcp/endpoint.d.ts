/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import IEndpoint from './iendpoint';
import { EventEmitter } from 'events';
export default abstract class Endpoint extends EventEmitter implements IEndpoint {
    constructor();
    abstract callFunction(id: string, ...args: any): Promise<any>;
    registerFunction(id: string, func: Function): void;
    unregisterFunction(id: string): boolean;
    protected functions: Map<string, Function>;
    protected api: any;
}
