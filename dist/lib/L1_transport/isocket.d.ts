/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import LinkState from "./linkstate";
import RemoError from "../remoerror";
export default interface ISocket {
    connect(): void;
    disconnect(): void;
    send(type: string, message: any): Promise<any>;
    receive(type: string, handler: (message: any) => Promise<any>): void;
    getState(): LinkState;
    onstatechanged: ((state: LinkState, reason: RemoError) => void) | null;
}
