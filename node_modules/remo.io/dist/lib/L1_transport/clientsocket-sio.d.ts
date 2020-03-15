/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="socket.io-client" />
import Socket from './socket';
export default class CLientSocket_SIO extends Socket {
    constructor(url?: string);
    receive(type: string, handler: (message: any) => any): void;
    protected doConnect(): void;
    protected doDisconnect(): void;
    protected doSend(type: string, message: any): Promise<any>;
    protected doReset(): void;
    protected socket: SocketIOClient.Socket | null;
    protected url: string;
    protected receivers: Map<string, (message: any) => Promise<any>>;
}
