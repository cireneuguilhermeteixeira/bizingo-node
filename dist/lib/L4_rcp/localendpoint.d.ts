/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Endpoint from './endpoint';
import RemoteEndpoint from './remoteendpoint';
import * as L1 from '../L1_transport';
export default class LocalEndpoint extends Endpoint {
    constructor();
    registerFunction(id: string, func: Function): void;
    registerFunctions(baseid: string, obj: any): void;
    unregisterFunction(id: string): boolean;
    internalizeFunction(func: Function, prefix?: string): string;
    getFunctionId(func: Function): string | undefined;
    callFunction(id: string, ...args: any): Promise<any>;
    shutdown(): void;
    protected createRemoteEndpoint(socket: L1.ISocket): Promise<RemoteEndpoint>;
    protected createFunctionId(func: Function): string;
    protected remotes: Set<RemoteEndpoint>;
    protected funcToId: WeakMap<Function, string>;
    protected nextAnonymousNum: number;
}
