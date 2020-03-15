/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="socket.io" />
import Socket from './socket';
export default class ServerSocket_SIO extends Socket {
    constructor(socket: SocketIO.Socket);
    receive(type: string, handler: (message: any) => Promise<any>): void;
    protected doConnect(): void;
    protected doDisconnect(): void;
    protected doSend(type: string, message: any): Promise<any>;
    protected doReset(): void;
    protected socket: SocketIO.Socket | null;
}
