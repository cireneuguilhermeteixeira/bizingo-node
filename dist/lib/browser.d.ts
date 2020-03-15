/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * This file is the entry point for browserify and populates the global "remo"
 * object in the browser.
 */
import { ClientEndpoint, RemoteEndpoint } from './L4_rcp';
/** creates a new client instance */
export declare function createClient(): ClientEndpoint;
/** default client instance */
export declare const client: ClientEndpoint;
/** default server stub */
export declare let server: RemoteEndpoint | null;
/** accessor for default server using promise */
export declare function getServer(): Promise<RemoteEndpoint>;
