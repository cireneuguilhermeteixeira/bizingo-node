/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ISocket from './socket';
import * as L0 from '../L0_system';
import LinkState from './linkstate';
export default abstract class Socket implements ISocket {
    abstract receive(type: string, handler: (message: any) => any): void;
    protected abstract doConnect(): void;
    protected abstract doDisconnect(): void;
    protected abstract doSend(type: string, data: any): Promise<any>;
    protected abstract doReset(): void;
    constructor();
    connect(): void;
    disconnect(): void;
    getState(): LinkState;
    send(type: string, message: any): Promise<any>;
    protected connected(): void;
    protected disconnected(): void;
    protected linkdown(): void;
    protected reconnecting(): void;
    protected setState(state: LinkState): void;
    onstatechanged: ((state: LinkState) => void) | null;
    protected state: LinkState;
    protected stateWatch: L0.Stopwatch;
    protected rxCount: number;
    protected dropCount: number;
}
