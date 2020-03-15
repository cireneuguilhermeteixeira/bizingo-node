/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default class Timer {
    constructor(interval: number, callback: VoidFunction);
    start(): void;
    stop(): void;
    restart(): void;
    private interval;
    private callback;
    private handle;
}
