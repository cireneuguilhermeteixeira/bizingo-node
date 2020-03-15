/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ISocket from './isocket';
import ISocketServer from './isocketserver';
export default abstract class SocketServer implements ISocketServer {
    constructor();
    abstract shutdown(): void;
    protected connected(socket: ISocket): void;
    protected disconnected(socket: ISocket): void;
    onconnected: ((socket: ISocket) => void) | null;
    ondisconnected: ((socket: ISocket) => void) | null;
}
