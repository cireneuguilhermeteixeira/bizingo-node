/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Endpoint from './endpoint';
import LocalEndpoint from './localendpoint';
import * as types from './types';
import * as L3 from '../L3_presentation';
import * as L1 from '../L1_transport';
import * as errors from '../errors';
export default class RemoteEndpoint extends Endpoint {
    constructor(local: LocalEndpoint, socket: L1.ISocket);
    shutdown(): void;
    callFunction(id: string, ...args: any): Promise<any>;
    funcRegistered(desc: types.IFuncDesc): void;
    funcUnregistered(id: string): void;
    setup(): void;
    protected socketStateChanged(state: L1.LinkState, reason: errors.RemoError): void;
    protected setLinkState(state: L1.LinkState, reason?: errors.RemoError): void;
    getApi(): any;
    protected local: LocalEndpoint;
    protected socket: L1.ISocket;
    protected linkstate: L1.LinkState;
    protected serializer: L3.Serializer;
}
