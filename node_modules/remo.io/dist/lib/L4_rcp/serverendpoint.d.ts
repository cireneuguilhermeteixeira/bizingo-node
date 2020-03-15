/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import LocalEndpoint from './localendpoint';
import IServerEndpointOptions from './iserverendpointoptions';
import * as L1 from '../L1_transport';
export default class ServerEndpoint extends LocalEndpoint {
    constructor(options: IServerEndpointOptions);
    shutdown(): void;
    protected connected(socket: L1.ISocket): void;
    protected server: L1.ISocketServer;
}
