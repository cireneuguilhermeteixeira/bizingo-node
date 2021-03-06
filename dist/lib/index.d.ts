/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * This file is the entry point for node.js
 */
import * as L4 from './L4_rcp';
/** creates a new server instance */
export declare function createServer(options: L4.IServerEndpointOptions): L4.ServerEndpoint;
/** creates a new client instance */
export declare function createClient(): L4.ClientEndpoint;
