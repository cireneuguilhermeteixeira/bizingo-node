/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import SocketServer from './socketserver';
import ISocketServerOptions from './isocketserveroptions';
export default class SocketServer_SIO extends SocketServer {
    constructor(options: ISocketServerOptions);
    shutdown(): void;
    private ss;
}
